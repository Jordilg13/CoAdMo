import { Badge, ButtonGroup, Col, ListGroup, ListGroupItem, Media, Row, Spinner, Tooltip } from "reactstrap"
import React, { useEffect, useState } from 'react'

import DeleteUser from "./actions/DeleteUser"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import UnlockUser from "./actions/UnlockUser"
import UserForm from "./actions/UserForm"
import agent from "../../agent/agent"
import { connect } from 'react-redux'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import logo from "../../assets/img/default-avatar.png"
import { useMediaQuery } from 'react-responsive'

const User = (props) => {
    const username = props.match.params.username;
    const isDesktop = useMediaQuery({ query: '(max-width: 991px)' })

    const [userInfo, setUserInfo] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [tooltipOpen, settooltipOpen] = useState(false)

    useEffect(() => {
        agent.Users.get(username).then(data => {
            console.log(data);
            setUserInfo(data)
        })
    }, [])

    return (
        <div>
            {/* <UncontrolledAlert  style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: "2000"
            }} color="danger">
                I am an alert and I can be dismissed!
    </UncontrolledAlert> */}

            <Row>
                {!isDesktop && <Col xs="12" sm="6" lg="3">
                    <Media
                        className="img-fluid rounded mx-auto d-block"
                        src={userInfo && userInfo.db.foto ? "data:image/png;base64," + userInfo.db.foto : logo}
                        alt="User Image" 
                        style={{"marginLeft": "400px"}}/>
                </Col>}
                <Col>
                    <h1 style={{ "display": "inline" }}>
                        {userInfo ? userInfo.db.nombre : (
                            <Spinner color="primary" size="sm" />
                        )}
                    </h1>
                    <ButtonGroup className="pull-right">   
                        {userInfo.ad?.isBlocked && <UnlockUser user={userInfo ? userInfo.ad: {"cn":"","distinguishedName":""}} />}
                        <UserForm action="update" user={userInfo ? userInfo.ad: {"cn":"","distinguishedName":""}} />
                        <DeleteUser user={userInfo ? userInfo.ad: {"cn":"","distinguishedName":""}} />
                    </ButtonGroup>
                    {
                        userInfo.errors && (<>
                            <Badge color="danger" size="lg">
                                <FontAwesomeIcon size="lg" id={'Tooltip-1'} icon={faExclamationTriangle} />
                                <Tooltip placement="bottom" isOpen={tooltipOpen} target={'Tooltip-1'} toggle={() => settooltipOpen(!tooltipOpen)}>
                                    {
                                        userInfo.errors_in.map((err, i) => {
                                            return <p>{`No se ha encontrado el usuario en '${err}'`}</p>
                                        })
                                    }
                                </Tooltip>
                            </Badge>
                        </>)
                    }
                    {
                        userInfo && userInfo.db.puesto != userInfo.db.nombre ? (<h4 className="text-muted">{userInfo.db.puesto}</h4>) : (null)
                    }
                    {
                        userInfo ? (<a href={`mailto:${userInfo.db.mailpuesto}`}>{userInfo.db.mailpuesto}</a>) : (
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
                                <ListGroupItem><b>Equipo: </b>{userInfo ? (<a href={`/host/WIN-ND355NATD61`}>WIN-ND355NATD61</a>) : (
                                    <Spinner color="primary" size="sm" />
                                )}</ListGroupItem>
                                <ListGroupItem><b>Último inicio sesión: </b>{userInfo ? (userInfo.db.aperturapuesto && userInfo.db.aperturapuesto.replace("T", " ")) : (
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
