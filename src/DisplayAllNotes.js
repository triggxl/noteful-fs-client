import React from 'react'
import NotefulContext from './NoteContext';
import { Link } from 'react-router-dom';

const DisplayAllNotes = (props) => {
  const { notes } = props;
  return (
    <NotefulContext.Consumer>
      {(context) => {
        return(
          <>
          <div className="individualNoteData">
          {notes.map((note, id)=>{
            return(
              <div key={id}>
                <h4>Name:</h4>
                {note.name}
                <h4>Last modified on:</h4>
                {note.modified}
                <Link to="/">
                  <button className="deleteNoteBtn" onClick={e => context.handleDeleteNote(e)}>Delete</button>
                </Link>
              </div>
            )
         })}
          </div>
          <Link to='/add-notes'><button className="allNotesBtn">AddNote</button></Link>
          </>
        )
      }}
    </NotefulContext.Consumer> 
  )
}

export default DisplayAllNotes;
