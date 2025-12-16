
import {Offers} from '../../types/offer.ts';
import {FavoriteList} from '../../components/favorite-list.tsx';
import {JSX} from 'react';
import {AppNavBar} from '../../components/app-navbar.tsx';

type FavoritesPageProps = {
  offers: Offers;
}

function FavoritesScreen({ offers }: FavoritesPageProps): JSX.Element {
  return (
    <div className="page">
      <AppNavBar isActive />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <FavoriteList
                  offers={offers.filter((offer) => offer.isFavorite)}
                />
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
