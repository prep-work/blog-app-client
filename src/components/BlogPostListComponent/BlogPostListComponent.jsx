import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogPostListComponent = ({blog}) => {
    const navigate = useNavigate()
    const createdAt = blog.createdAt.split('T')[0]
    const handleSubmit = () => {
        navigate('/blog', { state: {blogData: blog}})
    }
    return (
        <div className="container mb-2" style={{ backgroundColor: "#f8f9fa", padding: "20px", border: "1px solid black"}}>
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-1">
                            <img src={blog.author.image} alt="" className="img-fluid rounded-circle" style={{ width: "50px", height: "50px" }} />
                        </div>
                        <div className="col-md-6 pt-3">
                            <h5>{blog.author.firstName} {blog.author.lastName} . {createdAt}</h5>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <h1>{blog.title}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h6>{blog.description}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <img src={blog.image} alt="" className="img-fluid" style={{ width: "200px", height: "200px", backgroundSize: "cover" }} />
                </div>
                <div className="col-md-2 d-flex justify-content-center align-items-center">
                    <button className="btn btn-primary" onClick={handleSubmit}>Read Post</button>
                </div>

            </div>
        </div>
    )
}

export default BlogPostListComponent