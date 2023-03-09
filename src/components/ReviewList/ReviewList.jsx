import React from 'react';
import Review from '../Review/Review';

function ReviewList({reviewList}) {

  return (
    <div>
      <button>Написать отзыв</button>
      {reviewList.map((review) => <Review key={review._id} {...review} />
      )}
    </div>
  );
}

export default ReviewList;