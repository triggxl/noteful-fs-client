import React from 'react';
import NotefulContext from './NoteContext';

function DisplayIndividualNoteDetails(props) {
  //specific to this component (singular) passing notes, folders (plural) through context
  const { note, folder } = props;
  return (
    <NotefulContext.Consumer>
      {({ handleDeleteNote } )=> (
        <div>
         <div className="individualNoteData">
           <h3>{folder.name}</h3>
           <h4>Name:</h4>
             {note.name}
           <h4>Last modified on:</h4>
             {note.modified}
             <br/>
             {note.content}
           <button onClick={handleDeleteNote} className="deleteNoteBtn">Delete</button>
         </div>
           <div>
           <button>Go back</button>
           </div>
       </div>
      ) 
      }
    </NotefulContext.Consumer>
  )

}

// 1. grab the folder id from the note 2. using the folder id find it on the folders array 3. display the name

export default DisplayIndividualNoteDetails;