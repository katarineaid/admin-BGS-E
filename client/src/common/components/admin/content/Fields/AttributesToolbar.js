import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/AddBox';
import { makeStyles } from '@material-ui/core';
import IconButton from '../../../common/IconButton';

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

const AttributesToolbar = ({ fields, add }) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.title}>
        <Typography color="secondary" variant="subtitle1">
          Поля
        </Typography>
      </div>
      <div className={classes.spacer}/>
      <div className={classes.actions}>
        <IconButton icon={AddIcon} label="Добавить" onClick={() => {
          add({ fields })
        }}/>
      </div>
    </Toolbar>
  )
};

AttributesToolbar.propTypes = {
  fields: PropTypes.objectOf(PropTypes.any),
  add: PropTypes.func.isRequired,
};

AttributesToolbar.defaultProps = {
  fields: [],
};

export default AttributesToolbar;