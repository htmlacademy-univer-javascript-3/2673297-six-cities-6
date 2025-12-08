import Map from './components/map';
import {LoadingScreen} from './components/loading-screen.tsx';
import {JSX, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../../store/reducer.ts';
import {SortType} from '../../../types/sort-type.ts';
import {Offer} from '../../../types/offer.ts';
import {AppDispatch} from '../../../store';
import {selectCity, selectSorting} from '../../../store/action.ts';
import {AppNavBar} from '../../components/app-navbar.tsx';
import {CityHeader} from './components/city-header.tsx';
import {SortOptions} from './components/sort-options.tsx';
import {OfferList} from '../../components/offer-list.tsx';


function MainScreen(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  function onMouseEnter(id: string) {
    setActiveOfferId(id);
  }

  function onMouseLeave(id: string) {
    if (activeOfferId === id) {
      setActiveOfferId(null);
    }
  }

  const selectedCity = useSelector<AppState, string>((state) => state.selectedCity);
  const selectedSortType = useSelector<AppState, SortType>((state) => state.sortType);
  const offers = useSelector<AppState, Offer[]>((state) => state.offers);
  const cities = useSelector<AppState, string[]>((state) => state.cities);

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
