import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { IoArrowBackCircleOutline } from "react-icons/io5";


const EditBlogPostComponent = () => {
    const navigate = useNavigate()
    let location = useLocation()
    const {blogData} = location.state || {}

    const [title, setTitle] = useState(blogData.title)
    const [description, setDescription] = useState(blogData.description)
    const [content, setContent] = useState(blogData.blogContent)
    const [profileImage, setProfileImage] = useState(blogData.image)

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleContentChange = (event) => {
        setContent(event.target.value)
    }

    const handleImageChange = (event) => {
        // Handle profile image upload
        const imageFile = event.target.files[0]
        setProfileImage(imageFile)
    }

    const handleBlackButton = () => {
        navigate('/my-blog')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('blogContent', content);
        formData.append('image', profileImage);
        const sessionID = localStorage.getItem('SessionID')
        console.log(formData)
        axios
            .put(
                `http://localhost:3500/api/v1/user/editBlog/${blogData._id}`, 
                formData,
                {
                    headers: {
                        'SessionID': 'SessionID=' + sessionID,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
        .then((response) => {
            console.log(response.data)
            if(response.data.code === 201) {
                alert(`${response.data.message} !`)
                window.location.href = '/my-blog'
            }
        })
        .catch((error) => {
            alert(`Status : ${error.response.status} - ${error.response.data.message}`)
        })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                <button className="btn btn-transparent" onClick={handleBlackButton} style={{ width: "30px", height: "30px" }}>
                    <IoArrowBackCircleOutline style={{ fontSize: "30px" }} />
                </button>

                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="text-black text-center mb-4 pb-2" style={{borderBottom: "1px solid #d3d3d3"}}>Edit Your Blog</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label"><h3>Title</h3></label>
                            <input type="text" className="form-control" id="title" value={title} onChange={handleTitleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label"><h5>Description</h5></label>
                            <input type="text" className="form-control" id="description" value={description} onChange={handleDescriptionChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="profileImage" className="form-label"><h5>Blog Cover Image</h5></label>
                            <div className="row">
                                <div className="col-md-6">
                                    {/* Image column */}
                                    <img src={profileImage} alt="Preview" className="img-fluid" style={{height: "200px", width: "200px"}} />
                                </div>
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    {/* Input column */}
                                    <input type="file" className="form-control" id="profileImage" onChange={handleImageChange} />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label"><h5>Content</h5></label>
                            <textarea className="form-control" id="content" rows="8" value={content} onChange={handleContentChange} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mb-4">Publish</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default EditBlogPostComponent