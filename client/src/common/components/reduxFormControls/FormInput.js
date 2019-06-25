import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
  },
});

class FormInput extends Component {

  render() {
    const {
      classes,
      input,
      label,
      rows,
      multiline,
      meta: { touched, error, warning },
      type,
      ...custom
    } = this.props;
    const flagError = error ? true : false;
    if (type === 'number') {
      const onChangeNumber = (event, value) => {
        const isNotNumber = value && isNaN(Number(value));
        if (!isNotNumber) {
          input.onChange(Number(value));
        }
      };

      const { value } = input;
      const currentValue = value && String(value);

      return (<FormControl className={classes.formControl} error={flagError}>
        <InputLabel>{label}</InputLabel>
        <Input
          {...input}
          value={currentValue}
          type="number"
          fullWidth={true}
          onChange={onChangeNumber}
          {...custom}
        />

        {flagError ? <FormHelperText>{touched && error}</FormHelperText> : null}
      </FormControl> );
    }

    return (
      <FormControl className={classes.formControl} error={flagError}>
        <InputLabel>{label}</InputLabel>
        <Input
          {...input}
          rows={rows}
          multiline={multiline}
          fullWidth={true}
          type={type}
          {...custom}
        />

        {flagError ? <FormHelperText>{touched && error}</FormHelperText> : null}
      </FormControl> );
  }
}


FormInput.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.node,
  type: PropTypes.string,
  rows: PropTypes.number,
  multiline: PropTypes.bool,
  meta: PropTypes.shape({ touched: PropTypes.any, error: PropTypes.string }),
};

FormInput.defaultProps = {
  input: undefined,
  label: undefined,
  type: 'text',
  multiline: false,
  rows: 1,
  meta: { toched: undefined, error: undefined },
};

export default withStyles(styles)(FormInput);
