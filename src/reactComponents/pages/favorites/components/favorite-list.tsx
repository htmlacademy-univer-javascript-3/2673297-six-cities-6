import { FavoriteCard } from './favorite-card';
import {Offers} from '../../../../types/offer.ts';

export type FavoriteListProps = {
  offers: Offers;
}

export function FavoriteList({ offers }: FavoriteListProps) {
  return (
    <div className='favorites__places'>
      {
        offers
          .map((offer) => (
            <FavoriteCard
              key={offer.id}
              offer={offer}
            />)
          )
      }
    </div>
  );
}
