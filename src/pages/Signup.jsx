import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Signup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profileImage, setProfileImage] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const firstNameHandler = (event) => {
        setFirstName(event.target.value)
    }

    const lastNameHandler = (event) => {
        setLastName(event.target.value)
    }

    const profileImageHandler = (event) => {
        console.log(event.target.files[0])
        setProfileImage(event.target.files[0])
    }

    const emailHandler = (event) => {
        setEmail(event.target.value)
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    const formSubmitHandler = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', profileImage);
        console.log(formData)
        axios
            .post(`http://localhost:3500/api/v1/user/signup`, formData)
            .then((response) => {
                console.log(response.data)
                if(response.data.code === 201) {
                    alert(`${response.data.message} !`)
                    window.location.href = '/login'
                }
            })
            .catch((error) => {
                alert(`Status : ${error.response.status} - ${error.response.data.message}`)
            })
    }

  return (
    <div className="container-signup mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6 ">
            <h1 className='mb-4'>Sign up</h1>
                <form onSubmit={formSubmitHandler} >
                    <div className='mb-3'>
                        <label>First Name</label>
                        <input 
                            type='text'
                            id='firstName'
                            name='firstName'
                            className='form-control'
                            placeholder='Enter your first name'
                            value={firstName}
                            onChange={firstNameHandler}
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label>Last Name</label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            className='form-control'
                            placeholder='Enter your last name'
                            value={lastName}
                            onChange={lastNameHandler}
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label>Profile Image</label>
                        <input
                            type='file'
                            id='image'
                            name='image'
                            accept="image/png, image/gif, image/jpeg"
                            className='form-control'
                            onChange={profileImageHandler}
                            required
                        />
                    </div>

                    <div className='mb-3'>
                        <label>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
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
                            id='password'
                            name='password'
                            className='form-control'
                            placeholder='Enter your password'
                            value={password}
                            onChange={passwordHandler}
                            required
                        />
                    </div>

                    <div className='d-grid'>
                        <button type='submit' className='btn btn-primary' >Submit</button>
                    </div>

                    <p className='forgot-password text-right mt-3'>
                        Already registered, <Link to='/login'>Sign in here?</Link>
                    </p>

                </form>
            </div>
        </div>
      </div>
  )
}

export default Signup