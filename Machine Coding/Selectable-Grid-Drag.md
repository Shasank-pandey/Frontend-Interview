```js

import React, { useState, useEffect } from 'react';

const App = () => {
  const [grid, setGrid] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false); // mouse pressed flag

  useEffect(() => {
    setGrid(generateGrid(8));
  }, []);

  const generateGrid = (n) => {
    const res = [];
    for (let i = 0; i < n; i++) {
      res.push(new Array(n).fill(false));
    }
    return res;
  };

  const draw = (eRow, eCol) => {
    const gridCopy = grid.map((row) => [...row]);
    gridCopy.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        gridCopy[rowIndex][colIndex] = rowIndex <= eRow && colIndex <= eCol;
      });
    });
    setGrid(gridCopy);
  };

  const handleMouseDown = (row, col) => {
    setIsDrawing(true);
    draw(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (isDrawing) {
      draw(row, col);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div
      style={{ display: 'flex' }}
      onMouseLeave={() => {
        setIsDrawing(false);
        setGrid(generateGrid(8));
      }}
      onMouseUp={handleMouseUp}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', flexDirection: 'column' }}>
          {row.map((col, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              style={{
                width: '60px',
                height: '60px',
                border: '1px solid grey',
                background: col ? '#e1e0e0' : 'transparent',
                userSelect: 'none',
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
