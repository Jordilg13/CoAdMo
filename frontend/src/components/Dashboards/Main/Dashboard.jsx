import React, { useState, useEffect } from 'react'
import StateCard from '../../StateCard/StateCard'
import { Row, Col } from 'reactstrap'
import UserTable from '../../UserTable/UserTable'
import agent from "../../../agent/agent"
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    ...state
})

const mapDispatchToProps = {

}

const Dashboard = (props) => {
    console.log("Dashboard -> props", props)
    // export class Dashboard extends Component {
    const [users, setusers] = useState(false)
    const [servicesStatus, setservicesStatus] = useState(false)

    // get users only if there are a logged user
    useEffect(() => {
        props.auth && agent.Users.getAll().then(users => {
            setusers(users)
        })
    }, [props.auth])

    useEffect(() => {
        console.log("USEFFECT");

        props.auth && agent.Services.get("ad", "192.168.1.150").then(data => {
            console.log(data);

            setservicesStatus(data)
        })
    }, [])

    return (
        <div>
            <h1>Sistema</h1>
            <br />
            <h4>Estado sistemas</h4>
            <Row>
                <Col xs="12" sm="6" lg="3">
                    <StateCard
                        name="ACTIVE DIRECTORY"
                        description={JSON.stringify(servicesStatus)}
                        color={!servicesStatus ? "secondary" : "danger"}
                        po_desc={JSON.stringify(servicesStatus)}
                    />
                </Col>
                <Col xs="12" sm="6" lg="3">
                    <StateCard
                        name="SISTEMA-EXG"
                        description="Unavailable"
                        color="danger"
                        po_desc="description"
                    />
                </Col>
                <Col xs="12" sm="6" lg="3">
                    <StateCard
                        name="SISTEMA-IIS"
                        description="Available"
                        color="success"
                        po_desc="estado del servicio en el momento que ha sid cargado el componente"
                    />
                </Col>
                <Col xs="12" sm="6" lg="3">
                    <StateCard
                        name="SISTEMA-NAS"
                        description="cao-nas only have 4% free space"
                        color="warning"
                        po_desc="estado del servicio en el momento que ha sid cargado el componente"
                    />
                </Col>
                <Col xs="12" sm="6" lg="3">
                    <StateCard
                        name="SQL-SERVER"
                        description="Available"
                        color="success"
                        po_desc="estado del servicio en el momento que ha sid cargado el componente"
                    />
                </Col>
                <Col xs="12" sm="6" lg="3">
                    <StateCard
                        name="DNS"
                        description="Available"
                        color="success"
                        po_desc="estado del servicio en el momento que ha sid cargado el componente"
                    />
                </Col>
            </Row>

            <UserTable
                filtered_users={true}
                users={users ? users : []}
            />

        </div>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
