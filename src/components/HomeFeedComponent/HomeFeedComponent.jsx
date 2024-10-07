import React from 'react'
import { useNavigate } from 'react-router-dom'
import'./HomeFeedComponent.css'
import { formatDistance } from 'date-fns'

const BlogPostListComponent = ({blog}) => {
    const navigate = useNavigate()
    const createdAt = blog.createdAt.split('T')[0]
    const timestamp = new Date(blog.createdAt)
    const now = new Date()
    const timeAgo = formatDistance(timestamp, now, { addSuffix: true })
    const handleBlogClick = () => {
        navigate('/blog', { state: {blogData: blog}})
    }
    
    return (

        <div className="blog-post-container" onClick={handleBlogClick}>
            <div className="blog-post-image-container">
                <img 
                    src={blog.image}
                    alt="Blog Image"
                    className="blog-image"
                />
            </div>
            <div className="blog-post-content-container">
                <div className="blog-post-header">
                    <img 
                        src={blog.author.image} 
                        alt="" 
                        className="blog-post-author-image"
                    />
                    <div className="blog-post-author-name">{blog.author.firstName}</div>
                    <div className="blog-post-timestamp">{timeAgo}</div>
                </div>
                <div className="blog-post-content">
                    <h3>{blog.title}</h3>
                </div>
            </div>
        </div>
    )
}

export default BlogPostListComponent