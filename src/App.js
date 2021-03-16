import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import MainRoute from './HomePage';
import DisplayIndividualNoteDetails from './DisplayIndividualNoteDetails';
import DisplaySelectedFolderNotes from './DisplaySelectedFolderNotes';
import NotefulContext from './NoteContext';
// import dummyData from './dummyData';
import AddNoteForm from './AddNoteForm';
import AddFolderForm from './AddFolderForm';
import NotefulErrors from './NotefulErrors';
import { API_URL } from './config';

class App extends React.Component {
  static contextType = NotefulContext;
  state = {
    folders: [
     //attributes: ''
    ],
    notes: [
      //attributes: ''
    ]
  }
  
  handleDeleteNote = (id) => {
    const { notes } = this.state
    let index = -1;
    for(let i = 0; i < notes.length; i++) {
      if(notes[i].id === id) {
        index = i;
      }
    }
    notes.splice(index, 1); //removing (1) index variable 
    this.setState({
      notes : notes
    })
  }
  handleAddFolder = (e) => {
    e.preventDefault();
    //target the variable that holds the element where the event occured
    let folderName = e.target.elements["folderName"].value;
    let data = { name: folderName }
    fetch(`${API_URL}/folders`, {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      if(!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    }).catch(error => this.setState({ error }
    )).then(newFolder => 
    console.log(newFolder) ||
      this.setState({
      folders : [...this.state.folders, newFolder]
    }))
  }
  handleAddNote = (e, name, content, folderId ) => {
    e.preventDefault();
    let data = { 
      name: name, 
      content: content,
      folderId: folderId
    };
    fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      if(!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    }).catch(error => this.setState({ error }
    )).then((data) => {
      this.setState({
      notes : this.state.notes.concat(data)
    })})
  }
  componentDidMount() {
    fetch(`${API_URL}/folders`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => this.setState({folders: [...this.state.folders, data]}))
    fetch(`${API_URL}/notes`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => {
      this.setState({notes : data})
    })
  }
  render() {
    const { folders, notes } = this.state;
    const handleDeleteNote = this.handleDeleteNote;
    const handleAddFolder = this.handleAddFolder;
    const handleAddNote = this.handleAddNote;

    return(
      <NotefulErrors>
      <div className='App'>
        <header className="notefulHeader">
        <Link to="/">
          Noteful
        </Link>
        </header>
        <main>
          <NotefulContext.Provider value={{ folders, notes, handleDeleteNote, handleAddFolder, handleAddNote }}>
            <Switch>
              <Route 
                exact 
                path='/' 
                render={()=> 
                <MainRoute/>
              }
              />
              <Route path='/add-folders' component={AddFolderForm}/>
              <Route 
                path='/folders/:id'
                render={(routeProps)=> 
                <DisplaySelectedFolderNotes routeProps={routeProps} 
                folderId={routeProps.match.params.id}
                />}/>
              <Route path='/add-notes' component={AddNoteForm}/>
              <Route 
                path='/notes/:id' 
                render={(routeProps)=> {
                  const note = this.state.notes.find((note)=> routeProps.match.params.id === note.id);
                  if (note == null) { return <Redirect to={('/')}/>; }
                  // console.log(note, routeProps.match.params.id )
                  const folder = this.state.folders.find((folder)=> note.folderId === folder.id);
                  return <DisplayIndividualNoteDetails note={note} content={note.content} folder={folder} handleDeleteNote={this.handleDeleteNote} handleAddNote={this.handleAddNote}/> 
                  }} 
              />
            </Switch>
          </NotefulContext.Provider>
        </main>
      </div>
      </NotefulErrors>
    );
  }
}

export default App;


/*
11/12
Next Steps:
when trying to add a note, context.folders is an empty array so handleAddNote doesn't recognize need to figure out why this.context is empty here in app

Summary:
  Needed a folder name looped through existing folder name and rendered each of them as an option under our select element
  info stored in that forms state upon submission we took user info and called handleAddNote and gave it all user info passing them as args
  used context to access our folders in context to find whose name matches the name that was input. once we find that folder we grabbed the id from it
Completed:
add new note on server (currently logging to console)
add values dynamically to dropdown list

What's left: ("how do you...") 
error checking shouldn’t show immediately (when adding note)
(x) set up error boundary
(added content goes away after restarting the server)
  Additional: 
  Add Note button to bottom of notes container
  delete functionality for notes and folders

 //grabbing id within the array of notes object and storing it in index variable
      if(notes[i].id === id) {
        index = i;
      }

11/2
Steps to complete:
Organizing your React code assignment:
add two forms for POSTing new folders and new Notes to the server
add error boundaries at appropriate places in the structure
refactor the components to use PropTypes to validate the props

Steps to complete:
1. Display all folders in the main route. (You need to map through them so you need them as props)
2. When you click on a folder you need to filter the notes that belong to that folder. (You will need the folder Id for this one. The folder Id can be sent through the url and grabbed from the route props)
3. When clicking on Noteful you should link it back to the main route.
4. When clicking on a Note you should display the note's detail. (For this you will also need the noteId which will be sent in the url and grabbed from the route props)

Tips/Advice: 
Date: Subject: Steps to accomplish: "this is what I want to do, how I want to do it is..."--
-explain it in every-day language 1. know/identify the problem 2. how you wanna solve it and 3. translating it into code
setting and updating the state and passing parameters, also handlers understanding what's going on 
-think of Routes as if statements: 'if route, carry out these instructions..'
-"grab data from form event handler react" https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs
-return an empty function: ()=> {}
-make sure you have a skeleton of the DOM visual aspects first then work on functionality--value{} = what info you want globally available
-add console.log above outter most return statement
-use bracket notation when name has _ or -
To send down props to a Route you do the following:
<Route path="/path/here" render={ (routeProps) => <NameOfComponent {...routeProps} anyOtherProp={value} /> } />

Resources:
https://www.loom.com/share/536bf064e7c0451691930b37345526dd
https://reactrouter.com/web/guides/quick-start
*/
