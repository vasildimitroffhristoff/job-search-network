import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isEmpty from '../../validation/is-empty'

class ProfileItem extends Component {
  render() {
    const { profile } = this.props

    return (
      <div className="col-md-4">
          <div className="card card-body mb-3 shadow-sm border-top border-light">
            <div className="row">
                <div className="col-md-2">
                    <img className="rounded-circle" src={profile.user.avatar} alt="" />
                </div>
                <div className="profiles-info col-lg-10 col-md-9 col-9">
                    <h4 className="mb-0">{profile.user.name}</h4>
                    <small className="text-muted">
                        {profile.status} {isEmpty(profile.company) ? null : (<b className="text-dark">at {profile.company}</b>)}
                    </small>
                    <p>
                        {isEmpty(profile.location) ? null : (<small className="text-muted font-italic"><i className="fas fa-globe-africa pr-1"></i>{profile.location}</small>) }
                    </p>
                    
                </div>
        
                <div className="col-md-12 d-none d-md-block mb-3 bg-light pt-3 pb-3">
                    <h6 className="font-weight-bold text-muted">Skill set</h6>
                        <div>
                            {profile.skills.slice(0,4).map((skill, index) => (
                                <small className="mr-2" key={index} >
                                    <i className="fas fa-check"></i> 
                                    {skill}
                                </small>
                            ))}
                        </div>
                </div>
                <div className="col-md-12">
                    <Link to={`/profile/${profile.handle}`} className="btn btn-theme-primary">
                        View profile
                    </Link>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
