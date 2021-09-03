import axios from "axios"
import { useState, useEffect } from "react"
import React from "react"
import { DataGrid } from '@material-ui/data-grid';
import { Doughnut } from 'react-chartjs-2';
export default function CountriesSummary() {
  const [countriesSummary, setCountriesSummary] = useState([]);
  useEffect(() => {
    axios
      .get('https://mddz75k2w0.execute-api.us-east-1.amazonaws.com/prod/summaries')
      .then((res) => {
        setCountriesSummary(res.data.CovidSummarys);

      })
      .catch((err) => console.error(err))
  }, []
  )

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

  var vietNamCollection = [];
  var singaporeCollection = [];
  var cambodiaCollection = [];
  var malaysiaCollection = [];
  var thailandCollection = [];
  var rows = [];
  var count = 0;
  for (const country of countriesSummary) {

    country['indexNumber'] = count;
    count++;
    country['id'] = country['indexNumber'];
    rows.push(country);
  }


  var currentDate = new Date();
  var sevenDayAgo = new Date();
  currentDate.setDate(currentDate.getDate());
  sevenDayAgo.setDate(sevenDayAgo.getDate() - 7);

  for (const country of countriesSummary) {
    var dayInArray = new Date(country['Date']);
    dayInArray.setDate(dayInArray.getDate());

    if (dayInArray.getTime() >= sevenDayAgo.getTime() && dayInArray.getTime() <= currentDate.getTime()) {
      if (country['Country'] === 'Viet Nam') {
        vietNamCollection.push(country);
      }
      if (country['Country'] === 'Singapore') {
        singaporeCollection.push(country);
      }
      if (country['Country'] === 'Cambodia') {
        cambodiaCollection.push(country);
      }
      if (country['Country'] === 'Malaysia') {
        malaysiaCollection.push(country);
      }
      if (country['Country'] === 'ThaiLand') {
        thailandCollection.push(country);
      }
    }
  }
 
  for (const vn of vietNamCollection) {
    console.log(new Date(vn.Date).toLocaleDateString());
  }
 


  // console.log(rows);
  return (
    < div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows.map((r) => { return r })}
        columns={columns}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        disableSelectionOnClick
      />
      <div>
      <Doughnut
        data={{
          labels: ['VietNam', 'ThaiLand', 'Cambodia', 'Malaysia', 'Singapore'],
          datasets: [
            {
              label: '# of votes',
              data: [12, 19, 3, 5, 2],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 4, 
            },
            // {
            //   label: 'Quantity',
            //   data: [47, 52, 67, 58, 9, 50],
            //   backgroundColor: 'orange',
            //   borderColor: 'red',
            // },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
    </div>
  )
}






