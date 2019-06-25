import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';

const DrawerBody = styled.div`
  padding: 8px 0px 0 0px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height:100%;
`;

const useStyles = makeStyles((theme, open, anchor) => ({
  containerStyle: {
    position: open ? 'relative' : 'initial',
    width: open ? 340 : 0,
    display: 'flex',
    height: 'auto',
    flexGrow: 1,
  },
  drawer: {
    width: 340,
    flexShrink: 0,
  },
  drawerPaperRight: {
    display: 'flex',
    width: 340,
    [theme.breakpoints.down(1100)]: {
      width: 400,
      height: '100%',
      paddingRight: 40
    }
  },
  drawerPaperLeft: {
    display: 'flex',
    width: 340,
  },
  toolbar: theme.mixins.toolbar,
}));

const PageSidebar = ({ children, open, anchor, variant }) => {
  const classes = useStyles();
  const style = anchor === 'left' ? classes.drawerPaperLeft : classes.drawerPaperRight;
  return (
    <Drawer
      variant={variant}
      open={open}
      anchor={anchor}
      container={classes.containerStyle}
      className={classes.drawer}
      classes={{
        paper: style,
      }}
    >
      <div className={classes.toolbar}/>
      <DrawerBody>
        {children}
      </DrawerBody>
    </Drawer>);
};

PageSidebar.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  openSecondary: PropTypes.bool,
};

PageSidebar.defaultProps = {
  children: undefined,
  open: true,
  openSecondary: false,
};
export default PageSidebar;
