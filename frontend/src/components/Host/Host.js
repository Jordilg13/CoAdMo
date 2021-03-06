import { Badge, ListGroup, ListGroupItem, Media, Progress, Spinner, Table } from 'reactstrap';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import React, { useState } from 'react'

import Actions from './Actions';
import agent from "../../agent/agent"
import classnames from 'classnames';
import { connect } from 'react-redux'
import logo from "../../assets/img/computer.png"
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
    const [tabs_info, setTabs_info] = useState(false)
    const [isUp, setisUp] = useState(true)
    const hostname = props.match.params.hostname
    const isDesktop = useMediaQuery({ query: '(max-width: 991px)' })
    const [errors, seterrors] = useState(false)

    const dataToState = (data, category = false) => {
        if (!data.error) {
            // IF IS THE INVENTORY
            if (!category) {
                data = data[Object.keys(data)[0]]
                Object.entries(data).map(([key, value]) => {
                    setTabs_info(prevstate => { return { ...prevstate, [key]: value } })
                })
            } else { // IF IS A SINGLE ITEM LIKE CPU OR RAM
                eval(`set${category}(data)`)
            }
        } else {
            setisUp(false)
            seterrors(data.msg)
        }
    }


    const retrieveData = () => {
        if (!isFetching) {
            console.log("RETRIEVING INFORMATION");
            // avoid to fetch again the information when rerendered, also avoiding an infinity loop
            setIsFetching(true)

            // Get CPU USAGE
            agent.Host.get(hostname, "cpu_usage")
                .then((data) => { dataToState(data, "Cpu") })

            // Get SPACE AVAILABLE
            agent.Host.get(hostname, "space_available")
                .then((data) => { dataToState(data, "Space") })

            // Get RAM usage
            agent.Host.get(hostname, "ram_usage")
                .then((data) => { dataToState(data, "Ram") })

            // Get HARDWARE INVENTORY
            agent.Host.get(hostname, "hardware_inventory")
                .then((data) => { dataToState(data) })

            // Get SOFTWARE INVENTORY
            agent.Host.get(hostname, "software_inventory")
                .then((data) => { dataToState(data) })

        }
    }

    const toggle = tab => { if (activeTab !== tab) setactiveTab(tab) }
    const allIPAddreses = () => {
        let a = tabs_info && tabs_info.network.map(a => {
            console.log("allIPAddreses -> a", a)
            return a
        })
        console.log("allIPAddreses -> a", a)

        return "asdf"
    }

    retrieveData()

    return (
        <div>
            <Row>
                <Col xs="10" sm="6" lg="6">
                    <h1 style={{ "display": "inline" }}>{hostname}</h1>
                    <h4 className="text-muted">{ tabs_info.network && tabs_info.network.map(e => e.IPAddress).join(" - ")}</h4>
                    {/* Show errors if there are any */}
                    {errors && <Badge color="danger">{errors}</Badge>}
                </Col>
                <Col xs="2" sm="3" lg="6">
                    {/* ACTIONS */}
                    <Actions hostname={hostname} mac={tabs_info['network'] ? tabs_info['network'][0]['MACAddress'] : []}></Actions>
                </Col>
            </Row>
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
                                isUp ? (<div className="text-center"><Spinner color="primary" size="sm" /></div>) : (<div className="text-center"><Badge color="danger">X</Badge></div>)


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
                                isUp ? (<div className="text-center"><Spinner color="primary" size="sm" /></div>) : (<div className="text-center"><Badge color="danger">X</Badge></div>)

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
                                isUp ? (<div className="text-center"><Spinner color="primary" size="sm" /></div>) : (<div className="text-center"><Badge color="danger">X</Badge></div>)

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
                        {tabs_info ? Object.keys(tabs_info).map((tabname, i) => {
                            return <NavItem key={i}>
                                <NavLink
                                    className={classnames({ active: activeTab == i })}
                                    onClick={() => { toggle(i); }}>
                                    {tabname.charAt(0).toUpperCase() + tabname.slice(1)} {/* first uppercase letter */}
                                </NavLink>
                            </NavItem>
                        }) : isUp ? (<div className="text-center"><Spinner color="primary" size="sm" /></div>) : (<></>)}
                    </Nav>



                    {/* CONTENT OF EACH TAB ------------------------------------------------------------------*/}
                    <TabContent activeTab={activeTab}>
                        {
                            tabs_info ? Object.keys(tabs_info).map((tab, i) => {
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
                                isUp ? (<div className="text-center"><Spinner color="primary" size="sm" /></div>) : (<div className="text-center"><Badge color="danger">X</Badge></div>)
                        }


                    </TabContent>
                </Col>
            </Row>

        </div >
    )



}

export default connect(mapStateToProps, mapDispatchToProps)(Host)