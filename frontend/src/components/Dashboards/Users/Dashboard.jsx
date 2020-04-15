import React, { Component } from 'react'
import StateCard from '../../StateCard/StateCard'
import { Row, Col } from 'reactstrap'
import UserTable from '../../UserTable/UserTable'
import agent from "../../../agent/agent"

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
        agent.Users.getAll().then(users => {
            let counted_users = {
                count_blocked_users: 0,
                count_expired_users: 0
            }
            users.map(user => {
                if (user.hasOwnProperty("isExpired")) {
                    counted_users.count_expired_users++
                }
                if (user.hasOwnProperty("isBlocked")) {
                    counted_users.count_blocked_users++
                }

            })
            this.setState({ counted_users, users })
            console.log(this.state);



        })

    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    render() {

        return (
            <div>
                <Row>
                    <Col xs="12" sm="6" lg="6">
                        <StateCard
                            name="Bloqueados"
                            description={this.state.counted_users.count_blocked_users}
                            color="danger"
                            po_desc=""
                        />
                    </Col>
                    <Col xs="12" sm="6" lg="6">
                        <StateCard
                            name="Cacucados"
                            description={this.state.counted_users.count_expired_users}
                            color="warning"
                            po_desc=""
                        />
                    </Col>
                    <UserTable users={this.state.users}></UserTable>
                </Row>
            </div>
        )
    }
}

export default Dashboard