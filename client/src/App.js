import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions';
import store from './store'

import PrivateRoute from './components/common/PrivateRoute'
import CreateProfile from './components/create-profile/CreateProfile'
import EditProfile from './components/edit-profile/EditProfile'
import AddExperience from './components/add-credential/AddExperience'
import AddEducation from './components/add-credential/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Jobs from './components/jobs/Jobs'
import Job from './components/job/Job'
import JobPost from './components/job-post/JobPost'
import SuccessfulApplication from './components/success-application/SuccessfulApplication'
import Messages from './components/messages/Messages'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/landingPage/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import NotFound from './components/not-found/NotFound'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import Dashboard from './components/dashboard/dashboard'

import './App.css';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))
  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    store.dispatch(clearCurrentProfile())
    window.location.href = '/'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router>
            <div className="App">
                <Navbar />
                <Route exact path="/" component={Landing} />
                <div className="container">
                    <Route exact path="/register" component={Register} />  
                    <Route exact path="/login" component={Login} />  
                    <Route exact path="/profiles" component={Profiles} />   
                    <Route exact path="/profile/:handle" component={Profile} />   
                    <Route exact path="/jobs" component={Jobs} />   
                    <Route exact path="/jobs/:id" component={Job} />   

                    <Switch>
                      <PrivateRoute exact path="/dashboard" component={Dashboard} />  
                    </Switch>
                    <Switch>
                      <PrivateRoute exact path="/create-profile" component={CreateProfile} />  
                    </Switch>
                    <Switch>
                      <PrivateRoute exact path="/edit-profile" component={EditProfile} />  
                    </Switch>
                    <Switch>
                      <PrivateRoute exact path="/add-experience" component={AddExperience} />  
                    </Switch>
                    <Switch>
                      <PrivateRoute exact path="/add-education" component={AddEducation} />  
                    </Switch>
                    <Switch>
                      <PrivateRoute exact path="/feed" component={Posts} />  
                    </Switch>
                    <Switch>
                      <PrivateRoute exact path="/post/:id" component={Post} />  
                    </Switch>
                    <Switch>
                      <PrivateRoute exact path="/job-post" component={JobPost} />  
                    </Switch>
                    <Switch>
                      <PrivateRoute exact path="/successful-application/:id" component={SuccessfulApplication} />  
                    </Switch>
                    <Switch>
                      <PrivateRoute exact path="/messages" component={Messages} />  
                    </Switch>

                    
                    <Route exact path="/not-found" component={NotFound} />   
                </div>
                <Footer />
              </div>
          </Router>
      </Provider>
    );
  }
}

export default App;
