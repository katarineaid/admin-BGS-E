import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import addAdminActions from '../actions/addAdminActions';
import ContentWrapper from '../../common/ContentWrapper';
import ContentWrapperBody from '../../common/ContentWrapperBody';
import PluginsForm from './PluginsForm';

class Plugins extends Component {
  static propTypes = {
    adminAction: PropTypes.shape({
      getPlugins: PropTypes.func,
      updatePlugins: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.agreeAction = this.agreeAction.bind(this);
  }

  componentDidMount() {
    const { adminAction } = this.props;
    adminAction.getPlugins();
  }

  static getInitialValues(userPlugins) {
    if (!userPlugins) {
      return {
        esri: false,
        wfs: false,
        wms: false,
        wmts: false,
      }
    }
    return userPlugins
  }

  agreeAction() {
    const { adminAction, plugins } = this.props;
    console.log(plugins);
    adminAction.updatePlugins(plugins);
  }

  render() {
    const { userPlugins } = this.props;
    const initialValues = Plugins.getInitialValues(userPlugins);
    return (
      <ContentWrapper>
        <ContentWrapperBody>
          <PluginsForm
            save={this.agreeAction}
            initialValues={initialValues}
          />
        </ContentWrapperBody>
      </ContentWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    plugins: getFormValues('plugins')(state),
    userPlugins: state.resources.userPlugins,
  };
}

const PluginsPageWithAdminActions = addAdminActions(Plugins);

export default connect(mapStateToProps)(PluginsPageWithAdminActions);