import React from 'react'
// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUnlockAlt } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'reactstrap'

export const UnlockUser = (props) => {
    return (
        <div>
            <Button color="secondary">
                <FontAwesomeIcon
                    icon={faUnlockAlt}
                // onClick={}
                />
            </Button>

        </div>
    )
}
