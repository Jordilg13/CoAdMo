import React, { Component } from 'react'

import HostList  from '../../HostList'
import { connect } from 'react-redux'

export const HostDashboard = () => {
    return (
        <div>
            <h1>Equipos</h1>
            <HostList/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state
})

const mapDispatchToProps = dispatch => ({});


export default connect(mapStateToProps, mapDispatchToProps)(HostDashboard)
