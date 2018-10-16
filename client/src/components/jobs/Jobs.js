import React, { Component } from 'react'
import { connect } from 'react-redux';
import JobItem from './JobItem'
import PropTypes from 'prop-types'
import { getJobs } from '../../actions/jobActions'
import Spinner from '../common/Spinner'

class Jobs extends Component {
  componentDidMount() {
      this.props.getJobs()
  }
  render() {
    const { loading, jobs } = this.props.job
    let  jobsContent;
    if (jobs === null || loading) {
        jobsContent = (
            <div className="col-md-12">
                <Spinner />
            </div>
        )
    } else {
        if (jobs.length > 0) {
            jobsContent = jobs.map(job => (
                <JobItem key={job.id} job={job} />
            ))
        } else {
            jobsContent = <h4>No jobs found.</h4>
        }
    }
    return (
        <div className="jobs">
            <div className="container">
                { jobsContent }
            </div>
        </div>
    )
  }
}

Jobs.propTypes = {
    getJobs: PropTypes.func.isRequired,
    job: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    job: state.job
})

export default connect(mapStateToProps, { getJobs })(Jobs)