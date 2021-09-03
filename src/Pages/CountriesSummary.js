import axios from "axios"
import { useState, useEffect } from "react"
import React from "react"
import { DataGrid } from '@material-ui/data-grid';

export default function CountriesSummary() {
  const [countriesSummary, setCountriesSummary] = useState([]);
  useEffect(() => {
    axios
      .get('https://5ymeqj1dbk.execute-api.us-east-1.amazonaws.com/covid2/summaries')
      .then((res) => {
        setCountriesSummary(res.data.CovidSummarys);
    
      })
      .catch((err) => console.error(err))
  }, []
  )

//   export const fetchData = (tableName) => {
//     var params = {
//         TableName: tableName
//     }

//     docClient.scan(params, function (err, data) {
//         if (!err) {
//             console.log(data)
//         }
//     })
// }

  const columns = [
    { field: 'indexNumber', headerName: 'index', width: 300 },
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
  var count = 0;
  for (const country of countriesSummary) {
    
    country['indexNumber'] = count;
    count++;
    country['id'] = country['indexNumber'];
    rows.push(country);
  }
  console.log(rows);
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows.map( (r) => {return r})}
        columns={columns}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  )
}






