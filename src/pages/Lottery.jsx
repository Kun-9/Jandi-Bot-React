import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useAuth} from "../providers/AuthProvider";
import {useEffect, useState} from "react";
import {deleteLottery, getLotteryWinner, lotteryList as getLotteryList} from '../service/apiService'
import 'bootstrap-icons/font/bootstrap-icons.css';

const API_BASE_URL = "http://knnn.me:8081/api";


export default function Lottery() {
    const [lotteryList, setLotteryList] = useState([]);
    const [lotteryWinner, setLotteryWinner] = useState({});

    let user = useAuth().user;

    useEffect(() => {
        getLotteryListApi()
    }, [])

    const getLotteryListApi = async () => {
        try {
            const data = await getLotteryList();
            setLotteryList(data.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getLotteryWinnerApi = async () => {
        try {
            let winner = await getLotteryWinner();
            setLotteryWinner(winner.data);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteLotteryApi = async (name) => {
        try {
            const data = await deleteLottery({
                lotteryName: name
            });

            getLotteryListApi()

            alert('삭제되었습니다.');
        } catch (error) {
            alert('삭제 실패')
            console.error(error);
        }
    }


    return (
        <Container fluid className="mt-4">
            <Row>
                {/* 왼쪽 추첨 목록 */}
                <Col md={7}>
                    <Card>
                        <Card.Header className="bg-primary text-white">
                            <h5 className="mb-0">추첨 대상자 목록</h5>
                        </Card.Header>
                        <Card.Body className="p-0">
                            {lotteryList ? (
                                lotteryList.map((lottery, index) => (
                                    <Card key={index} className="border-0 border-bottom rounded-0">
                                        <Card.Body>
                                            <Row className="align-items-center">
                                                <Col sm={9}>
                                                    <h6 className="mb-0">{lottery.lotteryName}</h6>
                                                </Col>
                                                <Col sm={2}>
                                                    <span className="text-muted">{lottery.position}</span>
                                                </Col>
                                                <Col sm={1}>
                                                    <i className="bi bi-trash" style={{cursor:'pointer'}} onClick={() => deleteLotteryApi(lottery.lotteryName)}></i>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <Card.Body className="text-center text-muted">
                                    대상자가 없습니다.
                                </Card.Body>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* 오른쪽 당첨자 표시 */}
                <Col md={5}>
                    <Card className="h-100">
                        <Card.Header className="bg-success text-white">
                            <h5 className="mb-0">당첨자</h5>
                        </Card.Header>
                        <Card.Body className="text-center d-flex flex-column justify-content-center">
                            {lotteryWinner ? (
                                <div className="my-4">
                                    <h3 className="mb-3">{lotteryWinner.lotteryName}</h3>
                                    <h5 className="text-muted">{lotteryWinner.position}</h5>
                                </div>
                            ) : (
                                <div className="text-muted my-4">
                                    추첨 버튼을 눌러주세요
                                </div>
                            )}
                            <Button
                                variant="primary"
                                size="lg"
                                className="mt-4 px-5"
                                onClick={getLotteryWinnerApi}
                            >
                                추첨하기
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}