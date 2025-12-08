import {Navigate} from 'react-router-dom';
import {AppRoute} from '../const.ts';
import {useSelector} from 'react-redux';
import {AppState} from '../../store/reducer';
import {AuthorizationStatus} from '../../types/auth-status';
import {LoadingScreen} from '../pages/loading-screen/loading-screen.tsx';

export function PrivateRoute({children}: {children: JSX.Element}): JSX.Element {
  const authorizationStatus = useSelector<AppState, AuthorizationStatus>(
    (state) => state.authorizationStatus
  );

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen/>;
  }

  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
