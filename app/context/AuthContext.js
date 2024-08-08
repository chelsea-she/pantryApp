//watched this video: https://youtu.be/S_sV6bYWKXQ?si=XBligz1CoFKcw0M9
'use client'
import {useContext,createContext,useState,useEffect} from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import {auth} from '/firebase'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user,setUser] = useState('Chelsea')
    console.log(user)
    
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth,provider)
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribe()
    }, [user]);

    return (
    <AuthContext.Provider value={{user, googleSignIn, logOut}}>
        {children}
    </AuthContext.Provider>
)
}

export const UserAuth = () => {
    return useContext(AuthContext)
}