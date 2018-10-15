import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
import ProfileActions from './ProfileActions'
import Experience from './Experience'
import Education from './Education'

class Dashboard extends Component {
  componentDidMount() {
      this.props.getCurrentProfile()
  }  

  onDeleteClick() {
    this.props.deleteAccount()
  }

  render() {
    const {user} = this.props.auth
    const {profile,loading} = this.props.profile
    
    let dashboardContent

    if (profile === null || loading) {
        dashboardContent = <Spinner/>
    } else {
        if (Object.keys(profile).length > 0) {
            dashboardContent = (
                <div>
                    <h4 className="text-muted mb-4 dashboard-username">Welcome <Link to={`/profile/${profile.handle }`}><i className="fas fa-user pr-1"></i>{ user.name }</Link></h4>
                  
                    <ProfileActions />
                    <Experience experience={ profile.experience }  />
                    <Education education={ profile.education }  />                    
                    <div style={{marginBottom: "60px"}} />
                    <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
                        Delete my account
                    </button>
                </div>
            )
        } else {
            dashboardContent = (
                <div>
                    <p className="lead text-muted">Welcome { user.name }</p>
                    <p>You have not setup profile. Please add some infor</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">Create profile</Link>
                </div>
            )
        }
    }
    return (
      <div className="dashboard">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    {dashboardContent}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);