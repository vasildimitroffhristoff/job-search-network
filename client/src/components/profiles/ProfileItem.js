import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isEmpty from '../../validation/is-empty'

class ProfileItem extends Component {
  render() {
    const { profile } = this.props

    return (
      <div className="col-md-4">
          <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-3">
                    <img className="rounded-circle" src={profile.user.avatar} alt="" />
                </div>
                <div className="col-lg-9 col-md-9 col-9">
                    <h4>{profile.user.name}</h4>
                    <small>
                        {profile.status} {isEmpty(profile.company) ? null : (<b>at {profile.company}</b>)}
                    </small>
                    <p>
                        {isEmpty(profile.location) ? null : (<small><i class="fas fa-globe-africa pr-1"></i>{profile.location}</small>) }
                    </p>
                    
                </div>
                <div className="col-md-12 d-none d-md-block mb-3">
                    <h5>Skill set</h5>
                        <div>
                            {profile.skills.slice(0,4).map((skill, index) => (
                                <small className="mr-2" key={index} >
                                    <i className="fas fa-check"></i> 
                                    {skill}
                                </small>
                            ))}
                        </div>
                <hr />
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
