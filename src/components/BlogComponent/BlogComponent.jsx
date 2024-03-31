import React from 'react'
import { useLocation } from 'react-router-dom'

import { BiLike } from "react-icons/bi" // Like
import { BiSolidLike } from "react-icons/bi" // Like fill
import { BiDislike } from "react-icons/bi" // Dislike
import { BiSolidDislike } from "react-icons/bi" // Dislike fill 
import { MdOutlineBookmarkAdded } from "react-icons/md"; // Bookmark 
import { GoBookmarkFill } from "react-icons/go"; // Bookmark fill 


const BlogComponent = () => {
    let location = useLocation()
    const {blogData} = location.state || {}
    console.log(blogData)
    const createdAt = (blogData.createdAt).split('T')[0]

    return (
        <div className='container mt-4'>
            <div className="row">
                <div className="col-md-2">
                    left
                </div>
                <div className="col-md-8">
                    {/* Blog title and description  */}
                    <div className="row">
                        <h1>{blogData.title}</h1>
                        <h5 className=""style={{color: "#808080"}}>
                            {blogData.description}
                        </h5>
                    </div>

                    {/* Author Profile and created Date */}
                    <div className="row" style={{ paddingTop: "30px" }}>
                        <div className="col-md-1">
                            <img src={blogData.author.image} alt="" className="img-fluid rounded-circle" style={{ width: "50px", height: "50px" }} />
                        </div>
                        <div className="col-md-6">
                            <h5>{blogData.author.firstName} {blogData.author.lastName}</h5>
                            <h5>{createdAt}</h5>
                        </div>
                    </div>

                    {/* Like, dislike, post save  */}
                    <div className="row flex-row" style={{ marginTop: "30px", paddingTop: "10px", paddingBottom: "10px", borderTop: "1px solid #D3D3D3", borderBottom: "1px solid #D3D3D3" }}>
                        <div className="col-md-1">
                            <BiLike style={{ fontSize: "30px" }}/>
                        </div>
                        <div className="col-md-1">
                            <BiDislike style={{ fontSize: "29px" }}/>
                        </div>
                        <div className="col-md-8">

                        </div>
                        <div className="col-md-2">
                            <MdOutlineBookmarkAdded style={{ fontSize: "30px" }}/>
                        </div>
                    </div>

                    {/* Blog image  */}
                    <div className="row" style={{marginTop: "30px"}}>
                        <img src={blogData.image} />
                    </div>

                    {/* Blog content  */}
                    <div className="row" style={{marginTop: "30px"}}>
                        <p>{blogData.blogContent}</p>
                    </div>

                    {/* comments */}
                    <div className="row" style={{marginTop: "20px" , borderTop: "1px solid #D3D3D3"}}>
                        <h4 style={{paddingTop: "10px"}}>
                            Comments
                        </h4>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <textarea className="form-control" rows="3" placeholder="Write your comment"></textarea>
                        </div>
                    </div>

                    <div className="row" style={{paddingBottom: "20px", borderBottom: "1px solid #D3D3D3"}}>
                            <div className="col-md-9">

                            </div>
                            <div className="col-md-3" style={{marginTop: "20px"}}>
                                <button className="btn btn-primary">Post Comment</button>
                            </div>
                        </div>

                    <div className="row" style={{marginTop: "50px"}}>

                    </div>

                </div>
                <div className="col-md-2">
                    right
                </div>
            </div>

        </div>
    )
}

export default BlogComponent