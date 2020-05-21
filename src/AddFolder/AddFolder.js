import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import './AddFolder.css';

class AddFolder extends React.Component {
  state = {
    name: ''
  }
  static contextType = ApiContext;

  setFolderName = folderName => {
    console.log('setFolderName called');
    this.setState({name: folderName})
  }

  handleAddFolder = () => {
    console.log('handleAddFolder called')
    this.props.history.push(`/`)
  }

  handleAddFolderClick = (e) => {
    console.log(this.state.name)
    e.preventDefault()
    console.log(e)
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"name" : this.state.name})
    })
    .then(res => {
      console.log(res)
      if(!res.ok) {
        res.json().then(e => Promise.reject(e))
      } return res.json()
    })
    .then(data => {
      console.log(data)
      this.context.addFolder(data);
      this.handleAddFolder();
    })
    .catch(err => {
      console.log('got caught')
      console.log(err);
    })
    console.log()
  }

  render() {
    console.log(this.state)
    //const [ addFolder ] = this.context;
    console.log('rendered boy')
    return (
      <form onSubmit={(e) => this.handleAddFolderClick(e)}>
        <label htmlFor="add-folder">Add Folder</label>
        <input name="add-folder" id="add-folder" value={this.state.name} type="text" placeholder="Folder Name" onChange={e => this.setFolderName(e.target.value)} />
        <button>Add Folder</button>
      </form>
    )
  }

}

export default AddFolder