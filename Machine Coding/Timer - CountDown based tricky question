
```js

import React, { useRef, useState } from 'react';
import './style.css';


const App = () => {
 const [second,setSecond] = useState(0)
 const [isRunning,setIsRunning] = useState(false)

  const intervalRef = useRef(null)
  const startTimeRef = useRef(null)

  function start(){
  if(!isRunning){
         setIsRunning(true)
         startTimeRef.current = Date.now() - second
    intervalRef.current = setInterval(()=>{
      setSecond(Date.now()-startTimeRef.current)
    },10)
  }
  }


  function stop(){
    setIsRunning(false)
    clearInterval(intervalRef.current)
    setSecond(0)
  }

  function pause(){
     if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }

 const formatTime = (ms) => {
    const milliseconds = Math.floor((ms % 1000)/100);
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}.${milliseconds}`;
  };
  return (
    <div >
     <div>{formatTime(second)}</div>
      <div>
        <button onClick={()=>start()}>Start</button>
         <button onClick={()=>pause()}>pause</button>
         <button onClick={()=>stop()}> Stop</button>
      </div>
    </div>
  );
};

export default App;

