import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Dashbord from './Pages/Dashbord';
import Blogs from './Pages/Blogs';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Header from './Components/Header';
import FooterCom from './Components/FooterCom';
import PrivateRoute from './Components/PrivateRoute';
import OnlyAdminPrivateRoute from './Components/OnlyUserPrivateRoute';
import CreatePost from './Pages/CreatePost';

const App = () => {
  return (
  <BrowserRouter>
  <Header/>
  <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/about' element={<About/>}/>

  <Route element={<PrivateRoute/>}>
  <Route path='/dashboard' element={<Dashbord/>}/>
  </Route>

 {/* admin router */}
  <Route element={<OnlyAdminPrivateRoute/>}>
  <Route path='/create-post' element={<CreatePost/>}/>
  </Route>
 
  
  <Route path='/blogs' element={<Blogs/>}/>
  <Route path='/signin' element={<Signin/>}/>
  <Route path='/signup' element={<Signup/>}/>

  </Routes>
  <FooterCom/>
  </BrowserRouter>
  )
}

export default App