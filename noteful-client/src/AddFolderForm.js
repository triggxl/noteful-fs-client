import React, { Component } from 'react';
import FormValidationErrors from './FormValidationErrors';
import PropTypes from 'prop-types';
import NotefulContext from './NoteContext';
import { Link, withRouter } from 'react-router-dom';

class AddFolderForm extends Component {
  static contextType = NotefulContext;
  constructor(props) {
    super(props);
    this.state = {
      folderName : {
        value: '',
        touched: false
      }
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.context.handleAddFolder(e);
    this.props.history.push('/'); //withRouter
  }
  updateName = (userEntry) => {
    this.setState({ 
      folderName: {
        value: userEntry,
        touched: true
      }
    });
  } 
  validateName = () => {
    const name = this.state.folderName.value;
    if(name.length === 0) {
      return 'Folder name is required';
    }
  }
 
  render() {
    return(
      <NotefulContext.Consumer>
       { (context)=> {
          return(
            <>
            <Link to='/'>Go back</Link>
            <form className="newFolderForm" onSubmit={e => this.handleSubmit(e)}>
              <h2>Create a Folder</h2>
              <label>Name:</label>
              <input name="folderName" type="text" value={this.state.folderName.value} onChange={e => this.updateName(e.target.value)}></input> 
              {this.state.folderName.touched && ( <FormValidationErrors message={this.validateName()}/>)}
              <button className="AddNewFolderBtn">Add Folder</button>
            </form>
          </>
          )
        }}
      </NotefulContext.Consumer>
    )
  }
}

AddFolderForm.propTypes = {
  name : (props, propName, componentName) => {
    const prop = props[propName];
    if(!prop) {
      return new Error(`${propName} is required for ${componentName}.`);
    }
  }
}

AddFolderForm.defaultProps = {
  name : PropTypes.string
}

export default withRouter(AddFolderForm);

/*
creating a controlled input...need to have a name value and onChange property attatched to each input...need to update state to hold current value of form field upon input
value attribute = what you're using to store the value at that time ex: this.state.[name attribute value]
onChange changes state to the current value of that input
state prop used needs to match name attribute value
dynamic onChange for multiple controlled inputs needs to know which input is being changed passing the name property
write out comments first and then write out the code so you can explain what you're trying to do what they are how they function
*/
