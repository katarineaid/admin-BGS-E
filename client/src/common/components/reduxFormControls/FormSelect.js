import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
  },
}));

const FormSelect = ({
                      input,
                      label,
                      meta: { touched, error, warning },
                      children,
                      values,
                      ...custom
                    }) => {
  const flagError = !!error;
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl} error={flagError}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        {...input}
        onChange={(event) => input.onChange(event.target.value)}
        {...custom}
      >
        {
          values.map(valueItem =>
            (<MenuItem
              key={valueItem.value}
              value={valueItem.value}
              disabled={valueItem.disabled || false}>
              {valueItem.name}
            </MenuItem>))
        }
      </Select>
      {flagError ? <FormHelperText>{touched && error}</FormHelperText> : null}
    </FormControl>);
};


FormSelect.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.node,
  meta: PropTypes.shape({ touched: PropTypes.any, error: PropTypes.string }),
};

FormSelect.defaultProps = {
  input: undefined,
  label: undefined,
  meta: { toched: undefined, error: undefined },
};

export default FormSelect;
