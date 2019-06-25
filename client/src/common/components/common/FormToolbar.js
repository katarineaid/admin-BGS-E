import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Map from '@material-ui/icons/Map';
import { makeStyles } from '@material-ui/core';

import IconButton from './IconButton';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const FormToolbar = ({ nameTitle, openView }) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.title}>
        <Typography variant="h6" color="secondary">
          {nameTitle}
        </Typography>
      </div>
      <div className={classes.spacer}/>
      <div className={classes.actions}>
        <IconButton icon={Map} label="Просмотр" onClick={openView}/>
      </div>
    </Toolbar>
  );
};

FormToolbar.propTypes = {
  nameTitle: PropTypes.string.isRequired,
  openView: PropTypes.func.isRequired,
};
export default FormToolbar;