```js

import React, { useState } from 'react';
import './style.css';

function Cicles({ x, y, color }) {
  return (
    <div
      className="circle"
      style={{
        position: 'absolute',
        left: `${x - 50}px`,
        top: `${y - 50}px`,
        borderRadius: '50%',
        height: '100px',
        width: '100px',
        background: color,
      }}
    ></div>
  );
}

const App = () => {
  const [circles, setCircles] = useState([]);

  const calculateOverlap = (c1, c2, rad) => {
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < rad * 2;
  };

  const handleClick = (e) => {
    const obj = [...circles];
    const x = e.clientX;
    const y = e.clientY;
    const newCircle = { x, y, color: 'lightGreen' };

    obj.forEach((c) => {
      if (calculateOverlap(c, newCircle, 50)) {
        c.color = 'lightBlue';
        newCircle.color = 'lightBlue';
      }
    });

    setCircles([...obj, newCircle]);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '1000px',
        border: '1px solid grey',
        position: 'relative',
      }}
      onClick={handleClick}
    >
      {circles.map((el, idx) => (
        <Cicles key={idx} x={el.x} y={el.y} color={el.color} />
      ))}
    </div>
  );
};

export default App;



```
