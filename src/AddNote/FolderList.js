import React from 'react';
import ApiContext from '../ApiContext';

class FolderList extends React.Component {

  static contextType = ApiContext;

  makeFolders(folders) {
    return folders.map((folder) => <option key={folder.id}>{folder.name}</option>)
  }

  render() {
    const { folders } = this.context;
    console.log(folders)
    return (
      <select>
        {this.makeFolders(folders)}
      </select>
    );
  }
}

export default FolderList
