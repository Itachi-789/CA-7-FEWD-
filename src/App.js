import './App.css';
import React from 'react'
import {Route, Routes} from "react-router-dom"
import HomePage from "./components/HomePage"
import LoginForm from "./components/LoginForm"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="form" element={<LoginForm/>}/>
    </Routes>
  );
}

export default App;
