
```js
import React, { useState, useEffect } from 'react';

const reducer=(state,action)=>{
  switch(action.type){
    case "INC":
      return {...state,counter:state.counter+1}
    case "DEC":
      return {...state,counter: state.counter-1}
    default : 
      return {...state}
  }
}

function createStore(reducer){
  let state = {
    counter:0
  }

  let listeners = []

  function dispatch(action){
    state  = reducer(state,action)
    listeners.forEach(cb=> cb())
  }

  function subscribe(cb){
    listeners.push(cb)
  }

  function getState(){
    return state
  }

  return {dispatch,subscribe,getState}
}


const {dispatch,subscribe,getState} = createStore(reducer)


function MyComponent() {
  const [state, setState] = useState(0);


  useEffect(()=>{
   subscribe(()=>{
    setState(getState().counter)
  })
  },[])

  return (
    <div>
       <p>state: {state}</p>
      <button onClick={()=>dispatch({type:"INC"})}>Increment</button>
      <button onClick={()=>dispatch({type:"DEC"})}>Decrement</button>
    </div>
  );
}

export default MyComponent;

```
