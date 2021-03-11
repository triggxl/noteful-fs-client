import React from 'react';
import NotefulContext from './NoteContext';

//2. adding context to DeleteNote Component
// not sure where to put Delete request

class DeleteNote extends React.Component {
  static contextType = NotefulContext
  
  render() {
    return(
      null
      // {NotefulContext}
      // {deleteNoteRequest}
    )
  }
} 

export default DeleteNote;