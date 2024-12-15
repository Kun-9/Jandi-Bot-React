import RegisterForm from "../components/RegisterForm";
import {Card, Col, Container, Row} from "react-bootstrap";
import React from "react";
import {regist as apiRegist} from "../service/apiService"

function RegisterPage() {

    const handleRegister = async (formData) => {
        try {
            console.log('회원가입 시도', formData);

            // api 호출 -> 성공여부
            const response = await apiRegist(formData);

            if (!response.ok) {
                alert('에러입니다.')
                throw new Error('회원가입 에러');
            }

            // 오류 없을 시

        } catch (error) {
            const errorMessage = error.response?.message || '회원가입 실패'

            // 로그인 폼의 에러처리로 전달
            throw new Error(errorMessage)
        }
    }

    return (
        <Container>
            <Row className={"justify-content-center mt-5"}>
                <Col md={6}>
                    <Card>
                        <Card.Body className={'p-4'}>
                            <Card.Title className={"text-center mb-4"}>Join</Card.Title>
                            <RegisterForm onSubmit={handleRegister}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterPage

