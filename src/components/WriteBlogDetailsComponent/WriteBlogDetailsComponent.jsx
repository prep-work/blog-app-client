import React, { useEffect, useRef, useState } from 'react'
import "./WriteBlogDetailsComponent.css"
import useBlogContext from '../../hooks/useBlogContext'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'


const WriteBlogDetailsComponent = () => {

    const fileInputRef = useRef()

    const { blogData, setBlogData } = useBlogContext()
    const [description, setDescription] = useState(blogData.description)
    const [image, setImage] = useState(blogData.image)

    const handleImageBoxClick = () => {
        fileInputRef.current.click()
    }

    const handleImage = (event) => {
        const file = event.target.files[0]
        setImage(file)
        setBlogData(prevValue => ({
            ...prevValue,
            image: file
        }))
    }

    const handleDescription = (event) => {
        const description = event.target.value
        setDescription(description)
        setBlogData(prevValue => ({
            ...prevValue,
            description
        }))
    }

    const handlePublish = () => {
        const formData = new FormData();
        formData.append('title', blogData.title);
        formData.append('description', blogData.description);
        formData.append('blogContent', blogData.blogContent);
        formData.append('image', blogData.image);
        const sessionID = localStorage.getItem('SessionID')
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
        <div className="write-details-container">
                <div className="write-details-header">
                    <button>Keep edit</button>
                </div>
            <div className="write-details-description-container">
                <div className="write-details-image">
                    <h3>Header Image</h3>
                    <div className="write-details-image-box" onClick={handleImageBoxClick}>
                        <input type="file" alt="user uploaded image for header of the blog" ref={fileInputRef} onChange={handleImage} accept="image/png, image/jpg, image/jpeg"/>
                        {image ? <img src={URL.createObjectURL(image)} /> : <p>Click here to upload image</p>}
                    </div>
                    <p><span>Note: </span>Include a high-quality image in your story to make it more inviting to readers.</p>
                </div>
                <div className="write-details-description">
                    <h3>Description</h3>
                    <textarea type="text" value={description} placeholder='Write the description' onChange={handleDescription}/>
                    <p><span>Note: </span>A well-written description can be the gateway for readers to choose your tale among the vast sea of options.</p>
                    <div className="write-blog-publish">
                        <button onClick={handlePublish}>Publish Now</button>
                        <p><a href="#">learn more</a> about what happens to your post when you publish.</p>
                    </div>
                </div>
            </div>
            {/* <div className="write-details-tag-container">

            </div> */}
            
        </div>
    )
}

export default WriteBlogDetailsComponent