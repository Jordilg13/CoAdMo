import React, { Component } from 'react'
import StateCard from '../../StateCard/StateCard'
import { Row, Col } from 'reactstrap'
import UserTable from '../../UserTable/UserTable'
import agent from "../../../agent/agent"


export class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             users:[]
        }
        agent.Users.getAll().then(users => {
            this.setState({users})
        })
    }
    
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    render() {
        
        return (
            <div>
                <h1>Sistema</h1>
                <br />
                <h4>Estado sistemas</h4>
                <Row>
                    <Col xs="12" sm="6" lg="3">
                        <StateCard
                            name="SISTEMA-EXG"
                            description="Unavailable"
                            color="danger"
                            po_desc="estado del servicio en el momento que ha sid cargado el componente"
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

                {/* <h4>Usuaris</h4> */}
                {/* <Col xs="12" lg="12 "> */}
                    <UserTable 
                    filtered_users={true}
                    users={this.state.users}
                    />
                
                {/* </Col> */}


            </div>
        )
    }
}

export default Dashboard