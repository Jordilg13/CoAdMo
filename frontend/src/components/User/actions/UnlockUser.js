import { Button } from 'reactstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from 'react'
import agent from '../../../agent/agent'
import { connect } from 'react-redux'
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons'
import toastr from 'toastr'

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    getUsers: () =>
        dispatch({ type: "GET_USERS", payload: agent.Users.getAll() })
});

const UnlockUser = (props) => {

    const unlockUser = () => {

        agent.Users.unlock(props.user.distinguishedName).then(data => {
            if (data == 2) {
                toastr.success(`El usuario ${props.user.cn} ha sido desbloqueado correctamente.`, "Desbloqueado")
                props.getUsers()
            }
        })
    }
    
    return (
        <div>
            <Button color="secondary" onClick={unlockUser}>
                <FontAwesomeIcon icon={faUnlockAlt} />
            </Button>

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(UnlockUser)