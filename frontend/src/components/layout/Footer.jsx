import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../main';
import { AiFillInstagram } from "react-icons/ai";
import { FaGitSquare } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { FRONTEND_URL } from '../../FrontendURL';

const Footer = () => {
  const isDashboard = useLocation(`${FRONTEND_URL}/dashboard`);
  const {mode, setMode} = useContext(Context);

  return (
    <>
     <footer className={
          isDashboard.pathname === "/dashboard"
          ? "hideFooter" : mode === "light"
          ? "light-footer" 
          : "dark-footer"
      }>
        
        <div className="container">
          <div className="about">
            <h3>About</h3>
            <p>Blog Shog is more than just a blogging platform - it's a community. We value the diversity of thoughts and the richness it brings to our content. We invite you to be a part of this journey, to share your stories, learn from others, and grow with us.</p>
            <p>
              <span>Email:</span>ayush@gmail.com
            </p>
            <p>
              <span>Phone:</span>12345678910
            </p>
          </div>
          <div className="quick_links">
            <h3>Quick Links</h3>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/blogs"}>Blogs</Link>
              <Link to={"/about"}>About</Link>
              <Link to={"/dashboard"}>Dashboard</Link>
            </ul>
          </div>
          <div className="categories">
            <h3>Categories</h3>
            <ul>
              <li>LifeStyle</li>
              <li>Technology</li>
              <li>Sports</li>
              <li>Travel</li>
              <li>Business</li>
              <li>Economy</li>
            </ul>
          </div>
          <div className="news_letter">
            <div>
              <h3>Weekly NewsLetter</h3>
              <p>Get blog articles and offer via email</p>
            </div>
            <div>
              <input type="text" placeholder='Your Email'/>
              <button>Subscribe</button>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="logo">Blog <span>Shog</span></div>
          <div className="links">
            <Link to={'/'} target='_blank'><AiFillInstagram /></Link>
            <Link to={'/'} target='_blank'><FaGitSquare /></Link>
            <Link to={'/'} target='_blank'><AiFillYoutube /></Link>
            <Link to={'/'} target='_blank'><AiFillLinkedin /></Link>
          </div>
        </div>
      </footer> 
    </>
  )
}

export default Footer
