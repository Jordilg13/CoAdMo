import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import React, { useEffect, useState } from 'react'
import { faEye, faEyeSlash, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { JustifyAction } from './JustifyAction';
import { updateUser } from '../../UserTable/utils'

const UserForm = (props) => {
    // STATE
    const [showPassword, setshowPassword] = useState(false)
    const [modal, setModal] = useState(false);
    const [justifyModal, setjustifyModal] = useState(false);
    const [justifyData, setjustifyData] = useState({});
    const [isUpdate, setisUpdate] = useState(props.action == "update")

    // TOGGLE MODALS
    const toggle = () => setModal(!modal);
    const toggleJ = () => setjustifyModal(!justifyModal);

    // CUSTOM BUTTONS
    const createbtn = (<Button color="secondary" style={props.style} onClick={toggle}>
        <FontAwesomeIcon icon={faUserPlus} />
    </Button>)
    const updatebtn = <Button color="info" onClick={toggle} ><FontAwesomeIcon icon={faUserEdit} /></Button>

    const submitUserForm = (event) => {
        event.preventDefault();

        if (isUpdate) {
            updateUser(event, props.user, toggle)
        } else {
            setjustifyData(event.target)
            toggleJ()
        }

    }

    return (
        <div>
            {isUpdate ? updatebtn : createbtn}

            {!isUpdate && <JustifyAction show={justifyModal} toggle={toggleJ} formdata={justifyData} userhandler={toggle} />}

            <Modal isOpen={modal} toggle={toggle} className={'modal-lg ' + 'modal-primary ' + props.classes}>
                <ModalHeader toggle={toggle}>Añadir Usuario</ModalHeader>
                <ModalBody>
                    <Form onSubmit={submitUserForm} id="create-user-form">
                        <Row>
                            <Col xs="12" sm="12" lg="6">
                                <FormGroup>
                                    <Label for="cn">Nombre</Label>
                                    <Input type="text" name="cn" id="cn" placeholder="CommonName"
                                        defaultValue={isUpdate ? props.user.cn : ""} required disabled={isUpdate} />
                                </FormGroup>
                            </Col>
                            <Col xs="12" sm="12" lg="6">
                                <FormGroup>
                                    <Label for="sn">Apellidos</Label>
                                    <Input type="text" name="sn" id="sn" placeholder="Apellidos"
                                        defaultValue={isUpdate ? props.user.sn : ""} />
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
                                <Label for="Password">Contraseña</Label>
                                <InputGroup>
                                    <Input type={showPassword ? "text" : "password"} name="Password" id="Password" placeholder="Contraseña" required disabled={isUpdate} />
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

                    <Button form="create-user-form" color="primary" type="submit">
                        {isUpdate ? "Actualizar" : "Justificar"}
                    </Button>{' '}
                    {/* <Button form="create-user-form" color="primary" type="submit">{isUpdate ? "Update" : "Create"}</Button>{' '} */}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default UserForm