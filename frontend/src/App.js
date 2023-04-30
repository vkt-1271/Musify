import React from 'react'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Register from "./components/Register"
import Login from "./components/Login"
import Footer from "./components/Footer"

import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";
import react, { useState } from 'react';


const App = () => {
  return (
    <>
    <Router>

      <Navbar/>
      <Route exact path="/">
        <Home/>
      </Route>

      <Route path="/about">
        <About/>
      </Route>

      <Route path="/contact">
        <Contact/>
      </Route>

      <Route path="/register">
        <Register/>
      </Route>

      <Route path="/login">
        <Login/>
      </Route>

      {/* <Route path="/songs">
        <Songs/>
      </Route> */}

      <Route path="/home">
        <Home/>
      </Route>
      <Footer/>
      </Router>
      
    </>
  )
}

export default App
