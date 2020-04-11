import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux'
import DataTable from 'react-data-table-component';
import agent from "../../agent/agent"
import { ListGroup, ListGroupItem, Media, Spinner, Progress, Progre, Table } from 'reactstrap';
import logo from "../../assets/img/computer.png"
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { useMediaQuery } from 'react-responsive'


const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({

});


const Host = (props) => {
    const [isFetching, setIsFetching] = useState(false)
    const [activeTab, setactiveTab] = useState(0)
    const [cpu, setCpu] = useState(false)
    const [ram, setRam] = useState(false)
    const [space, setSpace] = useState(false)
    const [hardware, Sethardware] = useState(false)
    const [software, setSoftware] = useState(false)
    const [tabs_info, setTabs_info] = useState(false)
    const hostname = props.match.params.hostname
    const isDesktop = useMediaQuery({ query: '(max-width: 991px)' })


    const retrieveData = () => {
        if (props.auth.isLogged && !isFetching) {
            console.log("RETRIEVING INFORMATION");
            // avoid to fetch again the information when rerendered, also avoiding an infinity loop
            setIsFetching(true)

            // Get CPU USAGE
            agent.Host.get(hostname, "cpu_usage")
                .then((data) => { setCpu(data) })

            // Get SPACE AVAILABLE
            agent.Host.get(hostname, "space_available")
                .then((data) => {
                    data.space_available[1] = {
                        "Name": "D:",
                        "GB": 115,
                        "Percentage": 30
                    }; setSpace(data)
                })
            // Get RAM usage
            agent.Host.get(hostname, "ram_usage")
                .then((data) => { setRam(data) })
            // Get HARDWARE INVENTORY
            agent.Host.get(hostname, "hardware_inventory")
                .then((data) => {
                    Sethardware(data);
                    Object.entries(data.hardware_inventory).map(([key, value]) => {
                        setTabs_info(prevstate => {return {...prevstate,[key]: value}})
                    })
                })
            // Get SOFTWARE INVENTORY
            agent.Host.get(hostname, "software_inventory")
                .then((data) => {
                    setSoftware(data)
                    console.log(data);
                    Object.entries(data.software_inventory).map(([key, value]) => {
                        setTabs_info(prevstate => {return {...prevstate,[key]: value}})
                    })
                    // setTabs_info({ ...tabs_info })
                })

        }
    }

    const toggle = tab => {
        console.log(tabs_info);

        if (activeTab !== tab) setactiveTab(tab);
    }

    retrieveData()

    return (
        <div>
            <h1>{hostname}</h1>

            <Row>
                {/* display only in desktop browser, not in mobiles */}
                {!isDesktop && <Col xs="12" sm="6" lg="3">
                    <Media className="img-fluid" src={logo} alt="Computer logo" />
                </Col>}

                <Col xs="12" sm="12" lg="9">
                    <ListGroup>
                        {/* RAM element */}
                        <ListGroupItem>
                            <div className="text-center font-weight-bold">RAM</div>
                            {!ram ? (
                                <div className="text-center"><Spinner color="primary" size="sm" animation="border" role="status" /></div>

                            ) : (
                                    <Progress multi>
                                        <Progress bar value={ram.ram_usage[0].Percentage} max={100}>{ram.ram_usage[0].Percentage}%</Progress>
                                        <Progress bar color="secondary" value={100 - ram.ram_usage[0].Percentage} max={100}> <div className="text-dark">{100 - ram.ram_usage[0].Percentage}%</div>  </Progress>
                                    </Progress>
                                )}
                        </ListGroupItem>
                        {/* CPU element */}
                        <ListGroupItem>
                            <div className="text-center font-weight-bold">CPU</div>
                            {!cpu ? (
                                <div className="text-center"><Spinner color="primary" size="sm" animation="border" role="status" /></div>

                            ) : (
                                    <Progress multi>
                                        <Progress bar value={cpu.cpu_usage[0].LoadPercentage} max={100}>{cpu.cpu_usage[0].LoadPercentage}%</Progress>
                                        <Progress bar color="secondary" value={100 - cpu.cpu_usage[0].LoadPercentage} max={100}> <div className="text-dark">{100 - cpu.cpu_usage[0].LoadPercentage}%</div>  </Progress>
                                    </Progress>
                                )}
                        </ListGroupItem>
                        {/* SPACE element */}
                        <ListGroupItem>
                            <div className="text-center font-weight-bold">SPACE</div>
                            {!space ? (
                                <div className="text-center"><Spinner color="primary" size="sm" animation="border" role="status" /></div>

                            ) : (
                                    space.space_available.map(disk => {
                                        return (<>
                                            {disk.Name}
                                            <Progress multi>
                                                <Progress bar value={100 - disk.Percentage} max={100}>{100 - disk.Percentage}%</Progress>
                                                <Progress bar color="secondary" value={disk.Percentage} max={100}> <div className="text-dark">{disk.GB} GB</div>  </Progress>
                                            </Progress></>)
                                    })

                                )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <br />


                    {/* NAV BAR OF TABS ------------------------------------------------------------------*/}
                    <Nav tabs>
                        {hardware ? Object.keys(tabs_info).map((tabname, i) => {
                            return <NavItem key={i}>
                                <NavLink
                                    className={classnames({ active: activeTab == i })}
                                    onClick={() => { toggle(i); }}>
                                    {tabname.charAt(0).toUpperCase() + tabname.slice(1)} {/* first uppercase letter */}
                                </NavLink>
                            </NavItem>
                        }) : <Spinner color="primary" size="sm" animation="border" role="status" />}
                    </Nav>



                    {/* CONTENT OF EACH TAB ------------------------------------------------------------------*/}
                    <TabContent activeTab={activeTab}>
                        {
                            hardware ? Object.keys(tabs_info).map((tab, i) => {
                                return (<TabPane tabId={i} key={tab}>
                                    <Row>
                                        <Col sm="12">
                                            <Table>
                                                <tr>
                                                    {/* put the header of each table with the 'key' fields */}
                                                    {Object.entries(tabs_info[tab][0]).map(([key, value]) => {
                                                        return <th>{key}</th>
                                                    })}
                                                </tr>
                                                {/* print the rows with the "value" field */}
                                                {tabs_info[tab].map((element) => {
                                                    return <tr>
                                                        {Object.entries(element).map(([key, value]) => {
                                                            return <td>{value}</td>
                                                        })}
                                                    </tr>
                                                })}


                                            </Table>
                                        </Col>
                                    </Row>
                                </TabPane>)
                            })
                                :
                                <Spinner color="primary" size="sm" animation="border" role="status" />
                        }


                    </TabContent>
                </Col>
            </Row>

        </div >
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Host)