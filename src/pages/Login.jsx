import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const Login = ({setIsLogin, isLogin}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                },
                withCredentials: true,
            })
        .then((response) => {
            console.log(response)
            if (response.status == 200)
            {
                console.log(isLogin)
                const sessionID = response.data.data[0]
                localStorage.setItem('SessionID', sessionID)
                alert(`Welcome ${response.data.message}  !`)
                window.location.href = '/'
            }
        })
        .catch((error) => {
        //   alert(`Status : ${error.response.status} - ${error.response.data.message}`)
      })
    }

  return (
    <React.Fragment>
        <div className="container mt-5">
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