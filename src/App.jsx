
import {Routes, Route} from 'react-router-dom'
import React, {useState, useRef} from 'react';
import Header from './components/Header'
import HomePage from './pages/Home'
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Info from "./pages/myinfo";
import Lottery from "./pages/Lottery";

import {AuthProvider} from "./providers/AuthProvider";

import './App.css'


function App() {


    return (
        <AuthProvider>
            <div>
                <Header/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/my-info" element={<Info/>}/>
                    <Route path="/lottery" element={<Lottery/>}/>
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;