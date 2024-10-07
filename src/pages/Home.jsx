import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogPostListComponent from '../components/HomeFeedComponent/HomeFeedComponent.jsx'
import useBlogContext from '../hooks/useBlogContext.jsx'

const Home = () => {

    const {blogPost, setBlogPost} = useBlogContext()

    const fetchAllPosts = async () => {
        axios
            .get(
                'http://localhost:3500/api/v1/user/getAllPosts',
                {
                    withCredentials: true,
                }
            )
        .then((response) => {
            console.log(response.data.data)
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
                <div className="" key={index}>
                    <BlogPostListComponent blog={blog}/>
                </div>
                
            ))}
        </div>
    )
}

export default Home