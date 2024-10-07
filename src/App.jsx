import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComponent from './components/NavbarComponent/NavbarComponent'
import { BlogProvider } from './context/BlogContext'
import { UserProvider } from './context/UserContext'

    const App = () => {
        return (
            <BlogProvider>
                <UserProvider>
                    <NavbarComponent/>
                </UserProvider>
            </BlogProvider>
        )
    }

export default App
