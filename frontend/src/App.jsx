import React, { useContext, useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Blogs from './components/pages/Blogs'
import SingleBlog from './components/pages/SingleBlog'
import About from './components/pages/About'
import AllAuthors from './components/pages/AllAuthors'
import Dashboard from './components/pages/Dashboard'
import UpdateBlog from './components/pages/UpdateBlog'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { Context } from './main'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { SERVER_URL } from './ServerURL.js'


const App = () => {
  const {setUser, isAuthenticated, setIsAuthenticated, user, setBlogs} = useContext(Context);


  useEffect(() => {
    const fetchUser = async() => {
      try {
        const {data} = await axios.get(`${SERVER_URL}/user/myProfile`,{
          withCredentials: true
        })
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    const fetchBlogs = async() => {
      try {
        const {data} = await axios.get(`${SERVER_URL}/blog/all`, {
          withCredentials: true
        })
        setBlogs(data.allBlogs)
      } catch (error) {
        setBlogs([])
      }
    };
    fetchUser();
    fetchBlogs();
  }, [isAuthenticated, user])

  useEffect(() => {
    console.log('isAuthenticated or user changed: ', isAuthenticated, user);
  },[isAuthenticated, user]);

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/blog/:id' element={<SingleBlog/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/authors' element={<AllAuthors/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/blog/update/:id' element={<UpdateBlog/>}/>
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  )
}

export default App
