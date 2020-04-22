import React from 'react'
import { submitUser } from '../../UserTable/utils'
import {  Button,  Modal, ModalHeader, ModalFooter, ModalBody, Form, FormGroup, Label, Input, Row, Col, InputGroupAddon, InputGroup, InputGroupText } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'



export const CreateUser = (props) => {
    const {modal, toggle, classes, showPassword, setshowPassword} = props
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className={'modal-lg ' + 'modal-primary ' + classes}>
                <ModalHeader toggle={toggle}>Añadir Usuario</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitUser} id="create-user-form">
                        <Row>
                            <Col xs="12" sm="6" lg="6">
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input type="text" name="name" id="name" placeholder="Name" required />
                                </FormGroup>
                            </Col>
                            <Col xs="12" sm="6" lg="6">
                                <FormGroup>
                                    <Label for="Surname">Surname</Label>
                                    <Input type="text" name="Surname" id="Surname" placeholder="Surname" required />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="6" lg="6">
                                <FormGroup>
                                    <Label for="GivenName">GivenName</Label>
                                    <Input type="text" name="GivenName" id="GivenName" placeholder="GivenName" required />
                                </FormGroup>
                            </Col>
                            <Col xs="12" sm="6" lg="6">
                                <FormGroup>
                                    <Label for="SamAccountName">SamAccountName</Label>
                                    <Input type="text" name="SamAccountName" id="SamAccountName" placeholder="SamAccountName" required />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="12" lg="6">
                                <FormGroup>
                                    <Label for="UserPrincipalName">UserPrincipalName</Label>
                                    <Input type="text" name="UserPrincipalName" id="UserPrincipalName" placeholder="UserPrincipalName" required />
                                </FormGroup>
                            </Col>
                            <Col xs="12" sm="6" lg="6">
                                <Label for="Password">Password</Label>
                                <InputGroup>
                                    <Input type={showPassword ? "text" : "password"} name="Password" id="Password" placeholder="Password" required />
                                    <InputGroupAddon addonType="append" style={{ cursor: "pointer" }} onClick={() => setshowPassword(!showPassword)}>
                                        <InputGroupText >
                                            {
                                                !showPassword ?
                                                    (
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                        />) :
                                                    (
                                                        <FontAwesomeIcon
                                                            icon={faEyeSlash} />
                                                    )}
                                        </InputGroupText>
                                    </InputGroupAddon>

                                </InputGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button form="create-user-form" color="primary" type="submit">Create</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
