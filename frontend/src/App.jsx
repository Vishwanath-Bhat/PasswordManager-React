import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/signUp'; 
import Login from './components/Login'; 
import { useAuth } from './redux/hooks/useAuth'

function App() {
  const { user, loginUser, logoutUser } = useAuth()

  useEffect(() => {
    // Check for the token in localStorage when the app loads
    const token = localStorage.getItem('user');
     
    if (token) {
      const t = JSON.parse(token)
      loginUser(t)
    }
  }, []);
  
  return (
    <div className="App min-h-screen bg-gray-100">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>} />
            <Route path="/login" element={!user ? <Login />: <Navigate to="/"/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
