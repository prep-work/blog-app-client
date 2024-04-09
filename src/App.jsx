import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComponent from './components/NavbarComponent/NavbarComponent'
import { BlogProvider } from './context/BlogContext'

    const App = () => {
        return (
            <BlogProvider>
                <NavbarComponent/>
            </BlogProvider>
        )
    }

export default App
