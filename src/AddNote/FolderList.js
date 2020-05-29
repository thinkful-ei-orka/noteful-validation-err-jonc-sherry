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
  notes: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    modified: PropTypes.instanceOf(Date),
    folderId: PropTypes.string,
    content: PropTypes.string,
  }),
  folders: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  deleteNote: PropTypes.func,
  addFolder: PropTypes.func,
  addNote: PropTypes.func,
}

export default FolderList;
