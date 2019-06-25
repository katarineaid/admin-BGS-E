import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Input from "@material-ui/core/Input";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
  },
});

const FormMultipleSelect = ({
                              input,
                              label,
                              meta: { touched, error, warning },
                              children,
                              values,
                              classes,
                              ...custom
                            }) => {
  const flagError = !!error;

  const [arrayValues, setArrayValue] = React.useState([]);

  function handleChange(event) {
    input.onChange(event.target.value);
    setArrayValue(event.target.value);
  }

  return (
    <FormControl className={classes.formControl} error={flagError}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        label={label}
        input={<Input name={input.name}/>}
        name={input.name}
        value={arrayValues}
        onChange={handleChange}
        {...custom}
      >
        {
          values.map(valueItem =>
            (<MenuItem
              key={valueItem.value}
              value={valueItem.value}>
              {valueItem.name}
            </MenuItem>))
        }
      </Select>
      {flagError ? <FormHelperText>{touched && error}</FormHelperText> : null}
    </FormControl>);
};


FormMultipleSelect.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.node,
  meta: PropTypes.shape({ touched: PropTypes.any, error: PropTypes.string }),
};

FormMultipleSelect.defaultProps = {
  input: undefined,
  label: undefined,
  meta: { toched: undefined, error: undefined },
};

export default withStyles(styles)(FormMultipleSelect);