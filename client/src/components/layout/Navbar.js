import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logoutUser} from '../../actions/authActions'
import {clearCurrentProfile} from '../../actions/profileActions'
import { withRouter } from 'react-router-dom'


class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault()
        this.props.clearCurrentProfile()
        this.props.logoutUser(this.props.history)
    }
    render() {
    const {isAuthenticated, user} = this.props.auth
    const authLinks = (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-3">
                    <Link  className="nav-link shadow-sm bg-white rounded text-muted pr-3 pt-1 pb-1 pl-3" to="/job-post">
                    <i className="fas fa-briefcase pr-2"></i>
                        Post New Job
                    </Link>
                </li>
                {/* <li className="nav-item">
                    <Link className="nav-link" to="/feed">
                        Posts
                    </Link>
                </li> */}
                <li className="nav-item mr-2">
                    <Link className="nav-link shadow-sm bg-white rounded text-muted pr-3 pt-1 pb-1 pl-3" to="/messages">
                        <i className="far fa-envelope pr-2"></i>
                        Inbox
                    </Link>
                </li>
         
                <li className="nav-item">
                <div className="dropdown show">
                    <a className="nav-username btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img style={{ width: '20px', marginRight: '10px' }} src={user.avatar} className="rounded-circle" alt={user.name} title="You must have a gravatar connected to your email to display an image"/>
                        <b>{ user.name }</b>
                    </a>

                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                        <Link className="dropdown-item" to="/dashboard">
                            Profile
                        </Link>
                        <a className="dropdown-item" onClick={this.onLogoutClick.bind(this)} href="">
                            Logout <i className="fas fa-sign-out-alt pl-2"></i>
                        </a>
                    </div>
                    </div>
                </li>
            </ul>
    )

    

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">
                    Sign Up
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </ul>
    )

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
            <div className="container">
            <Link className="navbar-brand brand-name" to="/dashboard">Multidoo</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item ml-2">
                    <Link className="nav-link" to="/profiles"> 
                    <i className="fas fa-user-astronaut pr-2"></i>Developers
                    </Link>
                </li>
                <li className="nav-item ml-2">
                    <Link className="nav-link" to="/jobs"> 
                        <i className="fas fa-user-tie pr-2"></i>Jobs
                    </Link>
                </li>
                </ul>
                { isAuthenticated ? authLinks : guestLinks }
            </div>
            </div>
        </nav>
    )
  }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile})(withRouter(Navbar));