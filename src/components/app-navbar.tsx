import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import {AppDispatch, RootState} from '../store';
import {AuthorizationStatus} from '../types/auth-status.ts';
import {User} from '../types/user.ts';
import {logoutAction} from '../store/api-actions.ts';
import {AppRoute} from '../const.ts';

export type AppNavBarProps = {
  isActive: boolean;
}

export function AppNavBar({ isActive }: AppNavBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector<RootState, AuthorizationStatus>(
    (state) => state.user.authorizationStatus
  );
  const userData = useSelector<RootState, User | null>(
    (state) => state.user.user
  );

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a
              className={`header__logo-link ${isActive && 'header__logo-link--active'}`}
              href={isActive ? AppRoute.Main : undefined}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth && userData ? (
                <>
                  <li className="header__nav-item user">
                    <a
                      className="header__nav-link header__nav-link--profile"
                      href={AppRoute.Favorites}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        {userData.avatarUrl && (
                          <img
                            className="header__avatar user__avatar"
                            src={userData.avatarUrl}
                            alt="User avatar"
                            width="20"
                            height="20"
                          />
                        )}
                      </div>
                      <span className="header__user-name user__name">
                        {userData.email}
                      </span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href="#"
                      onClick={handleLogoutClick}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="header__nav-item">
                  <a className="header__nav-link" href={AppRoute.Login}>
                    <span className="header__login">Sign in</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
