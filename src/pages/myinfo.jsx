import {useState, useEffect} from 'react'
import {useAuth} from "../providers/AuthProvider";
import {Card, Col, Container, Row} from "react-bootstrap";

function MyInfo() {
    const info = useAuth().user

    if (!info) {
        return (
            <Container className={"mt-5"}>
                <div className={"text-center"}>
                    로그인이 필요한 페이지입니다.
                </div>
            </Container>
        )
    }

    function formatDate(createdAt) {
        const date = new Date(createdAt);
        const formatter = new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        return formatter.format(date);  // "2024. 11. 26."
    }


    return (
        <Container className={'mt-5'}>
            <Row className={'justify-content-center'}>
                <Col md={8}>
                    <Card>
                        <Card.Header>
                            <h4 className={'mb-0'}>내 정보</h4>
                        </Card.Header>
                        <Card.Body>
                            <Row className={'mb-3 mt-3'}>
                                <Col sm={3} className={'text-muted'}>Id</Col>
                                <Col sm={9} className={'text-muted'}>{info.userId}</Col>
                            </Row>
                            <Row className={'mb-3'}>
                                <Col sm={3} className={'text-muted'}>Name</Col>
                                <Col sm={9} className={'text-muted'}>{info.name}</Col>
                            </Row>
                            <Row className={'mb-3'}>
                                <Col sm={3} className={'text-muted'}>Role</Col>

                                <Col sm={9} className={'text-muted'}>
                                    {info.roles ? (
                                        <>
                                            {
                                                info.roles.map(role => (
                                                    <span key={role}>{role.substring('ROLE_'.length)}</span>
                                                ))
                                            }
                                        </>
                                        ) : (
                                            <span>없음</span>
                                        )
                                    }
                                </Col>
                            </Row>
                            <Row className={'mb-3'}>
                                <Col sm={3} className={'text-muted'}>Created</Col>
                                <Col sm={9} className={'text-muted'}>{formatDate(info.createdAt)}</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}


export default MyInfo;