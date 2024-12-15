import {Link, useNavigate} from "react-router-dom";
import LoginForm from "../components/LoginForm";
import {Card, Col, Container, Row} from "react-bootstrap";
import {login as apiLogin} from "../service/apiService";
import {useAuth} from "../providers/AuthProvider";
import React from "react";

function LoginPage() {
    const navigate = useNavigate();
    const {login: authLogin} = useAuth();

    const handleLogin = async (formData) => {
        try {
            console.log('로그인 시도', formData);

            // api 호출 -> 정보 받아옴
            const response = await apiLogin(formData);

            // 정보 저장 (토큰, 유저 정보 등)
            authLogin(response.data)
            console.log('로그인 성공', response);

            // 로그인 성공시 홈화면으로 이동
            navigate('/home');
        } catch (error) {
            const errorMessage = error.response?.message || '로그인 실패'

            // 로그인 폼의 에러처리로 전달
            throw new Error(errorMessage)
        }
    }

    return (
        <Container>
            <Row className={"justify-content-center mt-5"}>
                <Col md={6}>
                    <Card>
                        <Card.Body className='p-4'>
                            <Card.Title className={"text-center mb-4"}>Login</Card.Title>
                            <LoginForm onSubmit={handleLogin}/>

                            <Row className={"mt-3"}>
                                <Col className={"text-center text-decoration-none"}>
                                    <Link to="/register" className={"text-decoration-none"}>
                                        회원가입
                                    </Link>
                                </Col>
                                <Col className={"text-center text-decoration-none"}>
                                    <Link to="/register" className={"text-decoration-none"}>
                                        비밀번호 찾기
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;