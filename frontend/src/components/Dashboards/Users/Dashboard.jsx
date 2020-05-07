import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Row, Col, Spinner, CardGroup, CardHeader, CardBody, Progress } from 'reactstrap'
import UserTable from '../../UserTable/UserTable'
import StaticStateCard from '../../StateCard/StaticStateCard'
import { Card } from '@material-ui/core'

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({

});


const Dashboard = (props) => {

    console.log(props);

    const countUsers = (param) => {
        return props.users.users.filter(u => u[param]).length
    }


    return (
        <div>
            <Row>
                <Col xs="6" sm="6" lg="6">
                    <StaticStateCard
                        name="Bloqueados"
                        description={props.users.users ? countUsers("isBlocked") : (<Spinner size="sm" />)}
                        color="danger"
                        po_desc=""
                    />

                </Col>
                <Col xs="6" sm="6" lg="6">
                    <StaticStateCard
                        name="Cacucados"
                        description={props.users.users ? countUsers("isExpired") : (<Spinner size="sm" />)}
                        color="warning"
                        po_desc=""
                    />
                </Col>

                <UserTable />

            </Row>
        </div>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

