import React from 'react'
import { Button } from "flowbite-react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Dashbord from './Pages/Dashbord';
import Blogs from './Pages/Blogs';
import Signin from './Pages/Signin';
import Sinup from './Pages/Sinup';
import Header from './Components/Header';

const App = () => {
  return (
  <BrowserRouter>
  <Header/>
  <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/dashbord' element={<Dashbord/>}/>
  <Route path='/blogs' element={<Blogs/>}/>
  <Route path='/signin' element={<Signin/>}/>
  <Route path='/sigup' element={<Sinup/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App