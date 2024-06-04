import { useState } from 'react';
import { items } from './items';

import './App.css';
//Build this INSANE Multi filter feature for your next project | React Js

//https://www.youtube.com/watch?v=u1yr_HZivzk&t=67s

let itemsList = ['Bags', 'Watches', 'Sports', 'Sunglasses'];

function App() {
  const [filters, setFilters] = useState(itemsList.map((item) => ({ name: item, isSelected: false })));

  const [secondFilters, setSecondFilters] = useState(items);


  function handleSelection(itemSelected) {

    //to select multiple just change boolean value
    let newFilteredItems = filters.map((item) => {
      if (item.name == itemSelected.name) {
        item.isSelected = !item.isSelected;
      }

      return item;
    });

    setFilters(newFilteredItems);
  }

  function getFilters() {
    return (
      <div className="top-filters">
        {filters.map((item, index) => {
          return (
            <div
              key={index}
              className={`capsule ${item.isSelected ? 'active' : ''}`}
              onClick={() => handleSelection(item)}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    );
  }

  function getSecondFilters() {

    //get names of first row filters selection
    const selectedFirstFilter = filters.filter((item) => {return item.isSelected}).map(item => item.name);

    let selectedSecondFilter = [];

    if(selectedFirstFilter.length==0)  {
      selectedSecondFilter =secondFilters;
    }else{
      selectedSecondFilter = secondFilters.filter((item) => {return selectedFirstFilter.includes(item.category);});
    }

     


    return (
      <div className="top-filters">
        {selectedSecondFilter.map((item, index) => {
          return (
            <div key={index} className="capsule-second">
              <span> {item.name}</span>
              <span> {item.category}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {filters.length && getFilters()}

      {getSecondFilters()}
    </>
  );
}

export default App;
