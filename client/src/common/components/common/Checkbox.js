import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
  },
}));
const MyCheckbox = ({name, id, label, value, disabled, onChange})=>{
  const classes = useStyles();
  return(
    <FormControl className={classes.formControl} >
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            id={id}
            onChange={onChange}
            checked={value ? true : false}
            disabled={disabled === undefined || disabled === '' ? false : disabled}
          />
        }
        label={label}
      />
    </FormControl>
  )
};
export default MyCheckbox