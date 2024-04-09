import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import './NavbarComponent.css';
import Signup from '../../pages/Signup';
import WriteBlog from '../../pages/WriteBlog';
import BlogComponent from '../BlogComponent/BlogComponent';

import { MdOutlineAccountCircle } from "react-icons/md";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiAccountBoxLine } from "react-icons/ri";
import { TbChecklist } from "react-icons/tb";
import MyBlogComponent from '../MyBlogComponent/MyBlogComponent';
import EditBlogPostComponent from '../EditBlogPostComponent/EditBlogPostComponent';


const NavbarComponent = () => {
    const sessionID = localStorage.getItem("SessionID")
    const [isLogin, setIsLogin] = useState(sessionID !== "true")

    const handleSignout = () => {
        localStorage.removeItem('SessionID')
        window.location.href = '/login'
    }

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Home</Link>
            <div className="d-flex">
              <ul className="navbar-nav">
                {
                    !isLogin && 
                    <li className="nav-item">
                    <Link className="nav-link" to="/login" style={{fontSize: "18px"}}>Login</Link>
                    </li>
                }               
                <li className="nav-item">
                  <Link className="nav-link" to="/write" style={{fontSize: "18px"}}>Write</Link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle flex justify-content-center align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: "18px"}}>
                    <MdOutlineAccountCircle style={{ fontSize: "22px" }}/>  Account
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <a class={`dropdown-item ${!isLogin ? 'disabled-link' : ''}`} href="#" style={{fontSize: "18px"}}>
                            <RiAccountBoxLine style={{ fontSize: "22px" }}/>  Profile
                            </a>
                        </li>
                        <li>
                            <a class={`dropdown-item ${!isLogin ? 'disabled-link' : ''}`} href="#" style={{fontSize: "18px"}}>
                            <MdOutlineLibraryBooks style={{ fontSize: "22px" }}/>  Library
                            </a>
                        </li>
                        <li>
                            <a class={`dropdown-item ${!isLogin ? 'disabled-link' : ''}`} href="/my-blog" style={{fontSize: "18px"}}>
                            <TbChecklist style={{ fontSize: "22px" }}/>  My BlogPost
                            </a>
                        </li>
                        <li><hr class="dropdown-divider" /></li>
                        <li>
                            <a class={`dropdown-item ${!isLogin ? 'disabled-link' : ''}`} href="#" style={{fontSize: "18px"}} onClick={handleSignout}>
                                Sign out
                            </a>
                        </li>
                    </ul>
                </li>

              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/write" element={<WriteBlog />} />
            <Route path="/login" element={<Login setIsLogin={setIsLogin} isLogin={isLogin}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Signup />} />
            <Route path="/blog" element={<BlogComponent />} />
            <Route path="/my-blog" element={<MyBlogComponent />} />
            <Route path="/my-blog/edit" element={<EditBlogPostComponent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default NavbarComponent;
