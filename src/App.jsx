import { useState } from "react";
import "./App.css";
import Search from "./components/Search.jsx";

function App() {
  return (
    <>
    <h1 style={{textAlign:'center', marginTop:'20px'}}>Weather App</h1>
      <div className="App">
        <div className="Search">
          <Search />
        </div>
      </div>
    </>
  );
}

export default App;
