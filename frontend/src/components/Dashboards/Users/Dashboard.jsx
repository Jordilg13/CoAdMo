import { Col, Row, Spinner } from 'reactstrap'

import React from 'react'
import StaticStateCard from '../../StateCard/StaticStateCard'
import UserTable from '../../UserTable/UserTable'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({

});


const Dashboard = (props) => {

    const countUsers = (param) => {
        return props.users.users.filter(u => u[param]).length
    }


    return (
        <div>
            <h1>Usuarios</h1>
            <Row>
                <Col xs="6" sm="6" lg="6">
                    <StaticStateCard
                        name="Bloqueados"
                        description={props.users.users ? countUsers("isBlocked") : (<Spinner size="sm" />)}
                        color="danger"
                        po_desc=""
                        expand={false}
                    />

                </Col>
                <Col xs="6" sm="6" lg="6">
                    <StaticStateCard
                        name="Cacucados"
                        description={props.users.users ? countUsers("isExpired") : (<Spinner size="sm" />)}
                        color="warning"
                        po_desc=""
                        expand={false}
                    />
                </Col>

                <UserTable />

            </Row>
        </div>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

