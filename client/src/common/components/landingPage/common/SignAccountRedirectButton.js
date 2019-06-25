import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    width: `100%`,
    display: `flex`,
    minHeight: `45px`,
    justifyContent: `center`,
  }
}));

const SignAccountRedirectButton = ({ label, ...props }) => {
  const classes = useStyles();

  return (
    <Button color="primary" className={classes.button} disableTouchRipple {...props}>
      {label}
    </Button>)
};

export default SignAccountRedirectButton;
