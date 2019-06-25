import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SidebarWrapper from '../../common/SidebarWrapper';
import NavigationList from '../sidebar/NavigationList';
import createAdminRouter from '../router/createAdminRouter';

class Menu extends Component {
  static propTypes = {
    selectItem: PropTypes.func.isRequired,
    currentItem: PropTypes.string.isRequired,
    userResources: PropTypes.arrayOf(PropTypes.object),
  };
  static defaultProps = {
    userResources: undefined,
  };

  constructor(props) {
    super(props);
    this.selectElement = this.selectElement.bind(this);
  }

  componentDidMount() {
    const { adminAction } = this.props;
    adminAction.getResources()
  }

  selectElement(id) {
    const { selectItem } = this.props;
    selectItem(id);
    console.log(id)
  }

  render() {
    const { config, currentItem, userResources } = this.props;
    return (
      <SidebarWrapper>
        <NavigationList
          elements={userResources}
          config={config}
          selectedName={currentItem}
          selectElement={this.selectElement}
        />
      </SidebarWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    config: state.account.configApp,
    userResources: state.resources.userResources,
  };
}

const MenuWithAdminRouter = createAdminRouter(Menu);

export default connect(mapStateToProps)(MenuWithAdminRouter);