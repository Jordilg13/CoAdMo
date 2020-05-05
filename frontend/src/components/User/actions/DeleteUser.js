import React from 'react'
// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt, } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'
import agent from '../../../agent/agent'
import toastr from "toastr"

export const DeleteUser = (props) => {

    const deleteUser = () => {

        agent.Users.delete(props.user.distinguishedName).then(data => {
            toastr.success(`El usuario ${props.user.cn} ha sido eliminado correctamente.`, "Eliminado")
            props.handleRefresh()

        })
    }

    return (
        <div>
            <Button color="danger" onClick={deleteUser}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
        </div>
    )
}
