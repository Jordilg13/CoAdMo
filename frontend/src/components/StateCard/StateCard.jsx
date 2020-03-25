import React, { Component } from 'react';
import { Card, CardBody, Collapse } from 'reactstrap';
import "./styles.css"


// COLORS: primary, secondary, success, danger, warning, info, light, dark
export class StateCard extends Component {
    constructor(props) {
        super(props)


        this.toggle = this.toggle.bind(this);
        this.state = {

        }
        this.po_id = Math.random() * (10 - 1) + 1;

    }
    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen,
        });
    }

    render() {
        return (
            <div>
                <Card className={"text-white bg-" + this.props.color} onClick={this.toggle} id={this.props.id} >
                    <CardBody className="pb-0">
                        <div className="text-value">{this.props.name}</div>
                        <div>{this.props.description}</div>
                    </CardBody>
                    <div className="card_footer" />
                    <Collapse isOpen={this.state.popoverOpen}>
                        <Card color={this.props.color} style={{ border: "none" }}>
                            <CardBody>{this.props.po_desc}</CardBody>
                        </Card>
                    </Collapse>
                </Card>
            </div>
        )
    }
}

export default StateCard
