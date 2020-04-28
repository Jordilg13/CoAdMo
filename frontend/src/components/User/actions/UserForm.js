import React, { useState } from 'react'
import { createUser, updateUser } from '../../UserTable/utils'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Form, FormGroup, Label, Input, Row, Col, InputGroupAddon, InputGroup, InputGroupText } from 'reactstrap';
// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserEdit, faUserPlus, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'



export const UserForm = (props) => {
    const [showPassword, setshowPassword] = useState(false)
    const [modal, setModal] = useState(false);
    const [isUpdate, setisUpdate] = useState(props.action == "update")
    console.log("UPDATE", isUpdate);

    const toggle = () => setModal(!modal);
    const createbtn = (<Button color="secondary" style={{ position: "absolute", top: "-40px", right: "16px" }} onClick={toggle}>
        <FontAwesomeIcon icon={faUserPlus} />
    </Button>)
    const updatebtn = <Button color="info" onClick={toggle} ><FontAwesomeIcon icon={faUserEdit} /></Button>

    return (
        <div>
            {isUpdate ? updatebtn : createbtn}

            <Modal isOpen={modal} toggle={toggle} className={'modal-lg ' + 'modal-primary ' + props.classes}>
                <ModalHeader toggle={toggle}>Añadir Usuario</ModalHeader>
                <ModalBody>
                    <Form onSubmit={isUpdate ? (event) => updateUser(event, props.user) : createUser} id="create-user-form">
                        <Row>
                            <Col xs="12" sm="12" lg="12">
                                <FormGroup>
                                    <Label for="cn">Name</Label>
                                    <Input type="text" name="cn" id="cn" placeholder="CommonName"
                                        defaultValue={isUpdate ? props.user.cn : ""} required />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="6" lg="6">
                                <FormGroup>
                                    <Label for="givenName">GivenName</Label>
                                    <Input type="text" name="givenName" id="givenName" placeholder="GivenName"
                                        defaultValue={isUpdate ? props.user.givenName : ""} required />
                                </FormGroup>
                            </Col>
                            <Col xs="12" sm="6" lg="6">
                                <FormGroup>
                                    <Label for="sAMAccountName">SamAccountName</Label>
                                    <Input type="text" name="sAMAccountName" id="sAMAccountName" placeholder="sAMAccountName"
                                        defaultValue={isUpdate ? props.user.sAMAccountName : ""} required />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="12" lg="6">
                                <FormGroup>
                                    <Label for="userPrincipalName">userPrincipalName</Label>
                                    <Input type="text" name="userPrincipalName" id="userPrincipalName" placeholder="userPrincipalName"
                                        defaultValue={isUpdate ? props.user.userPrincipalName : ""} required />
                                </FormGroup>
                            </Col>
                            <Col xs="12" sm="6" lg="6" hidden={isUpdate}>
                                <Label for="Password">Password</Label>
                                <InputGroup>
                                    <Input type={showPassword ? "text" : "password"} name="Password" id="Password" placeholder="Password" required disabled={isUpdate} />
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
                    <Button form="create-user-form" color="primary" type="submit">{isUpdate ? "Update" : "Create"}</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
