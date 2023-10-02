import React,{useState,useEffect,useContext} from 'react';
import { NavLink } from 'react-router-dom'
import {UserContext} from '../App';
const Navbar = () => {
  const {state,dispatch}=useContext(UserContext);

  const RenderMenu = () =>{
    if(state){
      return(
        <>
        <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
      </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/logout" >Logout</NavLink>
      </li>
 
        </>
      )
    }
    else{
      return(
        <>
         <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
      </li>
          <li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">Signup</NavLink>
      </li>
        </>
      )
    }
  }
   
    return (
        <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink className="navbar-brand" to="/navbar"><h2>Tech <span style={{color:'#34a3c2'}}>K</span>T</h2></NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <RenderMenu/>
    </ul>
  </div>
</nav>
        </div>
    )
}

export default Navbar
