import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice'; 

export const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem('user');

    // Dispatch logout action
    dispatch(logout());
  };

  return { logout: handleLogout }; 
};

