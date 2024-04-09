import React, { useState } from 'react'
import axios from 'axios'
import useBlogContext from '../hooks/useBlogContext'

const WriteBlog = () => {

    const sessionID = localStorage.getItem('SessionID')
    if(!sessionID) {
        window.location.href = '/login'
    }

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [profileImage, setProfileImage] = useState(null)

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
            .post(
                `http://localhost:3500/api/v1/user/newPost`, 
                formData,
                {
                    headers: {
                        'SessionID': 'SessionID=' + sessionID,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
        .then((response) => {
            if(response.data.code === 201) {
                alert(`${response.data.message} !`)
                window.location.href = '/'
            }
        })
        .catch((error) => {
            alert(`Status : ${error.response.status} - ${error.response.data.message}`)
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2 className="text-white mb-4">Write Your Blog</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label"><h5>Title</h5></label>
                            <input type="text" className="form-control" id="title" value={title} onChange={handleTitleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label"><h5>Description</h5></label>
                            <input type="text" className="form-control" id="description" value={description} onChange={handleDescriptionChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="profileImage" className="form-label"><h5>Blog Cover Image</h5></label>
                            <input type="file" className="form-control" id="profileImage" onChange={handleImageChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label"><h5>Content</h5></label>
                            <textarea className="form-control" id="content" rows="8" value={content} onChange={handleContentChange} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Publish</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default WriteBlog
