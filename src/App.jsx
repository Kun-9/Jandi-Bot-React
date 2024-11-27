import React, {useState, useRef} from 'react';
import './app.css';
import Header from './components/Header'


function App() {
    const [user, setUser] = useState(null);

    return (
        <div>
            <Header user={user}/>
            <Home/>
        </div>
    );
}