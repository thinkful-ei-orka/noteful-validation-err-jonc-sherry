import React from 'react';
import ApiContext from '../ApiContext';

class FolderList extends React.Component {
  static contextType = ApiContext;

  makeFolders(folders) {
    return folders.map((folder) => (
      <option key={folder.id} value={folder.id}>
        {folder.name}
      </option>
    ));
  }

  render() {
    console.log(this.props);
    console.log(this.context);
    const { folders } = this.context;
    console.log(folders);
    return (
      <select required onChange={(e) => this.props.folderNameOnClick(e.target.value)}>
        {this.makeFolders(folders)}
      </select>
    );
  }
}

export default FolderList;
