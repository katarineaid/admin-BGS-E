import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import workspaceFunc from '../../../store/workspace/workspaceActions';
import resourcesFunc from '../../../store/resources/resourcesActions';
import sourceFunc from '../../../store/source/sourceActions';

function addAdminActions(ComposedComponent) {
  class AdminActions extends Component {
    static propTypes = {
      children: PropTypes.node,
      userId: PropTypes.string,
      selectedWorkspaceName: PropTypes.string,
      workspaceAction: PropTypes.objectOf(PropTypes.func).isRequired,
    };
    static defaultProps = {
      children: undefined,
      userId: '',
      selectedWorkspaceName: ''
    };

    constructor(props) {
      super(props);
      this.adminAction = {
        getResources: this.getResources.bind(this),
        getPlugins: this.getPlugins.bind(this),
        updatePlugins: this.updatePlugins.bind(this),
        addWorkspace: this.addWorkspace.bind(this),
        deleteWorkspaces: this.deleteWorkspaces.bind(this),
        getWorkspacesList: this.getWorkspacesList.bind(this),
        getWorkspace: this.getWorkspace.bind(this),
        updateWorkspace: this.updateWorkspace.bind(this),
        addSource: this.addSource.bind(this),
        deleteSource: this.deleteSource.bind(this),
        getSource: this.getSource.bind(this),
        updateSource: this.updateSource.bind(this),
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.userId !== this.props.userId) {
        this.getResources();
      }
    }

    getResources() {
      const { resourcesAction, userId } = this.props;
      resourcesAction.getResources(userId);
    }

    getPlugins() {
      const { resourcesAction, userId } = this.props;
      resourcesAction.getPlugins(userId);
    }

    updatePlugins(updatedPlugins) {
      const { resourcesAction, userId } = this.props;
      resourcesAction.updatePlugins(userId, updatedPlugins);
    }

    addWorkspace() {
      const { workspaceAction, userId } = this.props;
      workspaceAction.addWorkspace(userId).then((data) => {
        this.getResources();
        this.getWorkspacesList();
      })
    }

    deleteWorkspaces(workspaces) {
      const { workspaceAction, userId } = this.props;
      workspaceAction.deleteWorkspaces(userId, workspaces).then((data) => {
        this.getResources();
        this.getWorkspacesList();
      })
    }

    getWorkspacesList() {
      const { workspaceAction, userId } = this.props;
      workspaceAction.getWorkspacesList(userId);
    }

    getWorkspace(workspaceName) {
      const { workspaceAction, userId } = this.props;
      workspaceAction.getWorkspace(userId, workspaceName);
    }

    updateWorkspace(updatedWorkspace) {
      const { workspaceAction, userId } = this.props;
      workspaceAction.updateWorkspace(userId, updatedWorkspace).then((data) => {
        this.getResources();
      });
    }

    addSource() {
      const { sourceAction, userId, selectedWorkspaceName } = this.props;
      sourceAction.addSource(userId, selectedWorkspaceName).then((data) => {
        this.getWorkspace(selectedWorkspaceName);
      })
    }

    deleteSource(sources) {
      const { sourceAction, userId, selectedWorkspaceName } = this.props;
      sourceAction.deleteSources(userId, sources, selectedWorkspaceName).then((data) => {
        this.getWorkspace(selectedWorkspaceName);
      })
    }

    getSource(sourceName) {
      const { sourceAction, userId } = this.props;
      sourceAction.getSource(userId, sourceName);
    }

    updateSource(updatedSource) {
      const { sourceAction, userId } = this.props;
      const { workspaceName } = updatedSource;
      sourceAction.updateSource(userId, updatedSource, workspaceName).then((data) => {
        this.getWorkspace(workspaceName);
      });
    }

    render() {
      const { children, ...other } = this.props;
      return (
        <ComposedComponent
          adminAction={this.adminAction}
          {...other}
        >
          {children}
        </ComposedComponent>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      userId: state.account.userId,
      selectedWorkspaceName: state.workspace.selectedWorkspaceName,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      workspaceAction: bindActionCreators(workspaceFunc, dispatch),
      resourcesAction: bindActionCreators(resourcesFunc, dispatch),
      sourceAction: bindActionCreators(sourceFunc, dispatch),
    };
  }


  return connect(mapStateToProps, mapDispatchToProps)(AdminActions);
}

export default addAdminActions;
