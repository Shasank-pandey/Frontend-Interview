import React, { useEffect, useRef, useState } from 'react';

const Otp = ({ length = 4, onComplete=()=>{} }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));

  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  const isOtpComplete = (password) => password.every(val => val!="");

  const handleChange = (e, index) => {
    let value = e.target.value[e.target.value.length - 1];
    if (isNaN(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if(isOtpComplete(newOtp)){
      onComplete(newOtp);
    }

    // Move focus to next
    if (index < length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key !== 'Backspace') return;

    setOtp((oldOtp) => {
      let newOtp = [...oldOtp];
      newOtp[index] = '';
      return newOtp;
    });

    // Move focus to previous
    if (index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleClick = (index) => {
    // Move the cursor to the very end in the field
    inputRef.current[index].setSelectionRange(1, 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isOtpComplete(otp)){
      onComplete(otp);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {otp.map((val, index) => (
        <input
          type="text"
          ref={(input) => {
            inputRef.current[index] = input;
          }}
          key={index}
          value={val}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onClick={() => handleClick(index)}
        />
      ))}
    </form>
  );
};

export default Otp;
