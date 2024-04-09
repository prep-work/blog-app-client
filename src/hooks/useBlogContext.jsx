import { useContext } from "react"
import BlogContent from "../context/BlogContext"

const useBlogContext = () => {
    return useContext(BlogContent)
}

export default useBlogContext