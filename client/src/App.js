
import './App.css';
import Marker from "./Marker"
import { useState, useEffect } from "react";
import { Wrapper, } from "@googlemaps/react-wrapper";
import Map from "./Map"
import { MY_API_KEY } from "./myApiKey"
function App() {
  const [input, setInput] = useState("");
  const [openChoicesList, setOpenChoicesList] = useState(false)
  const [center, setCenter] = useState({ lat: 31, lng: -97 });
  const [filteredState, setFilteredState] = useState([]);
  const [focus, setFocus] = useState("")
  const pinkBG = { "backgroundColor": "pink" }
  const render = (status) => {
    return <h1>{status}</h1>;
  };
  const changMapCenter = (chosenState) => {
    setInput(chosenState)
    gqFetchCenter(chosenState)
    setFilteredState([])
  }
  const gqFetchStates = (input) => {
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `query GetStates($input: String) {
          states(query: $input)
        }`,
        variables: { input },
      })
    })
      .then(r => r.json())
      .then(res => {
        setFilteredState(res.data.states)
      });
  }
  const gqFetchCenter = (input) => {
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `query GetCenter($input: String) {
          centers(query: $input) {
            lat
            lng
          }
        }`,
        variables: { input },
      })
    })
      .then(r => r.json())
      .then(res => {
        setCenter(res.data.centers)
      });
  }
  useEffect(() => {
    gqFetchStates(input)
  }, [input]);
  return (
    <div className="App">
      <h1>State Selection</h1>
      <div className="inputSelect">
        <input
          value={input}
          onFocus={() => setOpenChoicesList(true)}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" ? changMapCenter(e.target.value) : undefined
          }></input>
        {openChoicesList && filteredState.length !== 0 ? (
          <ul className="choicesList">
            {filteredState.map(state => <li
              key={state}
              onClick={() => changMapCenter(state)}
              style={focus === state ? pinkBG : undefined}
              onMouseOver={(e) => setFocus(e.target.innerHTML)}
              onMouseOut={() => setFocus("")}>{state}</li>)}
          </ul>) : undefined}
      </div>


      <Wrapper apiKey={MY_API_KEY} render={render}>
        <Map center={center} zoom={3} >
          <Marker position={center} />

        </Map>
      </Wrapper>


    </div >
  );
}

export default App;
