import React from 'react'
import { connect } from 'react-redux'

// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt, } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'
import agent from '../../../agent/agent'
import toastr from "toastr"

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    getUsers: () =>
        dispatch({ type: "GET_USERS", payload: agent.Users.getAll() })
});

const DeleteUser = (props) => {

    const deleteUser = () => {

        agent.Users.delete(props.user.distinguishedName).then(data => {
            toastr.success(`El usuario ${props.user.cn} ha sido eliminado correctamente.`, "Eliminado")
            props.getUsers()
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser)