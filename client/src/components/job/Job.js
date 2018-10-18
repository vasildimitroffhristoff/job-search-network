import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getJob, applyForJob } from '../../actions/jobActions'
import isEmpty from '../../validation/is-empty'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
import JobBody from './JobBody'

// CHECK IF USER IS AUTHENTICATED TO APPLY FOR JOB
// ERRORS CONDITIONAL CLASSES

class Job extends Component {
  componentDidMount() {
      this.props.getJob(this.props.match.params.id)
  }  

  onApplyForJob(id) {
      this.props.applyForJob(id, this.props.history)
  }

  render() {
    const { job, loading } = this.props.job
    let jobContent;
    if (job === null || loading || Object.keys(job).length === 0) {
        jobContent = <Spinner />
    } else {
        jobContent = (
            <div className="job-content">
                    <JobBody job={job} />
                    <div className="pt-4 pb-4 text-center">
                        <button onClick={this.onApplyForJob.bind(this, job._id)} type="button" className="w-50 shadow-lg btn-theme-primary border-0 p-3">Apply for this Job</button>
                    </div>
                </div>
        )
    }
    return (
      <div className="container pt-3">
        <div className="row">
            <div className="col-md-10 m-auto shadow pt-4  pb-4">
                { jobContent }
            </div>
        </div>
      </div>
    )
  }
}

Job.propTypes = {
    getJob: PropTypes.func.isRequired,
    applyForJob: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    job: state.job,
    auth: state.auth
})

export default connect(mapStateToProps, { getJob, applyForJob })(withRouter(Job))
