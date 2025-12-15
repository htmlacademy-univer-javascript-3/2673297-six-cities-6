import { OfferItem } from './offer-item';
import {Offers} from '../../types/offer.ts';
import React, {useCallback} from 'react';

export type OfferListProps = {
  offers: Offers;
  className: string;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: (id: string) => void;
}

function OfferListComponent({ offers, className, onMouseEnter, onMouseLeave }: OfferListProps) {
  const handleMouseEnter = useCallback((id: string) => {
    onMouseEnter?.(id);
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback((id: string) => {
    onMouseLeave?.(id);
  }, [onMouseLeave]);
  return (
    <div className={className}>
      {
        offers
          .map((offer) => (
            <OfferItem
              key={offer.id}
              offer={offer}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />)
          )
      }
    </div>
  );
}

export const OfferList = React.memo(OfferListComponent);
