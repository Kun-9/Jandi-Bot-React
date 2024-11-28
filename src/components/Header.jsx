import React, {useState, useRef} from 'react';
import {Link} from "react-router-dom";
import {useAuth} from "../providers/AuthProvider"


function Header() {
    const { user } = useAuth();

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse collapse" id={"navbarNav"}>
                        <ul className="navbar-nav">
                            {user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className={"nav-link active"} to="/info">내 정보</Link>
                                    </li>
                                </>
                                ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className={"nav-link active"} to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={"nav-link active"} to="/register">Register</Link>
                                    </li>
                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;