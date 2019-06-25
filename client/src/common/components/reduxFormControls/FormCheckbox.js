import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
  },
});
const FormCheckbox = ({
                        input,
                        label,
                        meta: { touched, error, warning },
                        classes,
                        disabled,
                        ...custom
                      }) => {
  const flagError = !!error;

  return (
    <FormControl className={classes.formControl} error={flagError}>
      <FormControlLabel
        control={
          <Checkbox
            checked={input.value ? true : false}
            onChange={input.onChange}
            disabled={disabled === undefined || disabled === '' ? false : disabled}
          />
        }
        label={label}
      />
      {flagError ? <FormHelperText>{touched && error}</FormHelperText> : null}
    </FormControl>
  );
}

export default withStyles(styles)(FormCheckbox);
