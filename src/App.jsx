
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, {useState, useRef} from 'react';
import Header from './components/Header'
import HomePage from './pages/Home'
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import {AuthProvider} from "./providers/AuthProvider";

import './App.css'


function App() {
    const [user, setUser] = useState(null);

    return (
        <AuthProvider>
            <BrowserRouter>
                <div>
                    <Header user={user}/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;