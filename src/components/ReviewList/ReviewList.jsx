import React, { useState } from 'react';
import Review from '../Review/Review';
import s from './ReviewList.module.css'
import Modal from '../Modal/modal';
import FormReview from './../FormReview/FormReview'

function ReviewList({reviewList}) {

  const [modalActive, setModalActive] = useState(false)
  const [newReviewList, setNewReviewList] = useState(reviewList)
  
  const modalOn = () => {
    setModalActive(true)
  }
  
  return (
    <>
      <div>
        <button className={s.btn} onClick={modalOn}>Написать отзыв</button>
        {reviewList.map((review) => <Review key={review._id} {...review} />
        )}
      </div>
      <Modal active={modalActive} setActive={setModalActive} >
        <FormReview 
          setActive={setModalActive} 
          setNewReviewList={setNewReviewList} 
        ></FormReview>
      </Modal>
      
    </>
  );
}

export default ReviewList;