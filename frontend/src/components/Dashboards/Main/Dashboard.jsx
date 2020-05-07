import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import StateCard from '../../StateCard/StateCard'
import { Row, Col} from 'reactstrap'
import UserTable from '../../UserTable/UserTable'
import agent from "../../../agent/agent"
import { services } from "./services"
import SqlConnectionsTable from '../../SqlMonitor'
import UserStatusCard from '../../StateCard/UserStatusCard'

const mapStateToProps = (state) => ({
    ...state
})

const mapDispatchToProps = dispatch => ({});

const Dashboard = (props) => {
    // export class Dashboard extends Component {
    const [servicesStatus, setservicesStatus] = useState(false)
    const [users, setusers] = useState(false)

    // CHECK THE STATUS OF EACH SERVICE
    useEffect(() => {
        let dataservs = [];

        services.map(service => {
            let get = service.hostname ? agent.Services.getSpecific : agent.Services.getDefault;

            dataservs.push(
                <Col xs="12" sm="6" lg="3" key={service.name + "-" + Math.random()}>
                    <StateCard
                        name={service.name}
                        prom={get(service.healthcheck, service.hostname)}
                    />
                </Col>
            )
            setservicesStatus(dataservs)
        })
    }, [])

    return (
        <div>
            <h1>Sistema</h1>
            <br />
            <h4>Estado sistemas</h4>
            <Row>
                {servicesStatus.length > 0 && servicesStatus} {/* STATUS TABS */}
                <Col xs="12" sm="6" lg="3" key={"Users-" + Math.random()}>
                    <UserStatusCard/>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm="6" lg="6">
                    <SqlConnectionsTable />
                </Col>

                <Col xs="12" sm="12" lg="12" style={{ marginTop: "20px" }}>
                    <UserTable filtered_users={true} />
                </Col>


            </Row>
        </div>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
