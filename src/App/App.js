import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import ApiContext from '../ApiContext';
import config from '../config';
import NotefulError from '../NotefulError';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  handleAddFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, { id: folder.id, name: folder.name }],
    });
  };
  handleAddNote = (newNote) => {
    const newNoteList = [
      {
        ...this.state.notes,
      },
      newNote,
    ];
    this.setState({
      notes: newNoteList,
    });
  };

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path='/note/:noteId' component={NotePageNav} />
        <Route path='/add-folder' component={NotePageNav} />
        <Route path='/add-note' component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path='/note/:noteId' component={NotePageMain} />
        <Route path='/add-folder' component={AddFolder} />
        <Route path='/add-note' component={AddNote} />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
    };
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <NotefulError>
            <nav className='App__nav'>{this.renderNavRoutes()}</nav>
          </NotefulError>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>{' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <NotefulError>
            <main className='App__main'>{this.renderMainRoutes()}</main>
          </NotefulError>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
