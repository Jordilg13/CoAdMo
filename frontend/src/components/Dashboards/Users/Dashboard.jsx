import React, { Component, Suspense } from 'react'
import { Row, Col, Spinner } from 'reactstrap'
import UserTable from '../../UserTable/UserTable'
import StaticStateCard from '../../StateCard/StaticStateCard'

export class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            counted_users: {
                count_blocked_users: 0,
                count_expired_users: 0,
            },
            users: []
        }

    }
    // TODO: change users to Redux

    render() {

        return (
            <div>
                <Row>
                    <Col xs="6" sm="6" lg="6">
                        <StaticStateCard
                            name="Bloqueados"
                            description={this.state.users.length === 0 ? (<Spinner size="sm" />) : this.state.counted_users.count_blocked_users}
                            color="danger"
                            po_desc=""
                        />
                    </Col>
                    <Col xs="6" sm="6" lg="6">
                        <StaticStateCard
                            name="Cacucados"
                            description={this.state.users.length === 0 ? (<Spinner size="sm" />) : this.state.counted_users.count_expired_users}
                            color="warning"
                            po_desc=""
                        />
                    </Col>

                    <UserTable />

                </Row>
            </div>
        )
    }
}

export default Dashboard