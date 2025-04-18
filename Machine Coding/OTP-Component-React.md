```js

import React, { useRef, useState } from 'react';
import './style.css';

const App = () => {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const refArr = useRef([]);

  const handleChange = (e, idx) => {
    const value = e.target.value;
    if(isNaN(value[0]) ) return
    if (!value) return;

    const copy = [...otp];
    copy[idx] = value[0]; // only take first character
    setOtp(copy);

    if (idx < otp.length - 1) {
      refArr.current[idx + 1].focus();
    }
  };

  const onKeyDownHandler = (e, idx) => {
    if(e.key==="ArrowRight"){
       refArr.current[idx + 1].focus();
    }
    if(e.key==="ArrowLeft"){
       refArr.current[idx - 1].focus();
    }
    if (e.key === 'Backspace') {
      const copy = [...otp];
      if (otp[idx]) {
        // Just clear current field
        copy[idx] = '';
        setOtp(copy);
      } else if (idx > 0) {
        // Move back and clear previous
        refArr.current[idx - 1].focus();
        copy[idx - 1] = '';
        setOtp(copy);
      }
    }
  };

  const handlPaste=(e)=>{
     e.preventDefault();
    console.log("ss",e.clipboardData.getData())
  }

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {otp.map((item, idx) => (
        <input
          key={idx}
          type="text"
          maxLength={1}
          style={{ width: '50px', height: '50px', textAlign: 'center', fontSize: '24px' }}
          ref={el => (refArr.current[idx] = el)}
          onChange={e => handleChange(e, idx)}
          value={item}
          onKeyDown={e => onKeyDownHandler(e, idx)}
          onPaste={(e)=>{handlPaste(e)}}
        />
      ))}
    </div>
  );
};

export default App;


