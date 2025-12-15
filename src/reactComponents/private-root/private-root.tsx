import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {useSelector} from 'react-redux';
import {AuthorizationStatus} from '../../types/auth-status';
import {LoadingScreen} from '../pages/loading-screen/loading-screen.tsx';
import {RootState} from '../../store';

export function PrivateRoute({children}: {children: JSX.Element}): JSX.Element {
  const authorizationStatus = useSelector<RootState, AuthorizationStatus>(
    (state) => state.user.authorizationStatus
  );

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen/>;
  }

  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
