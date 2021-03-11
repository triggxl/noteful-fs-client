import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NoteContext';
import { getSelectedFolder } from './util';

const DisplaySelectedFolderNotes = (props) => {
  return (
    <NotefulContext.Consumer>
      {(context)=>{
        const selectedFolder = getSelectedFolder(context.folders, props.folderId)        
        const arrayOfNotes = context.notes.filter((note)=> note.folderId === props.folderId);
        return(
          <div key={context.folderId}>
          <h3 className="">{selectedFolder.name}</h3>
          {/* displaying notes from selected folder */}
          {arrayOfNotes.map((note)=>
            <div className="" key={note.id}>
              <Link to={`/notes/${note.id}`}>
              {note.name}
              </Link>
              {note.modified}
            </div>
            )}
            <Link to="/">
              <button>Go back</button>
            </Link>
        </div>
        )
      }}
    </NotefulContext.Consumer>
  )
}

export default DisplaySelectedFolderNotes;

//Concepts: setting up routes and using routeProps to grab information from the URL use in the component that you want to render
//create a filteredFolders variable (above) and then map through those folder to output data in that in JSX ex: <h3>
//1. grab folderId from URL from routeProps...2. filter over note array using id that you grab...3. map through filtered notes and display them
