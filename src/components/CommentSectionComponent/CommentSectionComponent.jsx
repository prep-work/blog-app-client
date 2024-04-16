import React, {useEffect, useRef, useState} from 'react'
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

const CommentSectionComponent = ({comment}) => {

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
            <div className="row mt-4">
                <div className="col-md-1 d-flex justify-content-center">
                    <img src={comment.author.image} alt="Profile picture of the commented person" className="img-fluid rounded-circle" style={{ width: "50px", height: "50px" }} />
                </div>
                <div className="col-md-10" style={{ padding: "0" }}>
                    <p style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "4px" }}>{comment.author.firstName}</p>
                    <p>{comment.text}</p>
                    <div className="row mt-2 d-flex">
                        <div className="col-md-3 d-flex justify-content-around" style={{ padding: "0" }}>
                            <div onClick={handleCommentLikeClick} title="Hover text">
                                <FaRegThumbsUp />
                            </div>
                            <div onClick={handleCommentReplyClick}>
                                <FaReply />
                            </div>
                            
                        </div>
                    </div>
                    {isReplying && (
                        <div className="row mt-4 p-0" >
                            <div className="col-md-12" style={{ padding: "0px"}}>
                                <textarea rows="2" style={{ width: "100%", padding: "8px", boxSizing: "border-box" }} value={replyText} onChange={handleReplyText} placeholder='Write reply comment' />
                            </div>
                            {/* <div className="col-md-12 mt-2">
                                <button className="btn btn-secondary ml-4" onClick={handleReplyCancelSubmit}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleReplySubmit}>Reply</button>
                            </div> */}
                            <div className="col-md-12 mt-2 d-flex justify-content-end">
                                <div className="ml-2">
                                    <button className="btn btn-secondary" onClick={handleReplyCancelSubmit} style={{ marginRight: '8px' }}>Cancel</button>
                                </div>
                                <div className='ml-2'>
                                    <button className="btn btn-primary" onClick={handleReplySubmit}>Reply</button>
                                </div>
                            </div>

                        </div>
                    )}
                    {/* If reply is there for an comment, show the button  */}
                    {comment.numberOfReplies > 0 && 
                        <button className='reply-button d-flex justify-content-between align-items-center' onClick={handleShowReplyCommentSubmit}>  
                            {isShowingReplyComments ? <FaCaretUp style={{ marginRight: '5px' }}/> : <FaCaretDown style={{ marginRight: '5px' }}/> }  
                            {comment.numberOfReplies === 1 ? `${comment.numberOfReplies} reply` : `${comment.numberOfReplies} replies`}
                        </button>
                    }
                    {/* If user click reply button show the replies */}
                </div>
                <div className='col-md-1'>
                    <div>
                        <button class="btn btn-secondary bg-body border-white" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                            <HiOutlineDotsHorizontal style={{color: "black"}}/>
                        </button>
                        <ul class="dropdown-menu p-0" aria-labelledby="dropdownMenu2" style={{ minWidth: "6rem", minHeight: "2rem"}}>
                            {comment.isUserComment ?
                                <div>
                                    <li>
                                        <button type="button" className="btn btn-light d-flex justify-content-start align-items-center p-0 border-0 w-100 h-100" onClick={handleEditCommentClick}>
                                            <p style={{ marginLeft: ".5em", marginRight: ".5em" }}><MdEdit /></p>
                                            <p style={{ fontSize: "15px"}}>Edit</p>
                                        </button>
                                    </li>
                                    <li>
                                        <button type='button' className='btn btn-light d-flex justify-content-start align-items-center p-0 border-0 w-100' onClick={handleDeleteCommentClick}>
                                            <p style={{ marginLeft: ".5em", marginRight: ".5em", fontSize: "15px"}}><ImBin2 /></p>
                                            <p style={{ fontSize: "15px"}}>Delete</p>
                                        </button>
                                    </li>
                                </div>

                            :

                                <div className='d-flex justify-content-start align-items-center'>
                                    <button type="button" className="btn btn-light d-flex justify-content-start align-items-center p-0 border-0 w-100" style={{ height: "100%", paddingTop: "15px"}}>
                                        <p style={{ marginLeft: ".5em", marginRight: ".5em" }}><LuFlag /></p>
                                            <p style={{ fontSize: "15px"}}>Report</p>
                                    </button>
                                </div>
                            } 
                        </ul>
                    </div>
                </div>
                    {replyComments && isShowingReplyComments &&
                        replyComments.map( (comment, index) => (
                            <div key={index} style={{paddingLeft: "50px"}}>
                                <CommentSectionComponent comment={comment}/>
                            </div>
                        ))
                    }
            </div>
        </div>

    )
}

export default CommentSectionComponent