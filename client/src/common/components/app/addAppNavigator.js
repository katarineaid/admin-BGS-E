import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function addAppNavigator(ComposedComponent) {
  class Navigator extends Component {
    static propTypes = {
      children: PropTypes.node,
      history: PropTypes.objectOf(PropTypes.any).isRequired,
    };
    static defaultProps = {
      children: undefined,
    };


    constructor(props) {
      super(props);
      this.navigator = {
        goToEditor: this.goToEditor.bind(this),
        goToViewer: this.goToViewer.bind(this),
        goToLanding: this.goToLanding.bind(this),
        goToAdmin: this.goToAdmin.bind(this),
      };
    }

    goToEditor() {
      const { history } = this.props;
      history.push('/editor');
    }

    goToViewer() {
      const { history } = this.props;
      history.push('/viewer');
    }

    goToAdmin() {
      const { history } = this.props;
      history.push('/admin');
    }

    goToLanding() {
      const { history } = this.props;
      history.push('/sign_in');
    }

    render() {
      const { children, ...other } = this.props;
      return (
        <ComposedComponent
          navigator={this.navigator}
          {...other}
        >
          {children}
        </ComposedComponent>
      );
    }
  }
  return withRouter(Navigator);
}

export default addAppNavigator;
