import React,{createContext,useReducer} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import Errorpage from './components/Errorpage';
import { Route,Routes } from 'react-router-dom';
 
import { initialState,reducer} from './reducer/Usereducer';
export const UserContext=createContext();

const App = () => {

 const [state,dispatch]=useReducer(reducer,initialState)
  return (
  <>
    <UserContext.Provider value={{state,dispatch}}>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Errorpage />}/>
    </Routes>
    </UserContext.Provider>
  </>
  )
}

export default App
