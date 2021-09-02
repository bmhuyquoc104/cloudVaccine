import axios from "axios"
import { useState, useEffect } from "react"
import React from "react"
import { DataGrid } from '@material-ui/data-grid';

export default function CountriesSummary() {
  const [countriesSummary, setCountriesSummary] = useState([]);
  useEffect(() => {
    axios
      .get('https://isnxkflyz4.execute-api.us-east-1.amazonaws.com/prod/covids')
      .then((res) => {
        setCountriesSummary(res.data.CovidSummarys);
    
      })
      .catch((err) => console.error(err))
  }, []
  )

  const columns = [
    { field: 'id', headerName: 'id', width: 300 },

    {
      field: 'Country',
      headerName: 'Country',
      width: 150,
      editable: true,
    },
    {
      field: 'Confirmed',
      headerName: 'Confirmed cases',
      width: 220,
      type: 'number',
    },
    {
      field: 'Deaths',
      headerName: 'Deaths',
      type: 'number',
      width: 160,
    },
    {
      field: 'Recovered',
      headerName: 'Recovered cases',
      width: 220,
      editable: true,
      type: 'number',
    },
    {
      field: 'Active',
      headerName: 'Active cases',
      width: 160,
      type: 'number',
    },
    {
      field: 'Date',
      headerName: 'Date',
      width: 220,
      type: 'number',
    },
  ];

  
  const rows = [];
  for (const country of countriesSummary) {
    country['id'] = country['ID'];
    rows.push(country);
  }
  console.log(rows);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  )
}






