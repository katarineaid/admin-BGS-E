import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  icon: props => ({
    color: props.colorIcon,
  }),
}));

/**
 Общий файл для создания кнопки с иконкой
 **/

const IconButton = ({ icon, colorIcon, label, disabled, onClick }) => {
  const classes = useStyles({ colorIcon });
  const InsertIcon = icon;
  const disable = disabled || false;
  const component = !disable ? (
    <Tooltip title={label}>
      <Button className={classes.button}
              aria-label={label}
              disabled={disabled || false}
              onClick={onClick}
      >
        <InsertIcon className={classes.icon}/>
      </Button>
    </Tooltip>) : (
    <Button className={classes.button}
            aria-label={label}
            disabled={disabled || false}
            onClick={onClick}
    >
      <InsertIcon className={classes.icon}/>
    </Button>
  )
  return component
}

IconButton.propTypes = {
  colorIcon: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

IconButton.defaultProps = {
  disabled: false,
  label: '',
  colorIcon: '',
};

export default IconButton;