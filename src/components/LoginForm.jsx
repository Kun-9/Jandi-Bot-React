import {useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";

function LoginForm({onSubmit}) {

    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        // rememberMe: false,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            await onSubmit(formData);
        } catch (error) {
            setError("로그인에 실패하였습니다.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            {error && <Alert variant={"danger"}>{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className={"mb-3"} controlId="formBasicId">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type={"text"}
                                  name={"userId"}
                                  value={formData.userId}
                                  placeholder={"아이디를 입력해주세요."}
                                  onChange={handleChange}
                                  required/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId="formBasicPassword">
                    <Form.Label>PASSWORD</Form.Label>
                    <Form.Control type={"password"}
                                  name={"password"}
                                  onChange={handleChange}
                                  value={formData.password}
                                  placeholder={"비밀번호를 입력해세요."}
                                  required/>
                </Form.Group>
                <Form.Group className={"mb-3 form-check"} id={"rememberCheckBox"}>
                    <Form.Check type={"checkbox"}
                                value={formData.rememberMe}
                                onChange={handleChange}
                                label={"로그인 유지"}
                    />
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button
                        variant={"primary"}
                        type="submit"
                        disabled={loading}>
                        {loading ? '로그인 중...' : '로그인'}
                    </Button>
                </div>
            </Form>


        </>
    );
}

export default LoginForm;