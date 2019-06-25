import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    table: {
      minWidth: 750,
      display: 'table',
      overflowY: 'auto',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    tableRow: {
      width: '100%',
      display: 'table-row',
      paddingRight: theme.spacing(1),
    },
    emptyCell: {
      width: '48px'
    },
    tableCell: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    }
  }))
;
const Attributes = ({ children }) => {
  const classes = useStyles();
  return (
    <Table
      classes={{ root: classes.table }}
      aria-labelledby="tableTitle"
    >
      <TableHead>
        <TableRow classes={{ root: classes.tableRow }}>
          <TableCell padding="none" classes={{ root: classes.tableCell }}>Наименование</TableCell>
          <TableCell padding="none" classes={{ root: classes.tableCell }}>Псевдоним</TableCell>
          <TableCell padding="none" classes={{ root: classes.tableCell }}>Тип поля</TableCell>
          <TableCell classes={{ root: classes.emptyCell }}> </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Children.map(children, (child) => {
          const {
            name,
            nameComponent,
            aliasComponent,
            typeComponent,
            deleteComponent,
          } = child.props;
          return (
            <TableRow classes={{ root: classes.tableRow }}>
              <TableCell id={name} padding="none">
                {nameComponent}
              </TableCell>
              <TableCell id={name} padding="none">
                {aliasComponent}
              </TableCell>
              <TableCell id={name} padding="none">
                {typeComponent}
              </TableCell>
              <TableCell id={name} padding="none">
                {deleteComponent}
              </TableCell>
            </TableRow>);
        })
        }
      </TableBody>
    </Table>
  );
};

Attributes.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
};

Attributes.defaultProps = {
  children: [],
};

export default Attributes