import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    hidden: {
        display: 'none',
    },
    icon: {
        cursor: 'pointer',
    },
});

class SimpleTable extends React.Component {

    render() {
       console.log('this.props.tablesDataPart', this.props.tablesDataPart)
       if(this.props.tablesDataPart !== undefined && this.props.tablesDataPart.length !== 0){

       const tableHeadHeaders = [this.props.tablesDataPart[0][0], this.props.tablesDataPart[0][1],
           this.props.tablesDataPart[0][2], 'Change data'];
    return (
        <Paper className={this.props.hidden ? this.props.classes.hidden : this.props.classes.root}>
            {this.props.tableName}
            <Table className={this.props.classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                    {tableHeadHeaders.map((tableHeadHeader, ind) =>
                        <TableCell key={ind} align="right">{tableHeadHeader}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
          {this.props.tablesDataPart.map((rowData, ind) => {
              if(ind !== 0){
              return (<TableRow key={ind}>
                    {tableHeadHeaders.map((tableHeadHeader, ind) => {
                        if(ind !== (tableHeadHeaders.length - 1)) {
                            return (<TableCell key={ind} align="right">{rowData[tableHeadHeader]}</TableCell>)
                        } else {
                            return null
                        }})}
                    <TableCell align="center">
                        <EditIcon className={this.props.classes.icon}
                            onClick={() => this.props.onClickButtonRow(ind)}
                        />
                    </TableCell>
                </TableRow>
            )}})}
            </TableBody>
        </Table>
            </Paper>

    )} else
       {return null}
           } }

const HOCExample = (Component) => {
    function _HOCExample(props) {

        const classes = useStyles();

        return <Component classes={classes} {...props}></Component>
    }
    _HOCExample.displayName = 'StylesEnhancer'
    return _HOCExample
}

export const SimpleTableFunc = HOCExample(SimpleTable)