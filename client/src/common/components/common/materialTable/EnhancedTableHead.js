import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  tableRow: {
    width: '100%',
    display: 'table',
  }
}));

const EnhancedTableHead = ({ onSelectAllClick, numSelected, rowCount, headRows, ariaLabel }) => {
  const classes = useStyles();
  return (
    <TableHead>
      <TableRow
        classes={{ root: classes.tableRow }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': { ariaLabel } }}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            padding="none"
          >
            {row.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  headRows: PropTypes.array.isRequired,
  ariaLabel: PropTypes.string,
};

EnhancedTableHead.defaultProps = {
  ariaLabel: 'Выбрать все'
};

export default EnhancedTableHead;