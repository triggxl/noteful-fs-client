import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './NoteContext';

function DisplayFolderLinks(props) {
  return (
    <NotefulContext.Consumer>
      {(context) => {
        return(
          <div className="displayFolderLinks"> 
          {props.folders.map((folder, id) => {
            let folderProps = `/folders/${folder.id}`;
            return (
              <section key={id} className="folderBtn">
              <Link to={folderProps}>
              {folder.name}
              </Link>
              </section>
            )
          })}
          <Link to="/add-folders">
            <button className="addFolderBtn">Add Folder</button>
          </Link>
          </div>
        )
      }}
    </NotefulContext.Consumer>
  )
}

export default DisplayFolderLinks;

/*
only use dot method when you know the exact key or when file name includes _ or -'s
component tree and data flow
*/