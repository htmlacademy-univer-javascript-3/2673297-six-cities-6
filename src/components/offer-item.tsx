import { Link } from 'react-router-dom';
import React, { useCallback, useMemo } from 'react';
import {Offer} from '../types/offer.ts';
import {AppRoute} from '../const.ts';

export type OfferItemProps = {
  offer: Offer;
  onMouseEnter: (id: string) => void;
  onMouseLeave: (id: string) => void;
}

function OfferItemComponent({
  offer,
  onMouseEnter,
  onMouseLeave
}: OfferItemProps) {

  const handleMouseEnter = useCallback(() => {
    onMouseEnter(offer.id);
  }, [onMouseEnter, offer.id]);

  const handleMouseLeave = useCallback(() => {
    onMouseLeave(offer.id);
  }, [onMouseLeave, offer.id]);

  const bookmarkedClassName = useMemo(() =>
    offer.isFavorite ? 'place-card__bookmark-button--active' : '',
  [offer.isFavorite]
  );

  const link = useMemo(() =>
    AppRoute.Offer.replace(':id', offer.id),
  [offer.id]
  );

  const ratingWidth = useMemo(() =>
    `${Math.floor(offer.rating) * 20}%`,
  [offer.rating]
  );

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={link}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${bookmarkedClassName} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={link}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export const OfferItem = React.memo(OfferItemComponent);
