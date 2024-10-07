import React, { Children, createContext, useState } from 'react'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {

    const storedIsLoggedIn = localStorage.getItem('isLoggedIn')
    const storedUserProfile = localStorage.getItem('userProfile')

    const [ isLoggedIn, setIsLoggedIn ] = useState(storedIsLoggedIn == 'true')
    const [ userProfile, setUserProfile ] = useState(storedUserProfile ? JSON.parse(storedUserProfile) : null)


    const values = {
        isLoggedIn,
        setIsLoggedIn,
        userProfile,
        setUserProfile
    }

    return (
        <UserContext.Provider
            value={values}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext