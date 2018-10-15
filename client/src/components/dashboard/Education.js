import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions'

class Education extends Component {

  onDeleteClick(id) {
      this.props.deleteEducation(id)
  }  
  render() {
    const education = this.props.education.map(edu => (
        <tr key={edu.id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD" >{edu.from}</Moment> -
                {edu.to === null ? ('Now') : <Moment format="YYYY/MM/DD" >{edu.to}</Moment> }               
            </td>
            <td>
                <button className="btn btn-danger" onClick={this.onDeleteClick.bind(this, edu.id)}>Delete</button>
            </td>
        </tr>
    ))
    
    return (
      <div>
          <h5 className="mb-2">Education Credentials</h5>
          {this.props.education.length > 0 ? (
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
                  {education}
              </tbody>
            </table>
          ) : (<small className="text-muted d-block"><hr/>You have not added <b>education data</b> to your profile yet.</small>)}
      </div>
    )
  }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)