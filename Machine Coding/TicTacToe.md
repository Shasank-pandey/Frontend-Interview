```js
import React, { useRef, useState,useEffect } from 'react'
import Confetti from 'js-confetti'
import './style.css'

const App = () => {
  const [count, setCount] = useState(0)
  const [grid,setGrid] = useState(buildGrid(3))
  const [isXMove,setIsXMove] = useState(true)
  const [winner,setWinner] =  useState(null)

  function buildGrid(n){
    return Array(n).fill("").map(el=>Array(n).fill(""))
  }
   
  const handleClick = (row,col) => {
    if(grid[row][col] !== ""){
      return
    }
    const copy = [...grid.map(el=>el.map(item=>item))]
    let val = isXMove ? "X" : "O"
    copy[row][col] = val
    setGrid(copy)
    setIsXMove(!isXMove)
    if(copy.every(el=>el.every(item=> item !== ""))){
      setTimeout(()=>{
        setGrid(buildGrid(3))
        setWinner(null)
      },2000)
    }
   checkWinner(copy,row,col,val)
  }



 function checkWinner(grid,row, col, val) {
  let localwinner = null;
   // Check main diagonal
  if (row === col) {
    let mainDiagWin = true;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i][i] !== val) {
        mainDiagWin = false;
        break;
      }
    }
    if (mainDiagWin) localwinner = val;
  }

  // Check anti-diagonal
  if (row + col === grid.length - 1) {
    let antiDiagWin = true;
    for (let i = 0; i < grid.length; i++) {
      if (grid[i][grid.length - 1 - i] !== val) {
        antiDiagWin = false;
        break;
      }
    }
    if (antiDiagWin) localwinner = val;
  }
  // Check row
  if (grid[row].every(el => el === val)) {
    localwinner = val;
  }
  // Check column
  let colwin = true;
  grid.forEach((el, idx) => {
    colwin = colwin && (grid[idx][col] === val);
  });
  if (colwin) {
    localwinner = val;
  }
 setWinner(localwinner)
}

  
  return (
   <div>
     <div>winner: {winner}</div>
     {
       grid.map((row,rowIdx)=>{
         return (<div style={{display:"flex"}}>{
           row.map((col,colIdx)=>{
              return (<div onClick={()=>{handleClick(rowIdx,colIdx)}}style={{height:"100px",width:"100px",border:"1px solid grey",display: "flex",alignItems: "center",justifyContent: "center",fontSize:"30px"}}>{col}</div>)
           })
         }</div>)
       })
     }
   </div>
  )
}


export default App

```js
