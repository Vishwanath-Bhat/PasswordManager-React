// src/components/SignupForm.js
import React, { useState } from 'react';
import { useLogin } from '../redux/hooks/useLogin';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logIn, isLoading, error } = useLogin();

    // handleSubmit calls the signup function from useSignup
    const handleSubmit = async (e) => {
        e.preventDefault();
        await logIn(email, password); // calls signup function from useSignup hook
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto p-8 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            
            <label className="mb-2 font-semibold">Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />

            <label className="mb-2 font-semibold">Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />

            <button
                type="submit"
                disabled={isLoading}
                className={`p-2 rounded-lg font-semibold text-white transition-colors duration-200 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
                {isLoading ? 'Logging up...' : 'Log In'}
            </button>
            
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
    );
};

export default LoginForm;
