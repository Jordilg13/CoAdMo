import React, { Component } from 'react'
import StateCard from '../../StateCard/StateCard'
import { Row, Col } from 'reactstrap'
import UserTable from '../../UserTable/UserTable'

import DataTable from 'react-data-table-component';

export class Dashboard extends Component {
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    render() {

        return (
            <div>
                <h1>Usuarios</h1>
                <br />
                <UserTable></UserTable>
            </div>
        )
    }
}

export default Dashboard