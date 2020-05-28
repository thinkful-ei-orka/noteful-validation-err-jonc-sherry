import React from 'react';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';

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
    const { folders } = this.context;
    return (
      <select required onChange={(e) => this.props.folderNameOnClick(e.target.value)}>
        {this.makeFolders(folders)}
      </select>
    );
  }
}

FolderList.propTypes = {
  folderNameOnClick: PropTypes.func.isRequired,
}

export default FolderList;
