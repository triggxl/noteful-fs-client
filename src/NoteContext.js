import React from 'react';

//1. creating default context for Noteful app
const NotefulContext = React.createContext({
  notes: [],
  folders: [],
  handledeleteNote: ()=> {},
  handleAddNote: ()=> {},
  handleAddFolder: ()=> {}
})

export default NotefulContext;

