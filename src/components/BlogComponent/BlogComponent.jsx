import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import'./BlogComponent.css'
import axios from 'axios'

import { FaRegHeart } from "react-icons/fa" // Like
import { FaHeart } from "react-icons/fa" // Like fill
import { MdOutlineBookmarkAdded } from "react-icons/md" // Bookmark 
import { GoBookmarkFill } from "react-icons/go" // Bookmark fill 
import useBlogContext from '../../hooks/useBlogContext'
import toast, { Toaster } from 'react-hot-toast'
import { FaRegComment } from "react-icons/fa"
import { FiShare2 } from "react-icons/fi"
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

    const commentSectionRef = useRef(null) 

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

    const handleScrollToComments = () => {
        window.scrollTo({
            top: commentSectionRef.current.offsetTop + 1000,
            behavior: "smooth"
          })
    }

    const handleToggleBookmark = () => {

    }

    const handleShareClick = () => {

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
        <div className='blog-container'>
            {/* <div className="blog-sidebar">

            </div> */}
            <div className="blog-content">
                {/* Blog title and description  */}
                <div className="blog-title">
                    <h1>{blogData.title}</h1>
                    <h5 className="blog-description">
                        {blogData.description}
                    </h5>
                </div>

                {/* Author Profile and created Date */}
                <div className="blog-author">
                    <div className="blog-avatar">
                        <img src={blogData.author.image} alt="" className="blog-author-image" />
                    </div>
                    <div className="blog-author-info">
                        <h5 className="blog-author-name">{blogData.author.firstName} {blogData.author.lastName}</h5>
                        <h5 className="blog-published-date">Published on: {createdAt}</h5>
                    </div>
                </div>

                {/* Like, dislike, post save  */}
                <div className="blog-interaction">
                    <div className="blog-interaction-left-part">
                        <div className="blog-like">
                            {!isBlogLiked ? (
                                <FaRegHeart className="blog-like-icon" onClick={toggleClick} />
                            ) : (
                                <FaHeart className="blog-like-icon" onClick={toggleClick} />
                            )}
                            <span>{blogLikeCount}</span>
                        </div>
                        <div className="blog-comment" onClick={handleScrollToComments}>
                            <FaRegComment className="blog-comment-icon"/>
                            <span>{comments.length}</span>
                        </div>
                    </div>
                    <div className="blog-interaction-right-part">
                        <div className="blog-bookmark">
                            <MdOutlineBookmarkAdded className="blog-bookmark-icon" onClick={handleToggleBookmark}/>
                        </div>
                        <div className="blog-share">
                            <FiShare2 className="blog-share-icon" onClick={handleShareClick}/>
                        </div>
                    </div>
                </div>

                {/* Blog image  */}
                <div className="blog-image-container" style={{marginTop: "30px"}} ref={commentSectionRef}>
                    <img src={blogData.image} className="blog-image-large" />
                </div>

                {/* Blog content  */}
                <div className="blog-content-section" style={{marginTop: "30px"}}>
                    <p>{blogData.blogContent}</p>
                </div>

                {/* comments */}
                <div className="blog-comments-section" >
                    <h4>
                        Comments
                    </h4>
                </div>

                <div className="blog-comment-input">
                    <div className="blog-comment-textarea">
                        <textarea className="comment-input" rows="3" placeholder="Write your comment" value={commentText} onChange={handleCommentText}></textarea>
                    </div>
                    <div className="blog-comment-button">
                        <button className="cancel-comment-button" onClick={handleCommentPost}>Cancel</button>
                        <button className={`comment-button ${commentText.length === 0 ? 'disabled' : ''}`} onClick={handleCommentPost} disabled={commentText.length === 0}>Comment</button>
                    </div>
                </div>

                <div className='blog-comments'>  
                    { comments && 
                        comments.map( (comment, index) => (
                            <div key={index}>
                                <CommentSectionComponent comment={comment}/>
                            </div>
                        ))
                    }     
                </div>
            </div>
            <Toaster />
        </div>

    )
}

export default BlogComponent