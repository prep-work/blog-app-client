import React, { useCallback, useContext, useState } from 'react'
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import "./WriteBlogComponent.css"
import { useNavigate } from 'react-router-dom'
import useBlogContext from '../../hooks/useBlogContext'

const WriteBlogComponent = () => {

    const navigate = useNavigate()
    const { blogData, setBlogData } = useBlogContext()
    const [ title, setTitle ] = useState(blogData.title)
    const [blogContent, setBlogContent] = useState(blogData.blogContent)

    const toolbarOptions = [
        ["bold", "italic", "underline"],
        ["link"],
        [{list: "ordered"}, {list: "bullet"}],
        [{script: "sub"}, {script: "super"}],
    ];
    

    const wrapperRef = useCallback( (wrapper) => {
        if (wrapper == null) return
        wrapper.innerHTML = blogData.blogContent
        const editor = document.createElement('div')
        wrapper.append(editor)
        const quill = new Quill(".write-blog-container", {theme: "snow", modules: { toolbar: toolbarOptions}, placeholder: "Write the Blog here..."})

        quill.on('text-change', () => {
            setBlogContent(quill.root.innerHTML); 
        })
    }, [])

    const handleBlogTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handlePublish = () => {
        console.log(title)
        console.log(blogContent)
        setBlogData(prevValue => ({
            ...prevValue,
            title,
            blogContent
        }))
        navigate("/write-details")
    }

  return (
    <div className="write-blog">
        <div className="write-blog-header">
            <div>Written By </div>
            <button onClick={handlePublish}>Publish</button>
        </div>
        <div className="write-blog-title">
            <input type="text" placeholder="Title" value={title} onChange={handleBlogTitleChange}/>
        </div>
        <div className="quill-blog">
            <div className="write-blog-container" ref={wrapperRef}></div>
        </div>
        {/* <div dangerouslySetInnerHTML={{ __html: editorContent }} /> */}
    </div>

  )
}

export default WriteBlogComponent