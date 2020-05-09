import "../StateCard/styles.css"

import { Card, CardBody, Collapse } from 'reactstrap';
import React, { useEffect, useState } from 'react';

import agent from "../../agent/agent";
import toastr from "toastr"

// COLORS: primary, secondary, success, danger, warning, info, light, dark
export const SQLStatus = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [serviceStatus, setServiceStatus] = useState(false)

    // resolve the promise
    useEffect(() => {
        agent.Services.getDefault("sqlhc").then(data => {
            console.log("SQLStatus -> data", data)
            let allServersOk = data.every(s => s[1] == true)
            setServiceStatus({
                color: allServersOk ? "success" : "danger",
                description: allServersOk ? "Correcto" : "Errores en:",
                po_desc: !allServersOk ? (
                    data.filter(s => s[1] == false).map(server => (<p>{server[0]}</p>))
                ) : "No hay problemas en SQLServer",
            })
        }).catch(err => {
            setServiceStatus({
                color: "dark",
                description: "Estado desconocido",
                po_desc: "La petición al servidor ha fallado. Por favor, compruebe manualmente.",
            })
            // toastr.error(err, props.name)
        })
    }, [])

    if (serviceStatus) {
        return (
            <div>
                <Card className={"text-white bg-" + serviceStatus.color} onClick={() => setPopoverOpen(!popoverOpen)} id={Math.random()} >
                    <CardBody className="pb-0">
                        <div className="text-value">SQL Server</div>
                        <div>{serviceStatus.description}</div>
                    </CardBody>
                    <div className="card_footer" />
                    <Collapse isOpen={popoverOpen}>
                        <Card color={serviceStatus.color} style={{ border: "none" }}>
                            <CardBody>{serviceStatus.po_desc}</CardBody>
                        </Card>
                    </Collapse>
                </Card>
            </div>
        )
    } else {
        return (<div>
            <Card className={"text-white bg-secondary a"} onClick={() => setPopoverOpen(!popoverOpen)} >
                <span>
                    <CardBody className="pb-0">
                        <div className="text-value">{props.name}</div>
                        <div>Cargando...</div>
                    </CardBody>
                    <div className="card_footer" />
                    <Collapse isOpen={popoverOpen}>
                        <Card color="secondary" style={{ border: "none" }}>
                            <CardBody>Esperando respuesta del servidor...</CardBody>
                        </Card>
                    </Collapse>
                </span>
            </Card>
        </div>)
    }

}


export default SQLStatus
