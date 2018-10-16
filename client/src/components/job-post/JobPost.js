import React, { Component } from 'react'
import TextFieldGroup from '../common/TextFieldGroup'
import RichTextEditor from 'react-rte'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addJob } from '../../actions/jobActions'
import { withRouter } from 'react-router-dom'

class JobPost extends Component {
  constructor(props) {
      super(props)

      this.state = {
        company: '',
        position: '',
        location: '',
        tags: '',
        salary: '',
        description: RichTextEditor.createEmptyValue(),
        errors: {}
      }

      this.onChange = this.onChange.bind(this)
      this.onEditorChange = this.onEditorChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
      
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const jobData = { 
            company: this.state.company, 
            position: this.state.position, 
            location: this.state.location, 
            tags: this.state.tags, 
            salary: this.state.salary, 
            description: 'Even though using "lorem ipsum" often arouses curiosity due to its resemblance to classical Latin, it is not intended to have meaning. Where text is visible in a document, people tend to focus on the textual content rather than upon overall presentation.' 
        }
        this.props.addJob(jobData, this.props.history)
    }

    onEditorChange = (value) => {
        this.setState({description: value});
        if (this.props.onEditorChange) {
       
          this.props.onEditorChange(
            value.toString('html')
          );
        }
      };

  render() {
    const { errors } = this.state 
    return (
      <div className="job-post">
         <div className="contaier">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Create New Job</h1>
                    <p className="lead text-center">
                        Let's get some information to make your <b>Job post</b>  stand out
                    </p>
                    <small className="d-block pb-3">* = required fields</small>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup 
                                placeholder="* Company name"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                                info="Enter your company/organization name"
                            />
                        <TextFieldGroup 
                                placeholder="* Position"
                                name="position"
                                value={this.state.position}
                                onChange={this.onChange}
                                error={errors.position}
                                info="Enter the name of the position of which candidates should apply"
                            />
                        <TextFieldGroup 
                                placeholder="* Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                                info="Enter the location of the job"
                            />   
                        <TextFieldGroup
                            placeholder="* Tags"
                            name="tags"
                            value={this.state.tags}
                            onChange={this.onChange}
                            error={errors.tags}
                            info="Please use comma separated values (eg.
                                .NET, SASS, Webpack, Linux)"
                            />   
                        <TextFieldGroup 
                                placeholder="Salary"
                                name="salary"
                                value={this.state.salary}
                                onChange={this.onChange}
                                error={errors.salary}
                                info="Enter the salary range of the job"
                            />  
                        <div className="form-group">
                           <RichTextEditor
                           value={this.state.description}
                           onChange={this.onEditorChange}/>
                           <small className="form-text text-muted">Enter some desription text for your job.</small>
                        </div>
                        <input type="submit" value="Submit" className="btn btn-theme-primary btn-block mt-4" />            
                    </form>
                </div>
            </div>
         </div>
      </div>
    )
  }
}

JobPost.propTypes = {
    addJob: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { addJob })(withRouter(JobPost)) 