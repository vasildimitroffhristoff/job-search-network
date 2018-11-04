import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SuccessfulApplication extends Component {
  render() {
    return (
        <div class="alert alert-info border-0  text-center" role="alert">
            <i className="fas fa-check pr-3"></i>Your application was successfully sent.  
            <Link className="pl-2" to={`/jobs/${this.props.match.params.id}`}><b>Go back</b> </Link> got the job description
      </div>
    )
  }
}
