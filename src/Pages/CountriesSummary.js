import axios from "axios"
import { useState, useEffect } from "react"
import React from "react"
import { DataGrid } from '@material-ui/data-grid';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  data:
  {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    width: '74vw',
    border: "none",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    borderRadius: "15px",
  }
}));

export default function CountriesSummary() {
  const [vietNamSummary, setVietNamSummary] = useState([]);
  const [LaosSummary, setLaosSummary] = useState([]);
  const [thaiLandSummary, setThaiLandSummary] = useState([]);
  const [malaysiaSummary, setMalaysiaSummary] = useState([]);
  const [singaporeSummary, setSingaporeSummary] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.covid19api.com/live/country/vietnam/status/confirmed')

      .then((res) => {
        setVietNamSummary(res.data);

      })
      .catch((err) => console.error(err))

    axios
      .get('https://api.covid19api.com/live/country/singapore/status/confirmed')

      .then((res) => {
        setSingaporeSummary(res.data);

      })
      .catch((err) => console.error(err))

    axios
      .get('https://api.covid19api.com/live/country/thailand/status/confirmed')

      .then((res) => {
        setThaiLandSummary(res.data);

      })
      .catch((err) => console.error(err))

    axios
      .get('https://api.covid19api.com/live/country/laos/status/confirmed')

      .then((res) => {
        setLaosSummary(res.data);

      })
      .catch((err) => console.error(err))

    axios
      .get('https://api.covid19api.com/live/country/malaysia/status/confirmed')

      .then((res) => {
        setMalaysiaSummary(res.data);

      })
      .catch((err) => console.error(err))

  }, []);

  var countriesSummary = [...singaporeSummary, ...LaosSummary,...malaysiaSummary, ...vietNamSummary,...thaiLandSummary];
  
  console.log(countriesSummary);
  // console.log(singaporeSummary);
  // console.log(malaysiaSummary);
  // console.log(vietNamSummary);
  // console.log(LaosSummary);
  // console.log(thaiLandSummary);
  

  const columns = [

    { field: 'id', headerName: 'tableId', width: 300 },
    { field: 'ID', headerName: 'id', width: 300 },
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
  var count = 1;
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




  var temp = [];
  for (const country of countriesSummary) {
    temp.push(country.Date);
  }
  temp.sort();
  var recentDay = temp[temp.length - 1];
  recentDay = new Date(recentDay);
  console.log(recentDay);

  for (const country of countriesSummary) {
    var dayInArray = new Date(country['Date']);
    if (dayInArray.getTime() >= sevenDayAgo.getTime() && dayInArray.getTime() <= recentDay.getTime()) {
      if (country['Country'] === 'Viet Nam') {
        vietNamCollection.push(country);
        if (dayInArray.toLocaleDateString() === recentDay.toLocaleDateString()) {
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

  console.log(vietNamToday);

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

  function getPieChartData(countryToday) {
    var dataSetPieChart = [];
    for (const data of countryToday) {
      dataSetPieChart.push(data.Recovered);
      dataSetPieChart.push(data.Deaths);
      dataSetPieChart.push(data.Confirmed);
      dataSetPieChart.push(data.Active);
    }
    return dataSetPieChart;
  }

  const classes = useStyles();
  return (
    < div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows.map((r) => { return r })}
        columns={columns}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        checkboxSelection
        disableSelectionOnClick
        className={classes.data}
      />
      {/* <div className="barChart">
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
      <div className="doughnutChart">
        <Doughnut
          data={{
            labels: ['Recovered', 'Deaths', 'Confirmed', 'Active'],
            datasets: [
              {
                label: 'Dataset1',
                data: getPieChartData(vietNamToday),
                backgroundColor: [
                  'rgb(142, 195, 195)',
                  'rgb(255,69,0)',
                  'rgb(39,70,135)',
                  'rgb(255,215,0)'
                ],
                borderWidth: 2,
                maxBarThickness: 30,
              },
            ],
          }}
          height={400}
          width={400}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: `Vietnam Total Data for covid today`,
                font: {
                  size: 20,
                },
                padding: {
                  top: 20
                }
              },
              legend: {
                display: true,
                labels: {
                  font: {
                    size: 18
                  }
                }
              }
            },
          }}
        />
      </div> */}
    </div>
  )
}






