import { Button, Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import React, { useState } from 'react'

import { createUser } from '../../UserTable/utils'

export const JustifyAction = (props) => {
    const toggle = props.toggle
    const userinfo = props.formdata

    return (
        <div>
            <Modal isOpen={props.show} toggle={toggle} className={'modal-primary ' + props.classes}>
                <ModalHeader toggle={toggle}>Añadir Usuario</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => createUser(e, userinfo, toggle, props.userhandler)} id="justify-user-form">
                        <Row>
                            <Col xs="12" sm="12" lg="12">
                                <FormGroup>
                                    <Label for="cn">Descripción</Label>
                                    <Input type="textarea" name="desc" id="desc" placeholder="Descripción de la acción realizada..." required />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="12" lg="12">
                                <FormGroup>
                                    <Label for="cn">Justificación</Label>
                                    <Input type="textarea" name="just" id="just" placeholder="Justificación..."
                                        required />
                                </FormGroup>
                            </Col>

                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button form="justify-user-form" color="primary" type="submit">Crear</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
