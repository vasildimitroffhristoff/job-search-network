import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Features extends Component {
  render() {
    return (
        <section className="features-icons text-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                        <div className="features-icons-icon d-flex mb-3">
                        <i className="fas fa-globe-americas m-auto text-primary"></i>
                        </div>
                        <h3 className="text-muted">All Over the World</h3>
                        <p className="lead mb-0 text-muted">Am if number no up period regard sudden better.</p>
                    </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                        <div className="features-icons-icon d-flex mb-3">
                        <i className="fab fa-connectdevelop m-auto text-primary"></i>
                        </div>
                        <h3 className="text-muted">Big Network</h3>
                        <p className="lead mb-0 text-muted">Branched learning so subjects mistress do appetite jennings be in.</p>
                    </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                        <div className="features-icons-icon d-flex mb-3">
                        <i className="fas fa-user-astronaut  m-auto text-primary"></i>
                        </div>
                        <h3 className="text-muted"> Highly Professionals</h3>
                        <p className="lead mb-0 text-muted">Settled wishing ability musical may another set age.</p>
                    </div>
                    </div>
                </div>
                <div className="features-delimiter row pt-5 pb-5">
                    <div className="col-md-12">
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <i style={{ opacity: "0.1" }} className="d-block display-2 text-muted fas fa-plug mb-4"></i>
                        <h3 className="text-muted">I've Seen The Future, And It's <b className="brand-name">Multidoo</b> People-Shaped.</h3>
                        <p className="text-muted">Things work out best for those who make the best of how things work out.</p>
                        <Link to="/register" className="landing-btn landing-btn__signup">Start connecting now</Link>
                    </div>
                </div>
            </div>
        </section>
    )
  }
}
