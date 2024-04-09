import React, { useEffect, useState } from 'react'
import AuthorsBlogPostListComponent from '../AuthorsBlogPostListComponent/AuthorsBlogPostListComponent'
import axios from 'axios'

const MyBlogComponent = () => {
    const [blogPost, setBlogPost] = useState([])

    const fetchAllPosts = async () => {
        const sessionID = localStorage.getItem('SessionID')
        axios
            .get(
                'http://localhost:3500/api/v1/user/getAllUserPosts',
                {
                    headers: {
                        'SessionID': 'SessionID=' + sessionID,
                    }
                }
            )
        .then((response) => {
            setBlogPost(response.data.data)
        })
        .catch((error) => {
            alert(error.message)
        })
        
    }

    useEffect( () => {
        fetchAllPosts()
    }, [])

    return (
        <div style={{marginTop: "20px"}}>
            {blogPost && blogPost.map((blog, index) =>  (
                <div className="container mb-2" key={index}>
                    <AuthorsBlogPostListComponent blog={blog}/>
                </div>
                
            ))}
        </div>
    )
}

export default MyBlogComponent