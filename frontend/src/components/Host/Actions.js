import { Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Modal, ModalBody, ModalFooter, ModalHeader, } from "reactstrap"
import React, { useState } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import agent from "../../agent/agent";
import { faPowerOff, } from '@fortawesome/free-solid-svg-icons'
import toastr from "toastr"
import { useMediaQuery } from "react-responsive";

const Actions = (props) => {
    const [dropdownOpen, setOpen] = useState(false);
    const isDesktop = useMediaQuery({ query: '(max-width: 991px)' })
    const [modal, setModal] = useState(false);
    const [action, setAction] = useState(false)

    // execute the given action
    const executeAction = e => {
        e.preventDefault()


        console.log("Actions -> action && agent.Host[action]", agent.Host[action])
        action && agent.Host[action](props.hostname).then(data => {
            console.log("Actions -> data", data)

            if (data[action] && data[action][0] == 0) {
                toastr.success(
                    `El equipo se está ${action == 'shutdown' ? 'apagando' : 'reiniciando'}.`,
                    action == 'shutdown' ? 'Apagando' : 'Reiniciando')
            } else {
                toastr.error("Algo no ha ido como debia.", "Error")
            }
            setModal(!modal)

        })

    }

    // confirm the action, security prevention
    const confirm = (action) => {
        setAction(action)
        setModal(!modal)
    }

    // wake on lan
    const wakeOnLan = (mac) => {
        console.log("wakeOnLan -> mac", mac)
        
    }

    return (
        <div>
            <ButtonDropdown isOpen={dropdownOpen} toggle={() => setOpen(!dropdownOpen)} className="pull-right">
                <DropdownToggle caret>
                    {!isDesktop ? "Acciones" : <FontAwesomeIcon icon={faPowerOff} size="sm" />}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => wakeOnLan(props.mac)} disabled={true}>Encender</DropdownItem>
                    <DropdownItem onClick={() => confirm("shutdown")}>Apagar</DropdownItem>
                    <DropdownItem onClick={() => confirm("restart")}>Reiniciar</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>

            <Modal isOpen={modal} toggle={() => setModal(!modal)} className={'modal-sm ' + 'modal-danger'}>
                <ModalHeader toggle={() => setModal(!modal)}>{action == "shutdown" ? "Apagar" : "Reiniciar"} equipo</ModalHeader>
                <ModalBody>
                    <Form onSubmit={executeAction} id="create-user-form">
                        Está seguro que desea {action == "shutdown" ? "Apagar" : "Reiniciar"} el equipo?
                    </Form>
                </ModalBody>
                <ModalFooter>

                    <Button form="create-user-form" color="primary" type="submit">
                        {action == "shutdown" ? "Apagar" : "Reiniciar"}
                    </Button>{' '}
                    {/* <Button form="create-user-form" color="primary" type="submit">{isUpdate ? "Update" : "Create"}</Button>{' '} */}
                    <Button color="secondary" onClick={() => setModal(!modal)}>Salir</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Actions