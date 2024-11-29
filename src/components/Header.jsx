import React, {useState, useRef} from 'react';
import {useAuth} from "../providers/AuthProvider"
import {Button, Container, Modal, Nav, Navbar} from "react-bootstrap";
import {useNavigate, Link} from "react-router-dom";


function Header() {
    const { user, logout } = useAuth();
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);


    function handleLogout() {
        setShowModal(false);
        logout()
        navigate('/home')
    }

    return (
        <>
            <Navbar expand="sm" bg="dark" variant="dark">
                <Container fluid>
                    <Link to="/" className="navbar-brand">Home</Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {user ? (
                                <>
                                    {/*<Link to="/my-info" className="nav-link">MyInfo</Link>*/}
                                    <Link to="/lottery" className="nav-link">Lottery</Link>
                                </>
                            ) : null}
                        </Nav>

                        <Nav>
                            {user ? (
                                <>
                                    <Link to="/my-info" className="nav-link">{user.name}님</Link>
                                    <Nav.Link onClick={() => setShowModal(true)}>
                                        로그아웃
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/signup" className="nav-link">Sign Up</Link>
                                    <Link to="/login" className="nav-link">Login</Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>로그아웃 확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>로그아웃 하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Header;