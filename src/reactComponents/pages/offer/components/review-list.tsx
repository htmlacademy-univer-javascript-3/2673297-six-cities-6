import { CommentForm } from './comment-form';
import { ReviewItem } from './review-item';
import {Reviews} from '../../../../types/review.ts';

export type ReviewListProps = {
  reviews: Reviews;
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
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

