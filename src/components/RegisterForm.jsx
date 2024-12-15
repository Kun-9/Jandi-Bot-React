import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const RegisterForm = (onSubmit) => {
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        name: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            await onSubmit(formData);
        } catch (error) {
            setError("회원가입에 실패하였습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                            type="text"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>비밀번호 확인</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>이름</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        가입하기
                    </Button>
                </Form>
        </>
    );
};

export default RegisterForm;