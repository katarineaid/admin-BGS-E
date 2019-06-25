import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import createAdminRouter from '../router/createAdminRouter';
import ContentWrapper from '../../common/ContentWrapper';
import ContentWrapperBody from '../../common/ContentWrapperBody';
import WorkspaceForm from './WorkspaceForm';
import EnhancedTable from '../../common/materialTable/EnhancedTable';

class Workspace extends Component {
  static propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
    currentItem: PropTypes.string.isRequired,
    adminAction: PropTypes.shape({
      getWorkspace: PropTypes.func,
      updateWorkspace: PropTypes.func,
      addSource: PropTypes.func,
      deleteSource: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.agreeAction = this.agreeAction.bind(this);
    this.deleteFunc = this.deleteFunc.bind(this);
    this.selectedToEdit = this.selectedToEdit.bind(this);
    this.addFunc = this.addFunc.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { adminAction, currentItem } = this.props;
    if (prevProps.currentItem !== currentItem) {
      adminAction.getWorkspace(currentItem);
    }
  }

  componentWillMount() {
    const { adminAction, currentItem } = this.props;
    adminAction.getWorkspace(currentItem);
  }

  agreeAction() {
    const { adminAction, updatedWorkspace } = this.props;
    console.log(updatedWorkspace);
    adminAction.updateWorkspace(updatedWorkspace);
  }

  static getInitialValues(selectedWorkspaceData) {
    if (!selectedWorkspaceData) {
      return {
        name: '',
        alias: '',
        url: '',
        children: []
      }
    }
    return selectedWorkspaceData
  }

  deleteFunc(selected) {
    const { adminAction } = this.props;
    adminAction.deleteSource(selected);
  }

  selectedToEdit(event, rowName) {
    const { history } = this.props;
    const rootPath = '/admin';
    history.push(`${rootPath}/${rowName}`);
    console.log(rowName)
  }

  addFunc() {
    const { adminAction } = this.props;
    adminAction.addSource();
  }

  render() {
    const headRows = [
      { id: 'name', label: 'Название' }
    ];
    let rows = [];
    const { selectedWorkspaceData } = this.props;
    if (selectedWorkspaceData) {
      rows = selectedWorkspaceData.children;
    }


    const initialValues = Workspace.getInitialValues(selectedWorkspaceData);
    return (
      <ContentWrapper>
        <ContentWrapperBody>
          <WorkspaceForm
            save={this.agreeAction}
            initialValues={initialValues}
          />
          <EnhancedTable
            rows={rows}
            headRows={headRows}
            deleteFunc={this.deleteFunc}
            selectedToEdit={this.selectedToEdit}
            addFunc={this.addFunc}
            nameTable="Источники"
          />
        </ContentWrapperBody>
      </ContentWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    updatedWorkspace: getFormValues('workspace')(state),
    selectedWorkspaceData: state.workspace.selectedWorkspaceData,
  };
}

const WorkspaceWithAdminRouter = createAdminRouter(Workspace);

export default connect(mapStateToProps)(WorkspaceWithAdminRouter);