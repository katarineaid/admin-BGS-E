import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import addAdminActions from '../actions/addAdminActions';
import ContentWrapper from '../../common/ContentWrapper';
import ContentWrapperBody from '../../common/ContentWrapperBody';
import EnhancedTable from '../../common/materialTable/EnhancedTable';

class LocalSource extends Component {
  static propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
    adminAction: PropTypes.shape({
      addWorkspace: PropTypes.func,
      deleteWorkspaces: PropTypes.func,
      getWorkspacesList: PropTypes.func,
      getWorkspace: PropTypes.func
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.deleteFunc = this.deleteFunc.bind(this);
    this.selectedToEdit = this.selectedToEdit.bind(this);
    this.addFunc = this.addFunc.bind(this);
  }

  componentDidMount() {
    const { adminAction } = this.props;
    adminAction.getWorkspacesList();
  }

  deleteFunc(selected) {
    const { adminAction } = this.props;
    adminAction.deleteWorkspaces(selected);
  }

  selectedToEdit(event, rowName) {
    const { history } = this.props;
    const rootPath = '/admin';
    history.push(`${rootPath}/${rowName}`);
  }

  addFunc() {
    const { adminAction } = this.props;
    adminAction.addWorkspace();
  }


  render() {
    const headRows = [
      { id: 'name', label: 'Название' }
    ];

    const { workspaces: rows } = this.props;

    return (
      <ContentWrapper>
        <ContentWrapperBody>
          <EnhancedTable
            rows={rows}
            headRows={headRows}
            deleteFunc={this.deleteFunc}
            selectedToEdit={this.selectedToEdit}
            addFunc={this.addFunc}
            nameTable="Рабочие области"
          />
        </ContentWrapperBody>
      </ContentWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    workspaces: state.workspace.workspaces,
  };
}

const LocalSourceWithAdminActions = addAdminActions(LocalSource);

export default connect(mapStateToProps)(LocalSourceWithAdminActions);