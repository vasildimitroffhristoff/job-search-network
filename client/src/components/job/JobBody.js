import React, { Component } from 'react'

export default class JobBody extends Component {
  render() {
    const { job } = this.props  
    return (
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
      </div>
    )
  }
}
