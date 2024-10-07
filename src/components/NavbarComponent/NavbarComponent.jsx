import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import './NavbarComponent.css';
import Signup from '../../pages/Signup';
import WriteBlogComponent from '../WriteBlogComponent/WriteBlogComponent';
import BlogComponent from '../BlogComponent/BlogComponent';
import { BsPencilSquare } from "react-icons/bs"
import { MdOutlineAccountCircle } from "react-icons/md";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiAccountBoxLine } from "react-icons/ri";
import { TbChecklist } from "react-icons/tb";
import MyBlogComponent from '../UserBlogComponent/UserBlogComponent';
import EditBlogPostComponent from '../EditBlogPostComponent/EditBlogPostComponent';
import WriteBlogDetailsComponent from '../WriteBlogDetailsComponent/WriteBlogDetailsComponent';
import axios from 'axios';
import useUserContext from '../../hooks/useUserContext';


const NavbarComponent = () => {
    const { isLoggedIn, setIsLoggedIn, setUserProfile } = useUserContext()

    const handleSignout = () => {
        axios
            .get(
                    'http://localhost:3500/api/v1/user/logout',
                    {
                        withCredentials: true,
                    }
                )
            .then((response) => {
                if(response.status == 200) {
                    setIsLoggedIn(false)
                    setUserProfile(null)
                    localStorage.removeItem('isLoggedIn')
                    localStorage.removeItem('userProfile')
                    alert('Successfully Logged out')
                    location.reload()
                }
            })
            .catch((error) => {
                console.log(error)
            })
        
    }

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Home</Link>
            <div className="d-flex">
              <ul className="navbar-nav">

                <li className="nav-item">
                  <Link className="nav-link" to="/write" style={{fontSize: "18px"}}><BsPencilSquare /> Write</Link>
                </li>
                {
                    isLoggedIn 
                        ?
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle flex justify-content-center align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: "18px"}}>
                                <MdOutlineAccountCircle style={{ fontSize: "22px" }}/>  Account
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a className={`dropdown-item ${!isLoggedIn ? 'disabled-link' : ''}`} href="#" style={{fontSize: "18px"}}>
                                        <RiAccountBoxLine style={{ fontSize: "22px" }}/>  Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a className={`dropdown-item ${!isLoggedIn ? 'disabled-link' : ''}`} href="#" style={{fontSize: "18px"}}>
                                        <MdOutlineLibraryBooks style={{ fontSize: "22px" }}/>  Library
                                        </a>
                                    </li>
                                    <li>
                                        <a className={`dropdown-item ${!isLoggedIn ? 'disabled-link' : ''}`} href="/my-blog" style={{fontSize: "18px"}}>
                                        <TbChecklist style={{ fontSize: "22px" }}/>  My BlogPost
                                        </a>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <a className={`dropdown-item ${!isLoggedIn ? 'disabled-link' : ''}`} href="#" style={{fontSize: "18px"}} onClick={handleSignout}>
                                            Sign out
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        :
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" style={{fontSize: "18px"}}>Login</Link>
                        </li>
                }

              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/write" element={<WriteBlogComponent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Signup />} />
            <Route path="/blog" element={<BlogComponent />} />
            <Route path="/my-blog" element={<MyBlogComponent />} />
            <Route path="/my-blog/edit" element={<EditBlogPostComponent />} />
            <Route path="/write-details" element={<WriteBlogDetailsComponent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default NavbarComponent;
