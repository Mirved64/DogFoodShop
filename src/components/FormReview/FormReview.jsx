import React, {useState} from 'react';
import api from '../../utils/api';
import { useParams } from 'react-router-dom';
import s from './FormReview.module.css'

function FormReview({setActive, setNewReviewList}) {

  const [review, setReview] = useState({})

  const { productId } = useParams();
  
  const newReviewPost = (e) => {
    e.preventDefault()
    const newReview = {
      rating: review.rating,
      text: review.text
    }
    api.addProductRewiew(productId, newReview)
      .then((reviewData) => {
        setReview(reviewData)
        
        setNewReviewList(reviewData.reviews)
      })
      .catch(err => console.log(err))
    
    setReview({rating: '', text: ''})
    setActive(false)
    
  }
    

  return (
    <form >
      <span>Оставьте отзыв на товар</span>

      <label>Рейтинг товара</label>
      <input
        name='rating'
        type='number'
        min='1' max='5'
        placeholder='Введите рейтинг товара от 1 до 5'
        value={review.rating}
        onChange={(e) => setReview({...review, rating: e.target.value})}
      ></input>

      <label>Текст отзыва</label>
      <textarea 
        name='review' 
        type='text'
        placeholder='Введите текст отзыва'
        value={review.text}
        onChange={(e) => setReview({...review, text: e.target.value})}
      ></textarea>

      <button className={s.btn} onClick={newReviewPost}>Отправить отзыв</button>
    </form>
  );
}

export default FormReview;