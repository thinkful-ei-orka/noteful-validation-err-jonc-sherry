import React from 'react';
import './AddNote.css'

class AddNote extends React.Component {
  state = {
    name: '',
    content: ''
  }

  setName = newName => {
    this.setState({name: newName})
  }

  setContent = newContent => {
    this.setState({conent: newContent})
  }

  render() {
    return (
      <form>
          <fieldset className="add-note-form">
            <legend>Add New Note</legend>
            <label htmlFor="note-name">Note Name</label>
            <input type="text" name="note-name" id="note-name" placeholder="Note Name" value={this.state.name} onChange={(e) => this.setName(e.target.value)}></input>
            <label htmlFor="note-content">Note Content</label>
            <textarea name="note-content" id="note-content" placeholder="Content" defaultValue={this.state.content} onChange={(e) => this.setContent(e.target.value)} />
          </fieldset>
      </form>

    )
  }
}

export default AddNote