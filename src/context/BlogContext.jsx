import { createContext, useState } from "react";

const BlogContext = createContext({})

export const BlogProvider = ({ children }) => {

    const [ blogPost, setBlogPost] = useState([])
    const [authorData, setAuthorData] = useState({})
    const [blogData, setBlogData] = useState({
        title: "",
        description: "",
        blogContent: "",
        image: null,
    })

    return (
        <BlogContext.Provider
            value={{
                blogPost,
                setBlogPost,
                authorData,
                setAuthorData,
                blogData,
                setBlogData
            }}
        >
            {children}
        </BlogContext.Provider>
    )
}

export default BlogContext