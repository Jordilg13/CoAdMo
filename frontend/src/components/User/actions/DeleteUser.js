import React from 'react'
// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashAlt, } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'

export const DeleteUser = (props) => {
    return (
        <div>
            <Button color="danger">
                <FontAwesomeIcon
                    icon={faTrashAlt}
                // onClick={}
                />
            </Button>
        </div>
    )
}
