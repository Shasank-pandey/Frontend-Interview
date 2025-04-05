```js
/****/VANILLA JS VERSION/****/

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
  <title>Typeahead Search</title>
</head>
<body>
  <div class="search-container">
    <input type="text" id="searchInput" placeholder="Type to search">
    <ul id="suggestions"></ul>
  </div>
  <script src="script.js"></script>
</body>
</html>




.search-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

input[type="text"] {
  width: 100%;
  padding: 10px;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 10px;
  display: none;
}

li {
  padding: 5px;
  cursor: pointer;
}

li:hover {
  background-color: #f2f2f2;
}







const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'China',
  'India',
  'Brazil',
  'South Korea',
];


const searchInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');


searchInput.addEventListener('input',searchBuddy)

function searchBuddy(){
  const input = searchInput.value.toLowerCase();
  let countryList = countries.filter(item => item.toLowerCase().includes(input))
  console.log(countryList)
  //update UI
  if(countryList.length === 0 ) suggestions.style.display = "none"
  else {
    countryList.forEach(item=>{
      suggestions.style.display = "block"
      let lidiv = document.createElement('li')
      lidiv.textContent = item
      //console.log(listDiv)
      lidiv.addEventListener('click',()=>{
        searchInput.value = item
        suggestions.style.display = "none"
      })
      suggestions.appendChild(lidiv);
      
    })


----------------------------------------------------------------------------------------------------------------------------------------------------------------



/****/REACT VERSION/****/

import React, { useState, useEffect } from 'react';

const dummySuggestions = [
  "Apple", "Apricot", "Avocado", "Banana", "Blackberry", "Blueberry",
  "Cherry", "Coconut", "Cranberry", "Date", "Dragonfruit", "Fig",
  "Grape", "Grapefruit", "Guava", "Kiwi", "Lemon", "Lime", "Mango",
  "Melon", "Nectarine", "Orange", "Papaya", "Peach", "Pear", "Pineapple",
  "Plum", "Pomegranate", "Raspberry", "Strawberry", "Watermelon"
];

// ✅ Suggestion List Component
const TypeAheadList = ({ list, searchKey, activeIndex }) => {
  const highlightMatch = (item) => {
    const matched = item.slice(0, searchKey.length);
    const rest = item.slice(searchKey.length);
    return (
      <>
        <span style={{ color: 'green' }}>{matched}</span>
        <span>{rest}</span>
      </>
    );
  };

  return (
    <div>
      {list.map((item, idx) => (
        <div
          key={item}
          style={{
            backgroundColor: idx === activeIndex ? 'lightgray' : 'transparent',
            padding: '4px',
            borderRadius: '4px'
          }}
        >
          {highlightMatch(item)}
        </div>
      ))}
    </div>
  );
};

// ✅ Main App Component
const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions] = useState(dummySuggestions);
  const [filteredList, setFilteredList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setActiveIndex(-1);
  };

  useEffect(() => {
    if (inputValue === "") {
      setFilteredList([]);
    } else {
      const filtered = suggestions.filter(item =>
        item.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [inputValue, suggestions]);

const handleKeyDown = (e) => {
  if (e.key === "ArrowDown") {
    if (activeIndex < filteredList.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  } else if (e.key === "ArrowUp") {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  } else if (e.key === "Enter") {
    if (activeIndex >= 0 && activeIndex < filteredList.length) {
      setInputValue(filteredList[activeIndex]);
      setFilteredList([]);
      setActiveIndex(-1);
    }
  }
};

  return (
    <div style={{ width: '300px', margin: '40px auto', fontFamily: 'Arial' }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search fruits..."
        style={{
          width: '100%',
          padding: '8px',
          boxSizing: 'border-box'
        }}
      />
      <TypeAheadList
        list={filteredList}
        searchKey={inputValue}
        activeIndex={activeIndex}
      />
    </div>
  );
};

export default App;
    
  }
}
