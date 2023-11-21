import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../database/Firebase';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as needed

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { currentUser } = useAuth(); // Get current user from context

    useEffect(() => {
        // Redirect to dashboard if user is already logged in
        if (currentUser) {
            navigate('/dashboard');
        }
    }, [currentUser, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/dashboard'); // Navigate to dashboard on successful login
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    setError('No user found with this email.');
                    break;
                case 'auth/wrong-password':
                    setError('Incorrect password.');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email format.');
                    break;
                default:
                    setError('Failed to log in. Please check your credentials.');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
