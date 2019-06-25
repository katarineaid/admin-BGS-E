import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableRow: {
    width: '100%',
    display: 'table',
  }
}));

export default function EnhancedTable({
                                        rows,
                                        headRows,
                                        deleteFunc,
                                        selectedToEdit,
                                        addFunc,
                                        nameTable,
                                      }) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, name) {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const remove = ()=>{
    deleteFunc(selected);
    setSelected([]);
  }

  return [
    <EnhancedTableToolbar
      key={1}
      numSelected={selected.length}
      nameTable={nameTable}
      remove={remove}
      add={addFunc}
    />,
    <Table
      key={2}
      className={classes.table}
      aria-labelledby="tableTitle"
    >
      <EnhancedTableHead
        numSelected={selected.length}
        onSelectAllClick={handleSelectAllClick}
        headRows={headRows}
        rowCount={rows.length}
      />
      <TableBody>
        {
          rows.map((row, index) => {
            const isItemSelected = isSelected(row.name);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.name}
                selected={isItemSelected}
                classes={{ root: classes.tableRow }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    onClick={event => handleClick(event, row.name)}
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
                <TableCell
                  onClick={event => selectedToEdit(event, row.name)}
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="none"
                >
                  {row.alias}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>];
}

EnhancedTable.propTypes = {
  nameTable: PropTypes.string.isRequired,
  headRows: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteFunc: PropTypes.func.isRequired,
  selectedToEdit: PropTypes.func.isRequired,
  addFunc: PropTypes.func.isRequired,
};
