import { CommentForm } from './comment-form.tsx';
import { ReviewItem } from './review-item.tsx';
import {Reviews} from '../types/review.ts';

export type ReviewListProps = {
  reviews: Reviews;
  count: number;
}

export function ReviewList({ reviews, count }: ReviewListProps) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{count}</span></h2>
      <ul className="reviews__list">
        {
          reviews
            .map((review) => (
              <ReviewItem
                key={review.id}
                review={review}
              />)
            )
        }
      </ul>
      <CommentForm />
    </section>
  );
}

