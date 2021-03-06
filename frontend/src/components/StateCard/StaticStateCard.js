import "./styles.css"

import { Card, CardBody, Collapse, Spinner } from 'reactstrap';
import React, { useEffect, useState } from 'react';

import toastr from "toastr"

// COLORS: primary, secondary, success, danger, warning, info, light, dark
export const StaticStateCard = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false)

    return (
        <div>
            <Card className={"text-white bg-" + props.color} onClick={() => setPopoverOpen(!popoverOpen)} id={Math.random()} >
                <CardBody className="pb-0">
                    <div className="text-value">{props.name}</div>
                    <div>{props.description}</div>
                </CardBody>
                <div className="card_footer" />
                <Collapse isOpen={props.expand ? popoverOpen : false}>
                    <Card color={props.color} style={{ border: "none" }}>
                        <CardBody>{props.po_desc}</CardBody>
                    </Card>
                </Collapse>
            </Card>
        </div>
    )

}


export default StaticStateCard
