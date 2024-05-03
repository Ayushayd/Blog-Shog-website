import React, { useContext, useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Context} from '../../main';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from 'axios'
import toast from 'react-hot-toast'
import { SERVER_URL } from '../../ServerURL.js';
// import { FRONTEND_URL } from '../../FrontendURL.js'; 

const Navbar = () => {
  const [show, setShow] = useState("false");
  const handleNavbar = () => {
    setShow(!show);
  };
  const isDashboard = useLocation(`https://blog-shog.netlify.app/dashboard`);

  const {mode, setMode, isAuthenticated, user, setIsAuthenticated} = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogout = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.get(`${SERVER_URL}/user/logout`, {withCredentials: true})
      setIsAuthenticated(false);
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <section className={isDashboard.pathname === "/dashboard" ? "hideNavbar" : mode === "light" ? "header light-navbar" : "header dark-navbar"}>
        <nav>
          <div className="logo">
            Blog <span>Shog</span>
          </div>
          <div className={show ? "links show" : "links"}>
            <ul>
              <li>
                <Link to={"/"} onClick={handleNavbar}>HOME</Link>
              </li>
              <li>
                <Link to={"/blogs"} onClick={handleNavbar}>BLOGS</Link>
              </li>
              <li>
                <Link to={"/authors"} onClick={handleNavbar}>ALL AUTHORS</Link>
              </li>
              <li>
                <Link to={"/about"} onClick={handleNavbar}>ABOUT</Link>
              </li>
            </ul>
            <div className="btns">
              <button onClick={()=> mode === "light" ? setMode("dark") : setMode("light")}
              className={mode === 'light'? "mode-btn light-mode":"mode-btn dark-mode"}>
                {
                  mode === "light"? (
                    <CiLight className='light-icon' />
                  ): (<MdDarkMode className='dark-icon'/>)
                }
              </button>
              {
                isAuthenticated && user.role === "Author" ? (
                  <Link to={"/dashboard"} onClick={handleNavbar} className='dashboard-btn'>DASHBOARD</Link>
                ): ("")
              }
              {
                !isAuthenticated ? (<Link to={"/login"} onClick={handleNavbar} className='login-btn'>LOGIN</Link>): (<button onClick={handleLogout} className='logout-btn'>LOGOUT</button>)
              }
            </div>
          </div>
            <RxHamburgerMenu className='hamburger' onClick={handleNavbar} />
        </nav>
      </section>
    </>
  )
}

export default Navbar
