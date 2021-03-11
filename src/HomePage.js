import React from 'react';
import DisplayFolderLinks from './DisplayFolderLinks';
import DisplayAllNotes from './DisplayAllNotes';
import './App.css';
import NotefulContext from './NoteContext';

export default function HomePage() {
  return (
    <NotefulContext.Consumer>
      {(context) => (
        <div className="homePage">
          <section className="mainFolderStyling">
            <DisplayFolderLinks folders={context.folders}/>
          </section>
          <section className="mainNoteStyling">
            <DisplayAllNotes notes={context.notes}/>
          </section>
        </div>
      )}
    </NotefulContext.Consumer>
)
}

//upon deletion debugging, my errors have to do with how I've set up context in HomePage.js and DisplayFolderLinks 

