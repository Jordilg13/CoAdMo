import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/big_logo_coadmo.png'
import sygnet from '../../assets/img/brand/small_logo_coadmo.png'
import agent from "../../agent/agent"
import { connect } from 'react-redux'
import jwt from "jwt-decode";
import JwtDecode from 'jwt-decode';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  logout: () =>
    dispatch({ type: "LOGOUT" }),
  loadToken: (token, payload) =>
    dispatch({ type: "APP_LOAD", token, payload })
});


class DefaultHeader extends Component {
  constructor(props) {
    super(props)

    this.signOut = e => {
      e.preventDefault()
      this.props.logout()
      this.props.redirectTo("/login")
    }

    // load token from localstorage to the state
    const token = window.localStorage.getItem("token");
    if (token) {
      agent.setToken(token)

      // loads the token if its valid
      let decoded = JwtDecode(token)

      if (this.isTokenExpired(decoded['exp'])) {
        console.log("LOGING OUT");
        this.props.logout()
        this.props.redirectTo("/login")
      } else {
        this.props.loadToken(token, token ? agent.Auth.current() : null)
      }
    } else {
      console.log("LOGING OUT");
      this.props.logout()
      this.props.redirectTo("/login")
    }

  }

  isTokenExpired = (sec) => {
    let exp_date = new Date(sec).getTime()
    let today = (new Date().getTime() / 1000)

    return exp_date < today
  }

  // returns the buton of login or the user's avatar and username if it's logged
  UserStatus = () => {
    if (this.props.auth.username) {
      return <><NavItem className="d-md-down-none">
        <NavLink to="#" className="nav-link">{this.props.auth.username}</NavLink>
      </NavItem>
        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav>
            <img src={`https://eu.ui-avatars.com/api/?name=${this.props.auth.username}&background=084fb9&color=fff&length=3&font-size=0.33`} className="img-avatar" alt="admin@bootstrapmaster.com" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={e => this.signOut(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown></>
    } else {
      return <NavItem className="px-3">
        <NavLink to="/login" className="nav-link">Login</NavLink>
      </NavItem>
    }

  }


  render() {
    console.log(this.props);

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <this.UserStatus />
          {/* {
            this.props.auth.username ? <h4>{this.props.auth.username}</h4> : <h4>Not logged</h4>
          } */}
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);
