import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import ValidationError from '../ValidationError';
import './AddFolder.css';
import PropTypes from 'prop-types';

class AddFolder extends React.Component {
  state = {
    name: '',
    touched: false,
  }
  static contextType = ApiContext;

  validateFolderName = () => {
    let folderName = this.state.name.trim();
    if (folderName.length < 1) {
      return 'A name is required';
    }
  }

  setFolderName = folderName => {
    this.setState({name: folderName, touched: true})
  }

  handleAddFolder = () => {
    this.props.history.push(`/`)
  }

  handleAddFolderClick = (e) => {
    e.preventDefault()
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"name" : this.state.name})
    })
    .then(res => {
      if(!res.ok) {
        res.json().then(e => Promise.reject(e))
      } return res.json()
    })
    .then(data => {
      this.context.addFolder(data);
      this.handleAddFolder();
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const folderError = this.validateFolderName();
    return (
      <form onSubmit={(e) => this.handleAddFolderClick(e)}>
        <label htmlFor="add-folder">Add Folder</label>
        <input name="add-folder" id="add-folder" value={this.state.name} type="text" placeholder="Folder Name" onChange={e => this.setFolderName(e.target.value)} />
        {this.state.touched && <p className="error"><ValidationError message={folderError} /> </p>}
        <button
          type="submit"
          className="add_folder_button"
          disabled={
            this.validateFolderName()
          }>
            Add Folder
          </button>
      </form>
    )
  }

}

AddFolder.propTypes = {
  folderName: PropTypes.string,
}

export default AddFolder