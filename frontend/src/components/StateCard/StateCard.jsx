import React, { useState, useEffect } from 'react';
import { Card, CardBody, Collapse } from 'reactstrap';
import "./styles.css"
import toastr from "toastr"


// COLORS: primary, secondary, success, danger, warning, info, light, dark
export const StateCard = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [serviceStatus, setServiceStatus] = useState(false)

    // resolve the promise
    useEffect(() => {
        props.prom.then(data => {
            console.log("StateCard -> data", data)
            setServiceStatus({
                color: data.is_up ? "success" : "danger",
                description: data.errors > 0 ? "Hay errores" : "Correcto",
                po_desc: data.errors > 0 ? JSON.stringify(data.errors) : "No hay problemas en " + props.name,
            })
        }).catch(err => {
            setServiceStatus({
                color: "dark",
                description: "Estado desconocido",
                po_desc: "La petición al servidor ha fallado. Por favor, compruebe manualmente.",
            })
            toastr.error(err, props.name)
        })
    }, [props.name, props.prom])

    if (serviceStatus) {
        return (
            <div>
                <Card className={"text-white bg-" + serviceStatus.color} onClick={() => setPopoverOpen(!popoverOpen)} id={Math.random()} >
                    <CardBody className="pb-0">
                        <div className="text-value">{props.name}</div>
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


export default StateCard
