```js
import React, { useState } from 'react';

const data = [
    {
      id: 1,
      name: 'README.md',
    },
    {
      id: 2,
      name: 'Documents',
      children: [
        {
          id: 3,
          name: 'Word.doc',
        },
        {
          id: 4,
          name: 'Powerpoint.ppt',
        },
      ],
    },
    {
      id: 5,
      name: 'Downloads',
      children: [
        {
          id: 6,
          name: 'unnamed.txt',
        },
        {
          id: 7,
          name: 'Misc',
          children: [
            {
              id: 8,
              name: 'foo.txt',
            },
            {
              id: 9,
              name: 'bar.txt',
            },
          ],
        },
      ],
    },
  ];

const File = ({ data,AddNodeTolist,deleteNode }) => {
  const [expandedSet, setExpandedSet] = useState(new Set());
  const [isAdding,setIsAdding] = useState(false)
  const [word,setWord] = useState('')
  const [addingType,setAddingType] = useState('')

  const handleClick = (id) => {
   const copy = new Set(expandedSet)
   if(copy.has(id)){
      copy.delete(id)
   } else {
     copy.add(id)
   }
  setExpandedSet(copy)
  };

  const handleAdd=(id,type)=>{
    handleClick(id)
    setIsAdding(true)
    setAddingType(type)
  }

  const submitAdd=(id)=>{
    AddNodeTolist(id,word,addingType)
    setWord("")
    setIsAdding(false)
  }
  
  return (
    <>
      {data?.map(item => (
        <div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {item?.name}
            <div onClick={()=>handleClick(item.id)}>{item?.children?.length > 0 && '+'}</div>
            {item?.children?.length > 0 && <div>
                <button onClick={()=>handleAdd(item.id,'file')}>add file</button>
                <button onClick={()=>handleAdd(item.id,'folder')}>add folder</button>
                <button onClick={()=>deleteNode(item.id)}>Delete</button>
            </div>}
          </div>
          {isAdding && expandedSet.has(item.id) && <div><input onBlur={()=>submitAdd(item.id)} onChange={(e)=>setWord(e.target.value)}/></div>}
          
          <div style={{ marginLeft: '10px' }}>
            {(item?.children?.length && expandedSet.has(item.id)) > 0 && (
              <File data={item.children} AddNodeTolist={AddNodeTolist} deleteNode={deleteNode}/>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default function App(props) {
  const [tree, setTree] = useState([...data]);

   const AddNodeTolist=(id,word,type)=>{
     const copy = [...tree]
     const node = getNode(copy,id)
     const obj = {
         name : word,
         id : Date.now(),
         children : type === "folder" ? [] : null
     }
     node.children = [obj,...node.children]
     setTree(copy)
  }

const getNode = (data, id) => {
  for (let item of data) {
    if (item.id === id) {
      return item;
    } else if (item.children?.length) {
      getNode(item.children, id);
    }
  }
};

const executeDelete = (data, id) => {
  return data
    .filter(el => el.id !== id)
    .map(el => ({
      ...el,
      children: el.children ? executeDelete(el.children, id) : [],
    }));
};

  const deleteNode=(id)=>{
    const copy = [...tree]
    const nodes = executeDelete(copy,id)
    setTree(nodes)
  }

  return (
    <div className='App'>
      <File data={tree} AddNodeTolist={AddNodeTolist} deleteNode={deleteNode}/>
    </div>
  );
}



```js
