import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../redux/hooks/useLogout'
import { useAuth } from '../redux/hooks/useAuth'
const Navbar = () => {
    const { user, loginUser, logoutUser } = useAuth()
    const { logout } = useLogout()
    const handleClick = () => {
        logout()
    }
    return (
        <nav className="bg-slate-700 p-4 text-white">

            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <div className="text-white flex font-bold text-xl">
                        <p className='text-green-500'>&lt;</p>Pass
                        <p className='text-green-500'>OP/&gt;</p>
                    </div>
                </Link>

                <div className="flex space-x-4">
                    {user && (
                        <div className='flex'>
                            <div className="text-green-500 hover:text-green-300 font-semibold py-2 px-4 rounded-md transition duration-300">{user.email}</div>
                            <button onClick={handleClick} className="text-green-500 hover:text-green-300 font-semibold py-2 px-4 rounded-md transition duration-300">Logout</button>
                        </div>
                    )}
                    {!user && (
                    <div className='flex'>
                        <Link to="/login" className="text-green-500 hover:text-green-300 font-semibold py-2 px-4 rounded-md transition duration-300">
                            Login
                        </Link>
                        <Link to="/signup" className="text-green-500 hover:text-green-300 font-semibold py-2 px-4 rounded-md transition duration-300">
                            Sign Up
                        </Link>
                    </div>
                    )}

                </div>

            </div>
        </nav>
    );
}

export default Navbar;
