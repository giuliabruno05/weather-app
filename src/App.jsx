import { useState } from "react";
import "./App.css";
import Search from "./components/Search.jsx";

function App() {
  return (
    <>
      <div className="App">
        <h1>Weather App</h1>
        <Search />
      </div>
    </>
  );
}

export default App;
