import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import useUserContext from '../hooks/useUserContext'

const Login = () => {

    const { setIsLoggedIn, setUserProfile } = useUserContext()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const emailHandler = (event) =>{
        setEmail(event.target.value)
    }

    const passwordHandler = (event) =>{
        setPassword(event.target.value)
    }

    const formSubmitHandler = (event) =>{
        event.preventDefault()

        axios
            .post(`http://localhost:3500/api/v1/user/login`,
                {
                    email : email,
                    password : password
                }, 
                {
                    withCredentials: true,
                })
                .then((response) => {
                    if (response.status === 200)
                    {
                        setIsLoggedIn(true)
                        setUserProfile(response.data.userData)
                        localStorage.setItem('isLoggedIn', true)
                        localStorage.setItem('userProfile', JSON.stringify(response.data.userData))
                        alert(`Welcome ${response.data.message}  !`)
                        navigate('/')
                    }
                })
                .catch((error) => {
                    if(error.response.status == 401) {
                        alert(`Error: ${error.response.data.message}`)
                    }
                    if(error.response.status == 500) {
                        alert('Something went wrong, try again later')
                    }
                    toast.error(`Error: ${error.response?.data?.message || 'Login failed!'}`, {
                        position: 'top-right'
                    })
                })
    }

    return (
        <React.Fragment>
            <div className="container-login mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 ">
                        <h1 className='mb-4'>Login</h1>
                        <form onSubmit={formSubmitHandler}>
                            <div className='mb-3'>
                                <label>Email</label>
                                <input
                                    type='email'
                                    className='form-control'
                                    placeholder='Enter your email address'
                                    value={email}
                                    onChange={emailHandler}
                                    required
                                />
                            </div>

                            <div className='mb-3'>
                                <label>Password</label>
                                <input
                                    type='password'
                                    className='form-control'
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={passwordHandler}
                                    required
                                />
                            </div>

                            <div className='mb-3'>
                            <div className='d-grid'>
                                <button type='submit' className='btn btn-primary' >Submit</button>
                            </div>
                            <p className='text-right mt-3'>
                                New User? <Link to='/signup'>Register here!</Link>
                            </p>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login
