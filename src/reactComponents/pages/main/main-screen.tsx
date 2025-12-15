import Map from './components/map';
import {LoadingScreen} from '../loading-screen/loading-screen.tsx';
import {JSX, useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SortType} from '../../../types/sort-type.ts';
import {Offer} from '../../../types/offer.ts';
import {AppDispatch, RootState} from '../../../store';
import {CityHeader} from './components/city-header.tsx';
import {SortOptions} from './components/sort-options.tsx';
import {OfferList} from '../../components/offer-list.tsx';
import {AppNavBar} from '../../components/app-navbar.tsx';
import {selectCity, selectSorting} from '../../../store/offers/slice.ts';


function MainScreen(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const onMouseEnter = useCallback((id: string) => {
    setActiveOfferId(id);
  }, []);

  const onMouseLeave = useCallback((id: string) => {
    setActiveOfferId((currentId) => currentId === id ? null : currentId);
  }, []);

  const selectedCity = useSelector<RootState, string>((state) => state.offers.selectedCity);
  const selectedSortType = useSelector<RootState, SortType>((state) => state.offers.sortType);
  const offers = useSelector<RootState, Offer[]>((state) => state.offers.offers);
  const cities = useSelector<RootState, string[]>((state) => state.offers.cities);

  const selectedOffers = offers
    .filter((offer) => offer.city.name === selectedCity)
    .sort(
      (left, right) => {
        if (selectedSortType === SortType.PriceHighToLow) {
          return right.price - left.price;
        } else if (selectedSortType === SortType.PriceLowToHigh) {
          return left.price - right.price;
        } else if (selectedSortType === SortType.TopRatedFirst) {
          return right.rating - left.rating;
        }

        return 0;
      }
    );

  const dispatch = useDispatch<AppDispatch>();

  const handleCityChoose = (city: string) => {
    dispatch(selectCity(city));
  };

  const handleSortingChoose = (sortType: SortType) => {
    dispatch(selectSorting(sortType));
  };

  return (
    <div className="page page--gray page--main">
      <AppNavBar isActive={false} />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityHeader
          city={selectedCity}
          cities={cities}
          onCityClicked={handleCityChoose}
        />
        {
          selectedOffers.length !== 0
            ?
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{selectedOffers.length} places to stay in {selectedCity}</b>
                  <SortOptions
                    sortType={selectedSortType}
                    handleSortingChoose={handleSortingChoose}
                  />
                  <OfferList
                    offers={selectedOffers}
                    className={'cities__places-list places__list tabs__content'}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  />
                </section>

                <div className="cities__right-section">
                  <Map
                    city={selectedOffers[0].city}
                    offers={selectedOffers}
                    activeOfferId={activeOfferId}
                    className="cities__map map"
                  />
                </div>
              </div>
            </div>
            : <LoadingScreen />
        }
      </main>
    </div>
  );
}

export default MainScreen;
