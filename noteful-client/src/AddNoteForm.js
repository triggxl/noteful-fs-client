import React from "react";
import FormValidationErrors from "./FormValidationErrors";
import PropTypes from "prop-types";
import NotefulContext from "./NoteContext";
import { Link, withRouter } from "react-router-dom";
import { getSelectedFolder } from "./util";

class AddNoteForm extends React.Component {
  static contextType = NotefulContext;
  constructor(props) {
    super(props);
    this.state = {
      noteName: {
        value: "",
        touched: false,
      },
      noteContent: {
        value: "",
        touched: false,
      },
      folderOptions: {
        value: "",
        touched: false,
      },
    };
    this.folderNameRef = React.createRef();
  }
  handleSubmit(e) {
    e.preventDefault();
    const selectedFolder = getSelectedFolder(this.context.folders, this.state.folderOptions.value)
    // debugger;
    this.context.handleAddNote(e, this.state.noteName.value, this.state.noteContent.value, selectedFolder.id)
    this.props.history.push("/");
  }
  updateNoteName(noteName) {
    this.setState({
      noteName: {
        value: noteName,
        touched: true,
      },
    });
  }
  updateNoteContent(noteContent) {
    this.setState({
      noteContent: {
        value: noteContent,
        touched: true,
      },
    });
  }

  //not working
  // () => {
  //   if(this.state.tooShort) {
  //     this.tooShort.current.focus
  //   }
  // }
  updateFolderName(folderOptions) {
    this.setState({
      folderOptions: {
        value: folderOptions
      }
    });
  }
  validateNoteName() {
    const note = this.state.noteName.value;
    if (note.length === 0) {
      return "Note name is required";
    } else if (note.length < 3) {
      return "Must be at least 3 characters";
    }
  }
  validateNoteContent() {
    const noteContent = this.state.noteContent.value;
    if (noteContent === '') {
      return "Note must contain some content";
    }
  }
  // using a specific library that isn't designed for React to get access to a native element
  componentDidMount() {
    this.folderNameRef.current.focus();
  }
  render() {
    console.log(this.state.noteContent)
    return (
      <NotefulContext.Consumer>
        {(context) => {
          return (
            <>
              <Link to="/">Go back</Link>
              <form
                className="newNoteForm"
                onSubmit={(e) => this.handleSubmit(e)}
              >
                <h2>Create a Note</h2>
                <label>Name:</label>
                <input
                  ref={this.folderNameRef}
                  name="noteName"
                  type="text"
                  value={this.state.noteName.value}
                  onChange={(e) => this.updateNoteName(e.target.value)}
                ></input>
                {this.state.noteName.touched && (
                  <FormValidationErrors message={this.validateNoteName()} />
                )}
                <label>Content:</label>
                <input
                  type="text"
                  name="nameDescription"
                  id="nameDescription"
                  aria-required="true"
                  aria-describedby="nameDescription"
                  aria-label="Enter note description"
                  ref={this.tooShort}
                  value={this.state.noteContent.value}
                  onChange={(e) => this.updateNoteContent(e.target.value)}
                  aria-invalid={this.tooShort}
                ></input>
                {this.state.noteContent.touched && (
                  <FormValidationErrors message={this.validateNoteContent()} />
                )}
                <label>Folder:</label>
                <select
                  name="noteFolder"
                  value={this.state.folderOptions.value}
                  onChange={(e) => this.updateFolderName(e.target.value)}
                >
                {context.folders.map((folder)=> <option>{folder.name}</option>)}
                </select>
                {this.state.touched && (
                  <FormValidationErrors message={this.validateNoteName()} />
                )}
                {/* play with CSS in the DOM cut/paste elements to rearrange */}
                <button 
                type="submit" 
                className="AddNewNoteBtn"
                //upon focus, upon typing and deleting  
                disabled={this.validateNoteName() || this.validateNoteContent()}>Add Note</button>
              </form>
            </>
          );
        }}
      </NotefulContext.Consumer>
    );
  }
}
AddNoteForm.propTypes = {
  note: (props, propName, componentName) => {
    const prop = props[propName];
    if (!prop) {
      return new Error(`${propName} is required for ${componentName}.`);
    }
  },
};
AddNoteForm.defaultProps = {
  noteName: PropTypes.string.isRequired,
  noteContent: PropTypes.isRequired
};

export default withRouter(AddNoteForm);

