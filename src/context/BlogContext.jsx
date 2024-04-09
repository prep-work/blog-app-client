import { createContext, useState } from "react";

const BlogContent = createContext({})

export const BlogProvider = ({ children }) => {

    const [dummy, setDummy] = useState('first initial value')
    const [ blogPost, setBlogPost] = useState([])

    return (
        <BlogContent.Provider
            value={{
                dummy,
                setDummy,
                blogPost,
                setBlogPost
            }}
        >
            {children}
        </BlogContent.Provider>
    )
}

export default BlogContent