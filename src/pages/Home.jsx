import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogPostListComponent from '../components/BlogPostListComponent/BlogPostListComponent'

const Home = () => {
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
            setBlogPost(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
        
    }

    useEffect( () => {
        fetchAllPosts()
    }, [])

    return (
        <div style={{marginTop: "20px"}}>
            {blogPost && blogPost.map((blog, index) =>  (
                <div className="container mb-2" key={index}>
                    <BlogPostListComponent blog={blog}/>
                </div>
                
            ))}
        </div>
    )
}

export default Home