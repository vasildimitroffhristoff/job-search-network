import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Landing extends Component {

  componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dasboard')
        }
  }
  render() {
    return (
       <div>
            <div className="landing">
            <div className="dark-overlay landing-inner text-light">
            <div className="container">
                <div className="row">
                <div className="col-md-12 text-center">
                    <h1 className="display-3 mb-4">Developer Connector
                    </h1>
                    <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                    <hr />
                    <Link to="/register" className="landing-btn landing-btn__signup">Sign Up</Link>
                    <Link to="/login" className="landing-btn landing-btn__login">Login</Link>
                </div>
                </div>
            </div>
            </div>
        </div>

        <section className="features-icons text-center">
        <div className="container">
        <div className="row">
            <div className="col-lg-4">
            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex mb-3">
                <i className="fas fa-globe-americas m-auto text-primary"></i>
                </div>
                <h3>Fully Responsive</h3>
                <p className="lead mb-0">This theme will look great on any device, no matter the size!</p>
            </div>
            </div>
            <div className="col-lg-4">
            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex mb-3">
                <i className="fab fa-connectdevelop m-auto text-primary"></i>
                </div>
                <h3>Bootstrap 4 Ready</h3>
                <p className="lead mb-0">Featuring the latest build of the new Bootstrap 4 framework!</p>
            </div>
            </div>
            <div className="col-lg-4">
            <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                <div className="features-icons-icon d-flex mb-3">
                <i className="fas fa-user-astronaut  m-auto text-primary"></i>
                </div>
                <h3>Easy to Use</h3>
                <p className="lead mb-0">Ready to use with your own content, or customize the source files!</p>
            </div>
            </div>
        </div>
        </div>
        </section>
       </div>
    )
  }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing)
