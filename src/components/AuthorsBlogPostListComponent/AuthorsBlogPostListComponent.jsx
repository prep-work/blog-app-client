import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthorsBlogPostListComponent = ({ blog }) => {
    const navigate = useNavigate();
    const createdAt = blog.createdAt.split('T')[0];

    const handleEditSubmit = () => {
        navigate('/my-blog/edit', { state: { blogData: blog }});
    };

    const handleViewSubmit = () => {
        navigate('/blog', { state: { blogData: blog }});
    };

    const handleDelete = () => {
        console.log(blog._id);
        const sessionID = localStorage.getItem('SessionID');

        axios
            .delete(
                `http://localhost:3500/api/v1/user/deleteBlog/${blog._id}`,
                {
                    headers: {
                        'SessionID': 'SessionID=' + sessionID,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            .then((response) => {
                if(response.data.code === 200) {
                    console.log(response.data);
                    alert(`${response.data.message} !`);
                    window.location.href = '/my-blog'
                }
            })
            .catch((error) => {
                alert(`Status : ${error.response.status} - ${error.response.data.message}`);
            });
    };

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
                <div className="col-md-2 d-flex flex-column justify-content-start align-items-center">
                    <button className="btn btn-primary" onClick={handleEditSubmit} style={{ marginTop: "30px", width: "150px", height: "40px" }}>Edit Post</button>
                    <button className="btn btn-primary" onClick={handleViewSubmit} style={{ marginTop: "15px", width: "150px", height: "40px" }}>View Post</button>
                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#exampleModal-${blog._id}`} style={{ marginTop: "15px", width: "150px", height: "40px" }}>
                        Delete Post
                    </button>

                    <div className="modal fade" id={`exampleModal-${blog._id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${blog._id}`} aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id={`exampleModalLabel-${blog._id}`}>Delete Blog Post</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete the Post ? 
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Nope</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AuthorsBlogPostListComponent;
