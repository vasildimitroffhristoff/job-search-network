import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

export default class JobItem extends Component {
  render() {
    const calendarStrings = {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'L'
    };
    const { job } = this.props
    return (
        <div className="job-item">
            <div className="row mb-3">
                <div className="col-md-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <Link className="text-info" to={`/jobs/${job._id}`}>
                                        <b className="d-block">{ job.position }</b>
                                    </Link>
                                    <small className="text-muted">
                                        <i className="fas fa-user-tie pr-2"></i>
                                        {job.company}
                                    </small>
                                </div>
                                <div className="col">
                                    {                                          
                                        job.tags[0].split(',').map((tag, index) => ( 
                                                <small key={index} className="mt-2 d-inline-block shadow-sm font-weight-bold rounded pt-1 pb-1 pr-2 pl-2 mr-1">{tag}</small>

                                        ))
                                    }
                                </div>
                                <div className="col">
                                    <small><b className="d-block text-muted">Posted On:</b></small>
                                    <small className="text-light-green font-weight-bold"><Moment fromNow>{job.date}</Moment></small>
                                </div>
                                <div className="col text-right">
                                    <a href="#" className="btn btn-theme-primary">Apply for the job</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
