import React from 'react'
// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'
import agent from '../../../agent/agent'

export const UnlockUser = (props) => {
    const unlockUser = () => {
        console.log(props.user);
        agent.Users.unlock(props.user.distinguishedName).then((data) => {
            console.log("unlockUser -> data", data)

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
