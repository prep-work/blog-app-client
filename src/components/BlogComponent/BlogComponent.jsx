import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

import { FaRegHeart } from "react-icons/fa" // Like
import { FaHeart } from "react-icons/fa" // Like fill
import { MdOutlineBookmarkAdded } from "react-icons/md" // Bookmark 
import { GoBookmarkFill } from "react-icons/go" // Bookmark fill 
import useBlogContext from '../../hooks/useBlogContext'
import toast, { Toaster } from 'react-hot-toast'
import CommentSectionComponent from '../CommentSectionComponent/CommentSectionComponent'


const BlogComponent = () => {
    let location = useLocation()
    const {blogData} = location.state || {}
    const createdAt = (blogData.createdAt).split('T')[0]

    const {blogPost, setBlogPost} = useBlogContext()

    const [isBlogLiked, setIsBlogLiked] = useState(blogData.isUserLikedPost)
    const [blogLikeCount, setBlogLikeCount] = useState(blogData.likesCount)

    const [commentText, setCommentText] = useState('')
    const [comments, setComments] = useState([])

    const toggleClick = () => {
        setIsBlogLiked(!isBlogLiked)
        setBlogLikeCount(prevCount => isBlogLiked ? prevCount -= 1 : prevCount += 1)
        console.log(isBlogLiked)
        sendLikeStatus()
    }

    const sessionID = localStorage.getItem('SessionID')

    const sendLikeStatus = () => {
        axios
            .post(
                `http://localhost:3500/api/v1/user/editLike/${blogData._id}`,
                {
                    isBlogLiked
                },
                {
                    headers: {
                        'SessionID': 'SessionID=' + sessionID,
                    }
                }
            )
        .then((response) => {
            if(response.data && response.data.code == 201) {
                toast.success('Liked', {
                    position: 'bottom-left'
                })
                console.log('Updated successfully')
            }
            if(response.data && response.data.code == 200) {
                toast.error('Disliked', {
                    position: 'bottom-left'
                })
                console.log('Updated successfully')
            }
        })
        .catch((error) => {
            alert(`Status : ${error}`)
        })
    }

    useEffect(() => {
        axios
        .get(`http://localhost:3500/api/v1/user/blogDetails/${blogData._id}`,
            {
                headers: {
                    'SessionID': 'SessionID=' + sessionID,
                }
            }
        )
        .then((response) => {
            if(response.status == 200) {
                setBlogLikeCount(response.data.data[0].likeCount)
                setIsBlogLiked(response.data.data[0].isUserLikedPost)
                setComments(response.data.data[0].comments)
            }
        })

    }, [])

    const toggleBookmark = () => {

    }

    const handleCommentText = (event) => {
        setCommentText(event.target.value)
    }

    const handleCommentPost = () => {
        axios
            .post(
                `http://localhost:3500/api/v1/user/addComment/${blogData._id}`,
                {
                    commentText
                },
                {
                    headers: {
                        'SessionID': 'SessionID=' + sessionID,
                    }
                }
            )
        .then((response) => {
            if(response.data && response.data.code == 201) {
                console.log('Comment updated successfully')
            }
        })
        .catch((error) => {
            alert(`Status : ${error}`)
        })
    }

    return (
        <div className='container mt-4'>
            <div className="row">
                <div className="col-md-2">

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
                    <div className="row flex-row" style={{ marginTop: "30px", paddingTop: "10px", paddingBottom: "10px", borderTop: "1px solid #D3D3D3", borderBottom: "1px solid #D3D3D3 " }}>
            
                        <div className="col-md-2 d-flex justify-content-center align-items-center">
                            {!isBlogLiked ? (
                                <FaRegHeart style={{ fontSize: "30px", marginRight: "15px" }} onClick={toggleClick} />
                            ) : (
                                <FaHeart style={{ fontSize: "30px", marginRight: "15px" }} onClick={toggleClick} />
                            )}
                             <span>{blogLikeCount}</span>
                        </div>
                        <div className="col-md-1">
                            <MdOutlineBookmarkAdded style={{ fontSize: "29px" }} onClick={toggleBookmark}/>
                        </div>
                        <div className="col-md-8">

                        </div>
                        {/* <div className="col-md-2">
                            <MdOutlineBookmarkAdded style={{ fontSize: "30px" }}/>
                        </div> */}
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
                            <textarea className="form-control" rows="3" placeholder="Write your comment" value={commentText} onChange={handleCommentText}></textarea>
                        </div>
                    </div>

                    <div className="row" style={{paddingBottom: "20px", borderBottom: "1px solid #D3D3D3"}}>
                            <div className="col-md-10">

                            </div>
                            <div className="col-md-2" style={{marginTop: "15px"}}>
                                <button className="btn btn-primary" onClick={handleCommentPost}>Post Comment</button>
                            </div>
                    </div>

                    <div className='row' style={{marginTop: "20px"}}>  
                        {/* {comments[0].text} */}
                        { comments && 
                            comments.map( (comment, index) => (
                                <div key={index}>
                                    <CommentSectionComponent comment={comment}/>
                                </div>
                            ))
                        }     
                    </div>

                    <div className="row" style={{marginTop: "50px"}}>

                    </div>
                </div>
                <div className="col-md-2">
                    
                </div>
            </div>
            
            
            
            <Toaster />
        </div>
    )
}

export default BlogComponent