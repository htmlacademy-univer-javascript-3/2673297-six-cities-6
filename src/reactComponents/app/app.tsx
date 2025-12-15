import MainScreen from '../pages/main/main-screen.tsx';
import {Provider} from 'react-redux';
import {appStateStore} from '../../store';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import LoginScreen from '../pages/login/login-screen.tsx';
import PrivateRoute from '../private-root/private-root.tsx';
import OfferScreen from '../pages/offer/offer-screen.tsx';
import FavoritesScreen from '../pages/favorites/favorites-screen.tsx';
import NotFoundScreen from '../pages/not-found/not-found-screen.tsx';

function App() {
  return (
    <Provider store={appStateStore}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Login} element={<LoginScreen />} />
          <Route path={AppRoute.Main} element={<MainScreen />} />
          <Route path={AppRoute.Offer} element={<OfferScreen />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesScreen offers={[]} />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
