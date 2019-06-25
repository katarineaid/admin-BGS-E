import React from 'react';
import PropTypes from 'prop-types';

import PageMarkup from '../../common/PageMarkup';
import PageWrapper from '../../common/PageWrapper';
import PageHeader from '../../common/PageHeader';
import HeaderMenu from '../../common/HeaderMenu';
import PageSidebar from '../../common/PageSidebar';
import PageContent from '../../common/PageContent';
import SidebarRouter from '../router/SidebarRouter';
import ContentRouter from '../router/ContentRouter';


const AdminPage = ({ handleQuit, userName }) => (
  <PageMarkup>
    <PageWrapper>
      <PageHeader
        titleRole="Bariant Geoserver"
        menu={
          <HeaderMenu
            modeMenu={<div>Консоль администратора</div>}
            accountTitle={userName}
            quitAccount={handleQuit}
          />}
      />
      <PageContent>
        <PageSidebar
          anchor="left"
          variant="persistent"
          open={true}
        >
          <SidebarRouter/>
        </PageSidebar>
        <ContentRouter/>
      </PageContent>
    </PageWrapper>
  </PageMarkup>
);
AdminPage.propTypes = {
  handleQuit: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

export default AdminPage;
/*<EditorModeMenu/>*/