import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddBox';
import { makeStyles } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles';
import clsx from 'clsx';

import IconButton from '../IconButton';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
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

const EnhancedTableToolbar = ({ numSelected, nameTable, remove, add }) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            Выбрано {numSelected}
          </Typography>
        ) : (
          <Typography variant="h6" color="secondary">
            {nameTable}
          </Typography>
        )}
      </div>
      <div className={classes.spacer}/>
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <IconButton icon={DeleteIcon} label="Удалить" onClick={remove}/>
        ) : (
          <IconButton icon={AddIcon} label="Добавить" onClick={add}/>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  nameTable: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
};
export default EnhancedTableToolbar;