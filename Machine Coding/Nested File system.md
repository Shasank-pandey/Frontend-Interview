```js
import React, { useEffect, useState,useRef } from 'react';
import './style.css';
const data = [
  {
    name: 'shasank',
    id: 1,
    children: [
      {
        name: 'adobe',
        id: 2,
        children: [
          {
            name: 'atlassian',
            id: 3,
            children: []
          }
        ]
      }
    ]
  },
  {
    name: 'bro2',
    id: 4,
    children: [
      {
        name: 'adobe2',
        id: 5,
        children: [
          {
            name: 'atlassian2',
            id: 6,
            children: []
          }
        ]
      }
    ]
  },
  {
    name: 'yoo3',
    id: 7,
    children: [
      {
        name: 'adobe3',
        id: 8,
        children: [
          {
            name: 'atlassian3',
            id: 9,
            children: []
          }
        ]
      }
    ]
  }
]

const App = () => {
  const [list,setList] = useState([...data])
  const [expandedIds, setExpandedIds] = useState({});
  const inputRef = useRef()

  const handleClick=(id,e)=>{
    e.stopPropagation()
    const copy = {...expandedIds}
    if(copy.hasOwnProperty(id)){
      delete copy[id]
    } else {
      copy[id] = true
    }
    setExpandedIds(copy)
  }


  const Input=({onBlur})=>{
    return (
      <input type="text" onBlur={onBlur}/>
    )
  }

  const handleAdd=(id,e)=>{
      //copy
    //find node
    //add a input
    const copy = [...list]
    const node = getNode(copy,id)
    node.editing = true
    handleClick(id,e)
    setList(copy)
  }

  const getNode=(arr,id)=>{
    function helper(arr){
         for(let item of arr){
           if(item.id === id){
             return item
           }
            else {
              helper(item.children)
            }
         }
    }
    return helper(arr)
  }

  const Render=(data)=>{
    return (<div>
      {
        data?.map(el=>{
          return (
            <div>
            <div style={{display:"flex"}}>
              {el.children.length > 0 ? (<span onClick={(e)=>handleClick(el.id,e)}>+</span>):null}
            <div style={{marginLeft:"10px"}} >{el.name}</div>
              {el.children.length && <button onClick={(e)=>handleAdd(el?.id,e)}>Add</button>}
            </div>
              {el.editing && <div><Input onBlur={() => {
          completeAdd()
        }} ref={inputRef}/></div>}
              {expandedIds[el.id] && <div style={{marginLeft:"10px"}}>{el.children.length > 0 && Render(el?.children)}</div>}
            </div>
          )
        })
      }
    </div>)
  }

  return (
    <>
      {
        Render(list)
      }
    </>
  );
};

export default App;
