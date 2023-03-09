import React, { useState, useEffect } from "react";
import api from "../../utils/api";


function Review({ rating, text, author }) {
  
  const [authorReview, setAuthorReview] = useState({});

  useEffect(() => {
    api
    .getUserById(author)
    .then((authorData) => setAuthorReview(authorData))
    .catch((err) => console.log(err));
  }, [author])
  
  return (
    <div>
      <h4>{authorReview.name}</h4>
      <span>
        <b>Оценка: </b>
        {rating}
      </span>
      <p>{text}</p>
    </div>
  );
}

export default Review;
