import React from 'react'
// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'
import agent from '../../../agent/agent'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

export const UnlockUser = (props) => {
    const unlockUser = () => {
        console.log(props.user);
        agent.Users.unlock(props.user.distinguishedName).then((data) => {
            // window.location.reload(true)
            toastr.success(`El usuario ${props.user.cn} ha sido desbloqueado correctamente.`,"Desbloqueado")
        })
    }
    return (
        <div>
            <Button color="secondary" onClick={unlockUser}>
                <FontAwesomeIcon
                    icon={faUnlockAlt}
                />
            </Button>

        </div>
    )
}
