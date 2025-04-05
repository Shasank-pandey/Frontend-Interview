
```js
// Q: Create Star rating component as in amazon and flipkart

import React, { useState } from 'react'

const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0); // clicked rating
  const [hovered, setHovered] = useState(0); // hover preview

  return (
    <div style={{ display: 'flex', cursor: 'pointer', fontSize: '2rem' }}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <span
            key={index}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
            style={{
              color: starValue <= (hovered || rating) ? '#ffc107' : '#e4e5e9',
              transition: 'color 0.2s ease'
            }}
            role="button"
            aria-label={`Rate ${starValue} star`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

const App = () => {
  return (
   <StarRating totalStars={5}/>
  )
}


export default App
