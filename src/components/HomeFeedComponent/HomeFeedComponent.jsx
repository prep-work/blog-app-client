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
        // <div className="container mb-2" style={{ backgroundColor: "#f8f9fa", padding: "20px", border: "1px solid black"}}>
        //     <div className="row" onClick={handleBlogClick}>
        //         <div className="col-md-10">
        //             <div className="row">
        //                 <div className="col-md-1">
        //                     <img src={blog.author.image} alt="" className="img-fluid rounded-circle" style={{ width: "50px", height: "50px" }} />
        //                 </div>
        //                 <div className="col-md-6 pt-3">
        //                     <h5>{blog.author.firstName} {blog.author.lastName} . {createdAt}</h5>
        //                 </div>
        //             </div>
        //             <div className="row mt-4">
        //                 <div className="col-md-12">
        //                     <h1>{blog.title}</h1>
        //                 </div>
        //             </div>
        //             <div className="row">
        //                 <div className="col-md-12">
        //                     <h6>{blog.description}</h6>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="col-md-2">
        //             <img src={blog.image} alt="" className="img-fluid" style={{ width: "200px", height: "200px", backgroundSize: "cover" }} />
        //         </div>
        //         {/* <div className="col-md-2 d-flex justify-content-center align-items-center">
        //             <button className="btn btn-primary" onClick={handleSubmit}>Read Post</button>
        //         </div> */}

        //     </div>
        // </div>
        
        // <div className="blog-post-container" onClick={handleBlogClick}>
        //     <div className="blog-post-wrapper">
        //     <div className="blog-post-image-container">
        //         <img
        //             src={blog.image}
        //             alt=""
        //             className="blog-post-image"
        //             style={{ width: 200, height: 200, objectFit: 'cover' }} // Responsive image
        //         />
        //     </div>
        //     <div className="blog-post-content-container">
        //         <div className="blog-post-header">
        //             <div className="author-info">
        //                 <img
        //                     src={blog.author.image}
        //                     alt="Blog author's profile image"
        //                     className="author-image"
        //                     style={{ width: 50, height: 50, borderRadius: '50%' }} // Rounded image
        //                 />
        //                 <div className="author-details">
        //                     <h5 className="author-name">
        //                     {blog.author.firstName} {blog.author.lastName}
        //                     </h5>
        //                     <p className="published-date">{createdAt}</p>
        //                 </div>
        //             </div>  
        //         </div>

        //         <div className="blog-post-content">
        //             <h1 className="blog-post-title">{blog.title}</h1>
        //             <p className="blog-post-description">{blog.description}</p>
        //         </div>
        //     </div>
        //     </div>
            
            
        // </div>

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