import axios from "axios"
import { useState, useEffect } from "react"
import React from "react"
import { DataGrid } from '@material-ui/data-grid';

// For table
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableFooter,
    Paper,
    Typography
 } from '@material-ui/core';
 import Container from '@material-ui/core/Container';

export default function Country() {
  const [countriesSummary, setCountriesSummary] = useState([]);
  useEffect(() => {
    axios
      .get('https://api.covid19api.com/live/country/vietnam/status/confirmed')
      .then((res) => {
        setCountriesSummary(res.data);
    
      })
      .catch((err) => console.error(err))
  }, []
  )

  const rows = [];
  for (const country of countriesSummary) {
    country['id'] = country['ID'];
    rows.push(country);
  }
  console.log(rows);

  // const columns = [
  //   { field: 'id', headerName: 'id', width: 300 },

  //   {
  //     field: 'Country',
  //     headerName: 'Country',
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: 'Confirmed',
  //     headerName: 'Confirmed cases',
  //     width: 220,
  //     type: 'number',
  //   },
  //   {
  //     field: 'Deaths',
  //     headerName: 'Deaths',
  //     type: 'number',
  //     width: 160,
  //   },
  //   {
  //     field: 'Recovered',
  //     headerName: 'Recovered cases',
  //     width: 220,
  //     editable: true,
  //     type: 'number',
  //   },
  //   {
  //     field: 'Active',
  //     headerName: 'Active cases',
  //     width: 160,
  //     type: 'number',
  //   },
  //   {
  //     field: 'Date',
  //     headerName: 'Date',
  //     width: 220,
  //     type: 'number',
  //   },
  // ];

  const useStyles = makeStyles((theme) => ({
    table: { minWidth: 650,},
    tableContainer:
    {
        borderRadius: 15,
        margin: '10px 10px'
    },
    tableHeaderCell:
    {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.background.default
    },
    name:
    {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    container: 
    {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    text: 
    {
        fontWeight: 'bold',
        fontSize: 40,
        fontFamily: 'Roboto',
        color: theme.palette.secondary.dark
    }
  }));

  const classes = useStyles();

  // For pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };

  return (
    // <div style={{ height: 400, width: '100%' }}>
    //   <DataGrid
    //     rows={rows}
    //     columns={columns}
    //     rowsPerPageOptions={[5, 10, 20, 50, 100]}
    //     checkboxSelection
    //     disableSelectionOnClick
    //   />
    // </div>
    <Container className={classes.container}>
      <Typography className={classes.text}>Countries Summary</Typography>
      <TableContainer component={Paper} className={classes.tableContainer} fullWidth>
          <Table className={classes.table} aria-label="simple table">
          <TableHead>
              <TableRow>
                  <TableCell className={classes.tableHeaderCell}>ID</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Country</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Confirmed cases</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Deaths</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Recovered</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Active</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Date</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((country, idx) => (
                  <TableRow key={`country${idx}`}>
                      <TableCell>
                          <Typography className={classes.name}>{country.id}</Typography>
                      </TableCell>
                      <TableCell>
                          {country.Country}
                      </TableCell>
                      <TableCell>
                          {country.Confirmed}
                      </TableCell>
                      <TableCell>
                          {country.Deaths}
                      </TableCell>
                      <TableCell>
                          {country.Recovered}
                      </TableCell>
                      <TableCell>
                          {country.Active}
                      </TableCell>
                      <TableCell>
                          {country.Date}
                      </TableCell>
                  </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableFooter>
          </Table>
      </TableContainer>
    </Container>
  )
}






