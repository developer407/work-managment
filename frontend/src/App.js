import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar/Navbar';
import Event from './components/Events/Event';
import Dashboard from './components/Dashboard/Dashboard';

function App() {

  const {auth}=useSelector(store=>store)
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/login" element={<Auth/>}></Route>
        <Route path="/register" element={<Auth/>}></Route>
        <Route path="/upcoming-events" element={<Event/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
