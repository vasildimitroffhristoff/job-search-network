import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getJob } from '../../actions/jobActions'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
import isEmpty from '../../validation/is-empty'

class Job extends Component {
  componentDidMount() {
      this.props.getJob(this.props.match.params.id)
  }  
  render() {
    const { job, loading } = this.props.job
    let jobContent;
    if (job === null || loading || Object.keys(job).length === 0) {
        jobContent = <Spinner />
    } else {
        jobContent = (
            <div className="job-content">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h3 className="text-info mb-2">{ job.position }</h3>
                            <div className="mb-4">
                                {                                          
                                    job.tags[0].split(',').map((tag, index) => ( 
                                        <small key={index} className="shadow-sm border-top border-light rounded pr-3 pl-3 pt-1 pb-1 mr-1">{ tag }</small>                            
                                    ))
                                }
                            </div>
        
                            {isEmpty(job.salary) ? null : (
                                <span className="d-block text-muted">
                                    <b>
                                        <i className="fas fa-dollar-sign pr-2 text-success"></i>
                                        {job.salary}
                                    </b>
                                </span>
                            )}
                        </div>
                        <p className="text-muted">
                            <span className="d-block pb-2">
                                <i className="fas bg-white fa-user-tie rounded  p-1 mr-2 shadow-sm"></i>
                                {job.company}
                            </span>
                            <span className="d-block">
                                <i className="fas bg-white fa-globe-americas rounded  p-1 shadow-sm mr-2"></i>
                                {job.location}
                            </span>
                        </p>
                    </div>
                    <hr />
                    <div>
                        <p className="lead p-3">{job.description}</p>
                    </div>
                    <div className="pt-4 pb-4 text-center">
                        <button className="w-50 shadow-lg btn-theme-primary border-0 p-3">Apply for this Job</button>
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
    job: PropTypes.object.isRequired,
    getJob: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    job: state.job
})

export default connect(mapStateToProps, { getJob })(Job)
