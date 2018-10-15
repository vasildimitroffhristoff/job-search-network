import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="display-4 mt-4"><b className="brand-name">Multidoo</b> Is A Never Ending Story.
                        </h1>
                        <p className="lead"> Create a developer profile/portfolio, share posts and get help from other developers</p>
                    
                        <div>
                            <Link to="/register" className="landing-btn landing-btn__signup">Sign Up</Link>
                            <Link to="/login" className="landing-btn landing-btn__login">Login</Link>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
