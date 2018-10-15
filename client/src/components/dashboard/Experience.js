import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions'

class Experience extends Component {

  onDeleteClick(id) {
      this.props.deleteExperience(id)
  }  
  render() {
    const experience = this.props.experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD" >{exp.from}</Moment> -
                {exp.to === null ? ('Now') : <Moment format="YYYY/MM/DD" >{exp.to}</Moment> }               
            </td>
            <td>
                <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this, exp.id)}>Delete</button>
            </td>
        </tr>
    ))
    return (
      <div>
          <h5 className="mb-2">Experience Credentials</h5>
          {this.props.experience.length > 0 ? (
              <table className="table">
              <thead className="thead-light">
                  <tr>
                      <th>Company</th>
                      <th>Title</th>
                      <th>Years</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
                  {experience}
              </tbody>
            </table>
          ) : (<small className="text-muted d-block"><hr/>You have not added <b>experience data</b> to your profile yet.</small>) }
      </div>
    )
  }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, {deleteExperience})(Experience)