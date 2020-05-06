import React, { useState, useEffect } from 'react'
import StateCard from '../../StateCard/StateCard'
import { Row, Col, CardBody, Button } from 'reactstrap'
import UserTable from '../../UserTable/UserTable'
import agent from "../../../agent/agent"
import { connect } from 'react-redux'
import { services } from "./services"
import SqlConnectionsTable from '../../SqlMonitor'
import { Card, CardHeader } from '@material-ui/core'
import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveLocalStorageLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

const defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 30
}


const mapStateToProps = (state) => ({
    ...state
})

const mapDispatchToProps = dispatch => ({});

const Dashboard = (props) => {
    console.log("Dashboard -> {props, ...defaultProps}", props)

    // export class Dashboard extends Component {
    const [servicesStatus, setservicesStatus] = useState(false)
    const [layouts, setLayouts] = useState(getFromLS("layouts") || {})

    // CHECK THE STATUS OF EACH SERVICE
    // useEffect(() => {
    //     let dataservs = [];

    //     services.map(service => {
    //         let get = service.hostname ? agent.Services.getSpecific : agent.Services.getDefault;

    //         dataservs.push(
    //             <Col xs="12" sm="6" lg="3" key={service.name + "-" + Math.random()}>
    //                 <StateCard
    //                     name={service.name}
    //                     prom={get(service.healthcheck, service.hostname)}
    //                 />
    //             </Col>
    //         )
    //         setservicesStatus(dataservs)
    //     })
    // }, [])

    // LAYOUT CONF
    const resetLayout = () => {
        setLayouts({})
    }

    const onLayoutChange = (layout, layouts) => {
        saveToLS("layouts", layouts);
        setLayouts({ layouts })
    }


    return (
        <>
            <h1>Sistema</h1>
            <br />
            <h4>Estado sistemas</h4>
            <Button onClick={() => resetLayout()}>Reset Layout</Button>
            <ResponsiveLocalStorageLayout
                className="layout"
                cols={{ lg: 2, md: 2, sm: 2, xs: 1, xxs: 1 }}
                rowHeight={35}
                layouts={layouts}
                onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
                isResizable={false}
            >
                <div key="1" data-grid={{ w: 1, h: 5, x: 0, y: 0, minW: 1, minH: 1 }}>
                    <UserTable />
                </div>
                <div style={{ backgroundColor: "blue" }} key="2" data-grid={{ w: 1, h: 1, x: 1, y: 0, minW: 1, minH: 1 }}>
                    <span className="text">2</span>
                </div>
                <div style={{ backgroundColor: "blue" }} key="3" data-grid={{ w: 1, h: 1, x: 1, y: 8, minW: 1, minH: 1 }}>
                    <span className="text">3</span>
                </div>
                <div style={{ backgroundColor: "blue" }} key="4" data-grid={{ w: 1, h: 1, x: 1, y: 6, minW: 1, minH: 1 }}>
                    <span className="text">4</span>
                </div>
                <div style={{ backgroundColor: "blue" }} key="5" data-grid={{ w: 1, h: 1, x: 1, y: 7, minW: 1, minH: 1 }}>
                    <span className="text">5</span>
                </div>
            </ResponsiveLocalStorageLayout>

        </>
    )

}

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
        } catch (e) {
            /*Ignore*/
        }
    }
    return ls[key];
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
            "rgl-8",
            JSON.stringify({
                [key]: value
            })
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
