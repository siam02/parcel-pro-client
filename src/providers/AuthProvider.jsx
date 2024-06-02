import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { EmailAuthProvider, GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword, updateProfile } from "firebase/auth";
import app from "../services/firebase.config";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const axiosPublic = useAxiosPublic();

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const signInWithGitHub = () =>{
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const checkCurrentPassword = password => {
        const credential = EmailAuthProvider.credential(
            user.email,
            password
        );
        return reauthenticateWithCredential(user, credential);
    }

    const changePassword = password =>{
        return updatePassword(user, password);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {displayName: name, photoURL: photo});
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
            }
            else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        checkCurrentPassword,
        changePassword,
        signInWithGoogle,
        signInWithGitHub,
        updateUserProfile,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;