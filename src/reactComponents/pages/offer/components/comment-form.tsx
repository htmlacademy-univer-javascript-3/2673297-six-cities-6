import {ChangeEvent, FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../../store';
import {useParams} from 'react-router-dom';
import {AppState} from '../../../../store/reducer.ts';
import {AuthorizationStatus} from '../../../../types/auth-status.ts';
import {postReviewAction} from '../../../../store/api-actions.ts';

export function CommentForm() {
  const [rating, setRating] = useState('0');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const { id: offerId } = useParams();

  const authorizationStatus = useSelector<AppState, AuthorizationStatus>(
    (state) => state.authorizationStatus
  );

  if (!offerId || authorizationStatus !== AuthorizationStatus.Auth) {
    return null;
  }

  function onCommentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setComment(event.target.value);
    setError('');
  }

  function onRatingChanged(event: ChangeEvent<HTMLInputElement>) {
    setRating(event.target.value);
    setError('');
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError('');

    const numericRating = Number(rating);

    if (numericRating === 0) {
      setError('Please select a rating');
      return;
    }

    if (comment.length < 50) {
      setError('Review must be at least 50 characters');
      return;
    }

    if (comment.length > 300) {
      setError('Review must not exceed 300 characters');
      return;
    }

    setIsSubmitting(true);

    dispatch(postReviewAction({
      offerId,
      reviewData: {
        comment,
        rating: numericRating
      }
    }))
      .unwrap()
      .then(() => {
        setRating('0');
        setComment('');
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const isSubmitDisabled =
    rating === '0' ||
    comment.length < 50 ||
    comment.length > 300 ||
    isSubmitting;

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      {error && (
        <div className="reviews__error" style={{
          color: '#ff6d51',
          backgroundColor: '#ffe8e1',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '10px'
        }}
        >
          {error}
        </div>
      )}

      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          checked={rating === '5'}
          onChange={onRatingChanged}
          disabled={isSubmitting}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          checked={rating === '4'}
          onChange={onRatingChanged}
          disabled={isSubmitting}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          checked={rating === '3'}
          onChange={onRatingChanged}
          disabled={isSubmitting}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          checked={rating === '2'}
          onChange={onRatingChanged}
          disabled={isSubmitting}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          checked={rating === '1'}
          onChange={onRatingChanged}
          disabled={isSubmitting}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onCommentChanged}
        value={comment}
        disabled={isSubmitting}
        maxLength={300}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
