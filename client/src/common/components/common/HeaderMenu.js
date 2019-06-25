import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { white } from '../../constants/colors';
import IconButton from './IconButton';

const MenuWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

const AccountTitle = styled.div`
  height: 20px;
  width: 80px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: ${white};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const AccountIcon = styled(AccountCircle)`
  height: 44px !important;
  width: 44px !important;
  margin-right: 8px;
`;

const MainMenu = styled.div`
  display: flex;
  align-items: center;
  @media (max-width:1100px){
    display:none;
  }
`;

// todo не применяется цвет - разобраться
const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.primary.contrastText,
  }
}));

const HeaderMenu = ({ modeMenu, accountTitle, quitAccount }) => {
  const classes = useStyles();
  return (<MenuWrapper>
    {modeMenu}
    <MainMenu>
      <AccountIcon className={classes.icon}/>
      <AccountTitle>
        {accountTitle}
      </AccountTitle>
      <IconButton icon={ExitToApp} colorIcon="white" label="Выход" onClick={quitAccount}/>
    </MainMenu>
  </MenuWrapper>);
};

HeaderMenu.propTypes = {
  accountTitle: PropTypes.string.isRequired,
  quitAccount: PropTypes.func.isRequired,
  modeMenu: PropTypes.node,
};

HeaderMenu.defaultProps = {
  modeMenu: undefined,
};


export default HeaderMenu;

