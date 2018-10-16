import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';

class TextEditorArea extends Component {
  state = {
    value: RichTextEditor.createEmptyValue()
  }

  onEditorChange = (value) => {
    this.setState({value});
    if (this.props.onEditorChange) {
   
      this.props.onEditorChange(
        value.toString('html')
      );
    }
  };

  render () {
    return (


      <div className="form-group">
        {/* <input onChange={onChange} value={value} type={type} 
            className={classnames('form-control form-control-lg', {
            'is-invalid': error
            })}  
        placeholder={placeholder} name={name} 
        disabled={disabled}/> */}
              <RichTextEditor
        value={this.state.value}
        onChange={this.onEditorChange}
      />
        <small className="form-text text-muted">Editor</small>
    </div>
    );
  }
}

export default TextEditorArea