import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"

export default function Review() {

    const [reviews, setReview] = useState([]);
    useEffect(() => {
        axios
            .get('https://raq11y02t1.execute-api.us-east-1.amazonaws.com/rev/reviews')
            .then((res) => {
                setReview(res.data.Reviews);

            })
            .catch((err) => console.error(err))
    }, []
    )
    console.log(reviews)

    return (
        <div className = "Review">
            {reviews.map((review, idx) => {
                return (
                    <div key={`review${idx}`}>
                       <p>{review.id}</p> 
                       <p>{review.author}</p> 
                       <p>{review.description}</p> 
                       <p>{review.rate}</p> 
                       <p>{review.dislike}</p> 
                       <p>{review.Likes}</p> 
                    </div>
                )
            })}
        </div>
    );
}




