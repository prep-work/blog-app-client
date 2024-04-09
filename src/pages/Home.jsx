import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogPostListComponent from '../components/BlogPostListComponent/BlogPostListComponent'
import useBlogContext from '../hooks/useBlogContext.jsx'

const Home = () => {

    const {blogPost, setBlogPost} = useBlogContext()
    // const [blogPost, setBlogPost] = useState([])
    const sessionID = localStorage.getItem('SessionID')
    if(!sessionID) {
        window.location.href = '/login'
    } 

    const fetchAllPosts = async () => {
        const sessionID = localStorage.getItem('SessionID')
        axios
            .get(
                'http://localhost:3500/api/v1/user/getAllPosts',
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
                    <BlogPostListComponent blog={blog}/>
                </div>
                
            ))}
        </div>
    )
}

export default Home