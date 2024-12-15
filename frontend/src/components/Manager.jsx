import React, { useRef, useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import {useAuth} from '../redux/hooks/useAuth'

const Manager = () => {
    const ref = useRef();
    const ref1 = useRef();
    const passref = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const {user} = useAuth()

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/api/password",{
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        let passwords = await req.json()
        setPasswordArray(passwords);
    }


    useEffect(() => {
        if(user) getPasswords()
    }, [user]);

    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passref.current.type = "password"
        } else {
            ref.current.src = "icons/eyecross.png";
            passref.current.type = "text"
        }
    };

    const showPassword1 = () => {
        if (ref1.current.src.includes("icons/eyecross.png")) {
            ref1.current.src = "icons/eye.png";
        } else {
            ref1.current.src = "icons/eyecross.png";
        }
    };

    const savePassword = async () => {
        if(!user){
            return
        }
        if (form.site.trim() !== "" && form.username.trim() !== "" && form.password.trim() !== "") {
            const updatedPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
            console.log(typeof(uuidv4()))
            setPasswordArray(updatedPasswordArray);
            let res = await fetch("http://localhost:3000/api/password", {
                method: "POST", 
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}` 
                }, 
                body: JSON.stringify({ ...form, id: uuidv4() }) })
            // localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
            setForm({ site: "", username: "", password: "" });
        } else {
            // Display toast notification for empty fields
            toast.error("All fields are required.");
        }
    };

    const deletePassword = async (id) => {
        if(!user){
            alert("You have to Log In First")
            return
        }
        const index = passwordArray.findIndex(obj => obj.id === id)
        if (index !== -1) {
            passwordArray.splice(index, 1)[0];

            setPasswordArray([...passwordArray]);
            // localStorage.setItem("passwords", JSON.stringify(passwordArray));
            let res = await fetch("http://localhost:3000/api/password", { method: "DELETE", headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${user.token}` }, body: JSON.stringify({ id }) })
        }
    };

    const editPassword = async (id) => {
        if(!user){
            alert("You have to Log In First")
            return
        }
        const gada = passwordArray.find(obj => obj.id === id)
        setForm({ site: gada.site, username: gada.username, password: gada.password });
        const index = passwordArray.findIndex(obj => obj.id === id)
        passwordArray.splice(index, 1)[0];

        setPasswordArray([...passwordArray]);
        // localStorage.setItem("passwords", JSON.stringify(passwordArray));
        let res = await fetch("http://localhost:3000/api/password", { method: "DELETE", headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${user.token}` }, body: JSON.stringify({ id }) })
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const copyPassword = (text) => {
        toast('Copied to ClipBoard!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div> */}
            <div className="flex flex-col items-center justify-center gap-5 p-6">
                <div className="text-slate-800 flex font-bold text-3xl text-center">
                    <p className="text-green-500">&lt;</p>
                    Pass
                    <p className="text-green-500">OP/&gt;</p>
                </div>
                <div className="flex gap-2 text-green-500 items-center justify-center text-xl">
                    Manage Your Passwords with
                    <p className="text-pink-500">♥</p>
                </div>
            </div>

            <div className="container mx-auto p-4 max-w-4xl">
                <div className="flex flex-col space-y-4">
                    <input
                        type="text"
                        onChange={handleChange}
                        value={form.site}
                        name="site"
                        placeholder="Enter Website URL"
                        className="p-2 border border-green-500 rounded-full w-full"
                    />
                    <div className="flex gap-7">
                        <input
                            type="email"
                            onChange={handleChange}
                            value={form.username}
                            name="username"
                            placeholder="Enter Username"
                            className="p-2 border border-green-500 rounded-full w-1/2"
                        />
                        <div className="relative w-1/2">
                            <input
                                type="password"
                                ref={passref}
                                onChange={handleChange}
                                value={form.password}
                                name="password"
                                placeholder="Enter Password"
                                className="p-2 border border-green-500 rounded-full w-full pr-10"
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={showPassword}>
                                <img ref={ref} src="icons/eye.png" alt="eye" className="w-5 h-5" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center mt-10">
                <button onClick={savePassword} className="bg-green-500 text-white flex items-center gap-2 px-5 py-2 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
                    Add Password
                    <lord-icon
                        src="https://cdn.lordicon.com/sbnjyzil.json"
                        trigger="hover"
                        colors="primary:#ffffff,secondary:#ffffff"
                        style={{ width: '30px', height: '30px' }}
                    ></lord-icon>
                </button>
            </div>

            {passwordArray.length === 0 && (
                <div className="flex justify-center items-center bg-red-100 text-green-600 font-semibold py-4 px-6 rounded-md shadow-md mt-10">
                    <p className="text-lg">No passwords to display 😔</p>
                </div>
            )}

            {passwordArray.length !== 0 && (
                <div className="container mx-auto p-4 max-w-6xl mt-10 overflow-x-hidden">
                    <table className="min-w-full bg-white border border-green-300 shadow-md rounded-lg table-fixed max-w-screen"> {/* Add table-fixed for better layout control */}
                        <thead>
                            <tr className="bg-green-800 text-white">
                                <th className="py-2 px-4 w-1/4 border-r border-green-300">Website Name</th>
                                <th className="py-2 px-4 w-1/4 border-r border-green-300">Username</th>
                                <th className="py-2 px-4 w-1/4 border-r border-green-300">Password</th>
                                <th className="py-2 px-4 w-1/4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-50'>
                            {passwordArray.map((item, index) => (
                                <tr className="border-b border-green-200" key={index}>
                                    <td className="py-2 px-4 w-1/3 max-w-xs border-r border-green-300 overflow-hidden">
                                        <div className="flex items-center justify-between">
                                            <a
                                                href={item.site}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="truncate w-full text-ellipsis overflow-hidden whitespace-nowrap"
                                            >
                                                {item.site}
                                            </a>
                                        </div>
                                    </td>

                                    <td className="py-2 px-4 w-1/3 border-r border-green-300 truncate">
                                        <div className="flex items-center justify-between">
                                            {item.username}
                                            <img src="icons/copy-icon.png" alt="copy" className="w-5 h-5 ml-2 cursor-pointer" onClick={() => copyPassword(item.username)} />
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 w-1/3 border-r border-green-300">
                                        <div className="flex items-center justify-between ">
                                            {"*".repeat(item.password.length)}
                                            <div className='flex gap-7'>

                                                <img src="icons/copy-icon.png" alt="copy" className="w-5 h-5 ml-2 cursor-pointer" onClick={() => copyPassword(item.password)} />
                                                <span className="flex justify-end cursor-pointer" onClick={showPassword1}>
                                                    <img ref={ref1} src="icons/eye.png" alt="eye" className="w-5 h-5" />
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-2 px-4 w-1/6">
                                        <div className='flex justify-end gap-9'>
                                            <div className="delete flex gap-6" onClick={() => deletePassword(item.id)}>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/hwjcdycb.json"
                                                    trigger="hover"
                                                    style={{ width: '30px', height: '30px' }}
                                                >
                                                </lord-icon>

                                            </div>
                                            <div className="edit flex gap-6" onClick={() => editPassword(item.id)}>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                    style={{ width: '30px', height: '30px' }}
                                                >
                                                </lord-icon>

                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default Manager;
