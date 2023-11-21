import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, getUserRole } from '../../database/Firebase'; // Ensure this import is correct

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const role = await getUserRole(user.email); // Fetching role from Firebase
                console.log(`User role for ${user.email}:`, role); 
                setCurrentUser({ ...user, role }); // Set user with role
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return unsubscribe; // Unsubscribe on unmount
    }, []);

    const value = {
        currentUser,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
