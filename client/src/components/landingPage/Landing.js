import React, { Component } from 'react'
import Header from './Header'
import Features from './Features'
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
           <Header />
           <Features />
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
