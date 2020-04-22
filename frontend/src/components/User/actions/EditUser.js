import React from 'react'
// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserEdit, } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'

export const EditUser = (props) => {
    const showModal = () => {
        console.log(props.user);
        
    }
    return (
        <div>
            <Button color="info">
                <FontAwesomeIcon
                    icon={faUserEdit}
                    onClick={showModal}
                />
            </Button>
        </div>
    )
}
