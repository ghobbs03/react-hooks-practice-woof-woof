import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [pups, setPups] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedDog, setSelectedDog] = useState({});
  const [allPups, setAllPups] = useState([]);
  const [isGoodDog, setIsGoodDog] = useState("");



  useEffect(() => {
    fetch("http://localhost:3001/pups")
      .then((resp) => resp.json())
      .then((pupsArray) => {
        setPups(pupsArray);
        setAllPups(pupsArray);

      });
  }, [])


  function filterGoodDogs(event) {
    
    if (isFiltered === false) { 
      event.target.textContent = "Filter good dogs: ON";
      setPups(pups.filter((pup) => (pup.isGoodDog === true)))
    } else { 
      event.target.textContent = "Filter good dogs: OFF";
      setPups([...allPups]);
    }

    setIsFiltered(!isFiltered);
  }

  function showDogInfo(event) {
    const name = event.target.textContent;
    setSelectedDog(allPups.filter((pup) => (pup.name === name))[0])

  }

  function handleIsGoodDog(event) {
    setIsGoodDog(selectedDog.isGoodDog);

    
    if (isGoodDog) {
      event.target.textContent = "Bad Dog!"
    } else {
      event.target.textContent = "Good Dog!"
    }

    setIsGoodDog(!isGoodDog);

    
    
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button onClick={filterGoodDogs} id="good-dog-filter">Filter good dogs: OFF</button>
      </div>
      <div id="dog-bar">
        {pups.map((pup) => {
          return (<span key={pup.id} onClick={showDogInfo}>{pup.name}</span>)
        })}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
       {selectedDog.name && (<div id="dog-info">
          <img src={selectedDog.image}/>
          <h3>{selectedDog.name}</h3>
         <button onClick={handleIsGoodDog}>{isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
          </div>)}
      </div>
    </div>
  );
}

export default App;
