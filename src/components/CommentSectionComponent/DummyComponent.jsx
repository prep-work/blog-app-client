import React, {useEffect, useRef, useState} from 'react'
import './CommentSectionComponent.css'
import axios from 'axios'
import { FaRegThumbsUp } from "react-icons/fa"  // thumbs up
import { FaThumbsUp } from "react-icons/fa"     // thumbs up fill
import { FaReply } from "react-icons/fa"        // reply
import { MdEdit } from "react-icons/md"         // edit
import { ImBin2 } from "react-icons/im"         // bin 
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { FaCaretDown } from "react-icons/fa"
import { FaCaretUp } from "react-icons/fa"
import { LuFlag } from "react-icons/lu"


const DummyComponent = ({comment}) => {

    const [replyText, setReplyText] = useState('')
    const [isReplying, setIsReplying] = useState(false)
    const [replyComments, setReplyComments] = useState([])
    const [isShowingReplyComments, setIsShowingReplyComments] = useState(false)
    // const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    // const popoverRef = useRef(null); 
    const sessionID = localStorage.getItem('SessionID')

    const handleCommentLikeClick = () => {

    }

    const handleCommentReplyClick = () => {
        setIsReplying(!isReplying)
    }

    const handleEditCommentClick = () => {
        console.log(comment._id)
    }

    const handleDeleteCommentClick = () => {

    }

    const handleReplyText = (event) => {
        setReplyText(event.target.value)
    }

    const handleReplyCancelSubmit = () => {
        setReplyText('')
        setIsReplying(false)
    }

    // handleReplyCommentSubmit is called when the user hits the reply button to see other replies of comment
    const handleShowReplyCommentSubmit = () => {
        setIsShowingReplyComments(!isShowingReplyComments)
        // Showing comments if the toggle is on and hitting the comments only for the first time !!!
        if(!isShowingReplyComments && replyComments.length < comment.numberOfReplies) {
            axios
                .get(
                    `http://localhost:3500/api/v1/user/replyComment/${comment._id}`,
                    {
                        headers: {
                            'SessionID': 'SessionID=' + sessionID,
                        }
                    }
                )
            .then((response) => {
                if(response.data.code == 200) {
                    console.log(response.data.data)
                    setReplyComments(response.data.data)
                }
            })
            .catch((error) => {
                alert(error.message)
            })
        }
        
    }

    const handleReplySubmit = () => {
        console.log("Reply submitted:", replyText)
        setReplyText('')
        setIsReplying(false)
        axios
        .patch(
            `http://localhost:3500/api/v1/user/addReplyComment/${comment._id}`,
            {
                text: replyText,
                parentComment: comment._id
            },
            {
                headers: {
                    'SessionID': 'SessionID=' + sessionID,
                }
            }
        )
        .then((response) => {
            if(response.data && response.data.code == 201) {
                console.log(response.data)
                console.log('Comment updated successfully')
                // setReplyComments(response.data.data)
            }
        })
        .catch((error) => {
            alert(`Status : ${error}`)
        })
    }

    return (
        <div>
            <div className="comment-container">
                <div className="comment-author-image">
                    <img src={comment.author.image} alt="Profile picture of the commented person" />
                </div>
                <div className="comment-author-info">
                    <p className="comment-author-name">{comment.author.firstName}</p>
                    <p className="comment-text">{comment.text}</p>
                    <div className="comment-actions">
                            <div onClick={handleCommentLikeClick} className="comment-like">
                                <FaRegThumbsUp />
                            </div>
                            <div onClick={handleCommentReplyClick} className="comment-reply">
                                <FaReply />
                            </div> 
                        </div>

                        {isReplying && (
                        <div className="comment-reply-section" >
                            <div className="comment-reply-form" >
                                <textarea rows="2" style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} value={replyText} onChange={handleReplyText} placeholder='Write reply comment' />
                            </div>
                            <div className="col-md-12 mt-2 d-flex justify-content-end">
                                <div className='ml-2'>
                                    <button className={`comment-button ${replyText.length === 0 ? 'disabled' : ''}`} onClick={handleReplySubmit} disabled={replyText.length === 0}>Reply</button>
                                </div>
                                <div className="ml-2">
                                    <button className="cancel-comment-button" onClick={handleReplyCancelSubmit} style={{ marginRight: '8px' }}>Cancel</button>
                                </div>
                            </div>

                        </div>
                    )}

                        {comment.numberOfReplies > 0 && 
                            <button className='reply-button' onClick={handleShowReplyCommentSubmit}>  
                                {isShowingReplyComments ? <FaCaretUp className="caret-icon" /> : <FaCaretDown className="caret-icon"/> }  
                                {comment.numberOfReplies === 1 ? `${comment.numberOfReplies} reply` : `${comment.numberOfReplies} replies`}
                            </button>
                        }                           
                </div>
            </div>
            {replyComments && isShowingReplyComments &&
                        replyComments.map( (comment, index) => (
                            <div key={index} className="reply-comment-container">
                                <DummyComponent comment={comment}/>
                            </div>
                        ))
                    }
        </div>
      
    )
}

export default DummyComponent