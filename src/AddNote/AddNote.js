import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import ValidationError from '../ValidationError';
import FolderList from './FolderList';
import './AddNote.css';
import PropTypes from 'prop-types';

class AddNote extends React.Component {
  state = {
    name: '',
    content: '',
    folderName: '',
  };
  static defaultProps = {
    folderName: 'b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1',
  };
  static contextType = ApiContext;

  validateNote = () => {
    let noteName = this.state.name.trim();
    let noteContent = this.state.content.trim();
    if (noteName.length < 1 || noteContent.length < 1) {
      return 'Please fill all boxes';
    }
  }

  folderNameOnClick = (name) => {
    this.setState({
      folderName: name,
    });
  };

  setName = (newName) => {
    this.setState({ name: newName });
  };

  setContent = (newContent) => {
    this.setState({ content: newContent });
  };


  handleAddNote = () => {
    this.props.history.history(`/`);
  }

  handleNoteRefresh = () => {
    this.props.history.push(`/`);
  };

  handleAddNoteClick = (e) => {
    e.preventDefault();
    this.folderNameOnClick();
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        content: this.state.content,
        folderId: this.state.folderName,
        modified: new Date(),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .then((data) => {
        this.context.addNote(data);
        this.handleNoteRefresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const noteError = this.validateNote();
    return (
      <form onSubmit={(e) => this.handleAddNoteClick(e)}>
        <fieldset className='add-note-form'>
          <legend>Add New Note</legend>
          <label htmlFor='note-name'>Note Name</label>
          <input
            type='text'
            name='note-name'
            id='note-name'
            placeholder='Note Name'
            value={this.state.name}
            onChange={(e) => this.setName(e.target.value)}
          />
          <label htmlFor='note-content'>Note Content</label>
          <textarea
            name='note-content'
            id='note-content'
            placeholder='Content'
            defaultValue={this.state.content}
            onChange={(e) => this.setContent(e.target.value)}
          />
          <FolderList folderNameOnClick={this.folderNameOnClick} />
          <ValidationError message={noteError}/>
          <button
            type="submit"
            className="add_note"
            disabled={
              this.validateNote()
            }>
            Add Note
          </button>
        </fieldset>
      </form>
    );
  }
}

AddNote.propTypes = {
  folderName: PropTypes.string.isRequired,
  notes: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.instanceOf(Date).isRequired,
    folderId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  folders: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  deleteNote: PropTypes.func,
  addFolder: PropTypes.func,
  addNote: PropTypes.func,
}

export default AddNote;
