import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const AdvancedLayout = styled.div`
display: flex;
align-items: center;
@media (max-width:1100px){
    display:none;
}`;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  media: {
    [theme.breakpoints.down(1100)]: {
      width: 60,
      height: '100%'
    }
  },
  toolbar: {
    padding: 0,
    margin: 0,
    [theme.breakpoints.down(1100)]: {
      width: 60,
      height: '100%'
    }
  },
  titleRole: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  }
}));


const PageHeader = ({ titleRole, menu }) => {
  const classes = useStyles();
  return (<AppBar position="fixed" className={classes.appBar} classes={{ root: classes.media }}>
    <Toolbar classes={{ root: classes.toolbar }}>
      <AdvancedLayout>
        <Typography variant="h6" color="inherit" noWrap classes={{ root: classes.titleRole }}>
          {titleRole}
        </Typography>
      </AdvancedLayout>
      {menu}
    </Toolbar>
  </AppBar>);
};

PageHeader.propTypes = {
  menu: PropTypes.node,
};

PageHeader.defaultProps = {
  editorMenu: undefined,
};


export default PageHeader;

