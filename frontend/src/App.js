import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar/Navbar';
import Event from './components/Events/Event';
import Dashboard from './components/Dashboard/Dashboard';
import { useEffect } from 'react';
import { getUser } from './State/Authentication/Action';
import Resources from './components/Resources/Resources';
import Archive from './components/Archive/Archive';

function App() {

  const {auth}=useSelector(store=>store)
  const dispatch=useDispatch();

  useEffect(()=>{

    dispatch(getUser(auth.jwt || localStorage.getItem("jwt")))

  },[auth.jwt])
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/login" element={<Auth/>}></Route>
        <Route path="/register" element={<Auth/>}></Route>
        <Route path="/upcoming-events" element={<Event/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path='/resources' element={<Resources/>}/>
        <Route path='/archive' element={<Archive/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
