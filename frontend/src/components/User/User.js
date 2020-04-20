import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Media, ListGroup, ListGroupItem, Spinner } from "reactstrap"
import { useMediaQuery } from 'react-responsive'
import logo from "../../assets/img/default-avatar.png"
import agent from "../../agent/agent"

const User = (props) => {
    const username = props.match.params.username;
    const isDesktop = useMediaQuery({ query: '(max-width: 991px)' })

    const [userInfo, setUserInfo] = useState(false)
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        agent.Users.get(username).then(data => {
            console.log(data);
            setUserInfo(data)
        })
    }, [])

    return (
        <div>

            <Row>
                {!isDesktop && <Col xs="12" sm="6" lg="3">
                    <Media className="img-fluid" src={logo} alt="Computer logo" />
                </Col>}
                <Col>
                    <h1>
                        {userInfo ? (userInfo.db.nombre) : (
                            <Spinner color="primary" size="sm" />
                        )}
                    </h1>
                    {userInfo ? (<a href={`mailto:${userInfo.db.mailpuesto}`}>{userInfo.db.mailpuesto}</a>) : (
                        <Spinner color="primary" size="sm" />
                    )}

                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <Row>
                        <Col>
                            {/* PERSON INFO */}
                            <ListGroup flush>
                                <ListGroupItem><b>Usuario: </b>{userInfo ? (userInfo.ad.sAMAccountName) : (
                                    <Spinner color="primary" size="sm" />
                                )}</ListGroupItem>
                                <ListGroupItem><b>Nº Empleado: </b>{userInfo ? (userInfo.db.numero) : (
                                    <Spinner color="primary" size="sm" />
                                )}</ListGroupItem>
                                <ListGroupItem><b>Email personal: </b>{userInfo ? (<a href={`mailto:${userInfo.db.mailpersonal}`}>{userInfo.db.mailpersonal}</a>) : (
                                    <Spinner color="primary" size="sm" />
                                )} </ListGroupItem>

                            </ListGroup>
                        </Col>
                        <Col>
                            {/* WHERE AND WHEN THE USER LOGGED IN LAST TIME */}
                            <ListGroup flush>
                                <ListGroupItem><b>Equipo: </b>{userInfo ? (<a href={`/host/${userInfo.db.equipo}`}>{userInfo.db.equipo}</a>) : (
                                    <Spinner color="primary" size="sm" />
                                )}</ListGroupItem>
                                <ListGroupItem><b>Último inicio sesión: </b>{userInfo ? (userInfo.db.aperturapuesto.replace("T", " ")) : (
                                    <Spinner color="primary" size="sm" />
                                )} </ListGroupItem>

                            </ListGroup>
                        </Col>
                        <Col>
                            <ListGroup flush>
                                <ListGroupItem><b>Oficina: </b>{userInfo ? (userInfo.db.nomofi) : (
                                    <Spinner color="primary" size="sm" />
                                )}</ListGroupItem>
                                <ListGroupItem><b>Población: </b>{userInfo ? (userInfo.db.nompobl) : (
                                    <Spinner color="primary" size="sm" />
                                )}</ListGroupItem>
                                <ListGroupItem><b>Ubicación: </b>{userInfo ? (userInfo.db.ubicacion) : (
                                    <Spinner color="primary" size="sm" />
                                )}</ListGroupItem>
                                <ListGroupItem><b>Departamento: </b>{userInfo ? (userInfo.db.department) : (
                                    <Spinner color="primary" size="sm" />
                                )}</ListGroupItem>

                            </ListGroup>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </div>
    )

}


const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(User)
