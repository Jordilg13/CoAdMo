import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Media, ListGroup, ListGroupItem } from "reactstrap"
import { useMediaQuery } from 'react-responsive'
import logo from "../../assets/img/default-avatar.png"

const User = (props) => {
    const username = props.match.params.username
    const isDesktop = useMediaQuery({ query: '(max-width: 991px)' })

    return (
        <div>

            <Row>
                {!isDesktop && <Col xs="12" sm="6" lg="3">
                    <Media className="img-fluid" src={logo} alt="Computer logo" />
                </Col>}
                <Col>
                    <h1>Jordi Llopis García</h1>
                    {/* <h5 className="text-muted">jllopis</h5> */}
                    <a href="mailto:jordillopis00@gmail.com">jordillopis00@gmail.com</a>
                    <ListGroup flush>
                        <ListGroupItem><b>Nombre: </b>Jordi Llopis García </ListGroupItem>
                        <ListGroupItem><b>Usuario: </b>jllopis </ListGroupItem>
                        <ListGroupItem><b>Equipo: </b><a href="/host/192.168.1.150">192.168.1.150</a></ListGroupItem>
                        <ListGroupItem><b>Último inicio sesión: </b>15/04/2020 17:06 </ListGroupItem>
                        

                    </ListGroup>


                </Col>

            </Row>
        </div>
    )

}


const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(User)
