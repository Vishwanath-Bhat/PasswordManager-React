import React from 'react';

const Footer = () => {
    return (
        <div className='bg-slate-700 mt-8 text-white flex flex-col justify-center items-center w-full p-4 max-w-screen'> {/* Ensure max width is full */}
            <div className="logo font-bold text-2xl">
                <span className='text-green-500'>&lt;</span>
                <span>Pass</span>
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='flex justify-center items-center my-2'>
                Created with <img className='w-7 mx-2' src="icons/heart.png" alt="heart icon" /> by Goat 🐐
            </div>
            <div className='mt-4 text-sm'>
                <a href="/privacy" className="text-green-400 hover:underline">Privacy Policy</a>
                <span className='mx-2'>|</span>
                <a href="/contact" className="text-green-400 hover:underline">Contact Us</a>
            </div>
        </div>
    );
};

export default Footer;
