import { useState } from 'react';
import { useDispatch } from 'react-redux';
import  {login}  from '../slices/authSlice';
// import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    // const navigate = useNavigate(); 

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3000/api/user/signup', { // Adjust the endpoint as necessary
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(data.error);
        }

        if (response.ok) {
            //save the user to local storrage
            localStorage.setItem('user', JSON.stringify(data))

            //Update the Auth 
            dispatch(login(data));

            setIsLoading(false)
        }
        // Optionally navigate to a different route after successful signup
        // navigate('/dashboard');
    };

    return { signup, isLoading, error };
};
