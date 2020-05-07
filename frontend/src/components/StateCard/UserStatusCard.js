import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Progress, Spinner, CardBody, Collapse } from 'reactstrap'
import { Card } from '@material-ui/core'

const mapStateToProps = (state) => ({
    ...state
})

const mapDispatchToProps = dispatch => ({});

const UserStatusCard = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [color, setcolor] = useState("info")

    const setColor = () => {
        if (!props.users.users) return "secondary"
        let blockeds = props.users.users.filter(u => u['isBlocked']).length;
        let color2 = "info"
        let perc = (blockeds / props.users.users.length) * 100

        if (perc > 25) color2 = "warning"
        if (perc > 50) color2 = "danger"

        setcolor(color2)
    }

    return (
        <div>
            <Card className={"text-white bg-" + color} onClick={() => setPopoverOpen(!popoverOpen)} id={Math.random()} >
                <CardBody className="pb-0">
                    <div className="text-value">Usuarios Bloqueados</div>
                    <div>
                        {
                            props.users.users ? (<>
                                {props.users.users.filter(u => u['isBlocked']).length + "/" + props.users.users.length}
                                <Progress
                                    style={{ height: 5, marginBottom: "-5px" }}
                                    value={props.users.users.filter(u => u['isBlocked']).length}
                                    max={props.users.users.length} />
                            </>)
                                : <Spinner size="sm" />}
                    </div>
                </CardBody>
                <div className="card_footer" />
                <Collapse isOpen={popoverOpen}>
                    <Card color={color} style={{ border: "none" }}>
                        <CardBody>
                            {
                                props.users.users ? props.users.users.filter(u => u['isBlocked']).map(u => (
                                    <a href={`/user/${u.cn}`}>{u.cn}</a>
                                ))
                                    : (<Spinner size="sm" />)}
                        </CardBody>
                    </Card>
                </Collapse>
            </Card>
        </div>
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(UserStatusCard)