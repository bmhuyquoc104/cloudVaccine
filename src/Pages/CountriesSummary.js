import axios from "axios"
import { useState, useEffect } from "react"
import React from "react"
import { DataGrid } from '@material-ui/data-grid';
import { Bar } from 'react-chartjs-2';




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
  var vietNamToday = [];
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
        if (dayInArray.toLocaleDateString() === currentDate.toLocaleDateString()) {
          vietNamToday.push(country);
        }
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
      if (country['Country'] === 'Thailand') {
        thailandCollection.push(country);
      }
    }
  }

  function getCountryConfirmedCases(countryCollection) {
    var dataset = [];
    for (const data of countryCollection) {
      dataset.push(data.Confirmed)
    }
    return dataset.sort();
  }
  
  var label = [];
  for (const vn of vietNamCollection) {
    label.push((new Date(vn.Date).toLocaleDateString()));
  }
  label.sort();
  console.log(label);

  return (
    < div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows.map((r) => { return r })}
        columns={columns}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        disableSelectionOnClick
      />
      <div className = "barChart">
        <Bar
          data={{
            labels: label,
            datasets: [
              {
                label: 'vietnam total cases ',
                data: getCountryConfirmedCases(vietNamCollection),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 2,
                maxBarThickness: 30,

              },
              {
                label: 'malaysia total cases ',
                data: getCountryConfirmedCases(malaysiaCollection),
                backgroundColor: [
                  'rgba(255, 159, 64, 0.2)'
                  ,

                ],
                borderColor: [
                  'rgba(255, 159, 64, 1)'

                ],
                borderWidth: 2,
                maxBarThickness: 30,

              },
              {
                label: 'cambodia total cases ',
                data: getCountryConfirmedCases(cambodiaCollection),
                backgroundColor: [
                  'rgba(153, 102, 255, 0.2)',

                ],
                borderColor: [
                  'rgba(153, 102, 255, 1)',

                ],
                borderWidth: 2,
                maxBarThickness: 30,

              },
              {
                label: 'singapore total cases ',
                data: getCountryConfirmedCases(singaporeCollection),
                backgroundColor: [
                  'rgba(75, 192, 192, 0.2)',

                ],
                borderColor: [
                  'rgba(75, 192, 192, 1)',

                ],
                borderWidth: 2,
                maxBarThickness: 30,

              },
              {
                label: 'thailand total case',
                data: getCountryConfirmedCases(thailandCollection),
                backgroundColor: [

                  'rgba(54, 162, 235, 0.2)',

                ],
                borderColor: [

                  'rgba(54, 162, 235, 1)',

                ],
                borderWidth: 2,
                maxBarThickness: 30,

              }
            ],
          }}
          height={600}
          width={600}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Vietnam total confirmed case in the last 7 days bar chart',
                font: {
                  size: 30,
                },
                padding: {
                  top: 50,
                  bottom: 20
                }

              },
              legend: {
                display: true,
                labels: {
                  color: 'rgb(255, 99, 132)',
                  font: {
                    size: 18
                  }
                }
              }
            },

            scales: {
              yAxes: [
                {
                  color: 'red',
                  font: {
                    size: 25
                  },
                  ticks: {
                    tickColor: 'red',
                    beginAtZero: false,

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
      <div className="pieChart">
     
      </div>
    </div>
  )
}






