import axios from "axios"
import { useState, useEffect } from "react"
import React from "react"

import CountriesLine from "../Components/Graphs/Line"
import CountriesBar from "../Components/Graphs/Bar"
import CountriesHBar from "../Components/Graphs/HBar"
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';


// For cards
import { Grid, Card, CardActions, Typography, CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root:
  {
    flexGrow: 1,
  },
  paper:
  {
    width: "73vw",
  },
  control:
  {
    padding: theme.spacing(2),
  },
  bot:
  {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  data:
  {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: "none",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    borderRadius: "15px",
  }
}));

export default function CountriesSummary() {
  const [vietNamSummary, setVietNamSummary] = useState([]);
  const [cambodiaSummary, setLaosSummary] = useState([]);
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
      .get('https://api.covid19api.com/live/country/cambodia/status/confirmed')

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

  var countriesSummary = [...singaporeSummary, ...cambodiaSummary, ...malaysiaSummary, ...vietNamSummary, ...thaiLandSummary];

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

  function getCountryConfirmedCases(countryCollection) {
    var dataset = [];
    for (const data of countryCollection) {
      dataset.push(data.Confirmed);
    }
    return dataset.sort();
  }

  function getMonth(countryCollection) {
    var dataset = [];
    for (const data of countryCollection) {
      dataset.push((new Date(data.Date).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })))
    }
    return dataset.sort();
  }

  function getCountryConfirmedDeath(countryCollection) {
    var dataset = [];
    for (const data of countryCollection) {
      dataset.push(data.Deaths)
    }
    return dataset;
  }

  function getonlyCountry(countryCollection) {
    var dataset = [];
    for (const data of countryCollection) {
      dataset.push(data.Country)
    }
    return dataset;
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

  const [spacing, setSpacing] = React.useState(6);
  const classes = useStyles();

  return (
    <Grid container spacing={6} style={{ paddingTop: "20px" }} className={classes.root}>
      <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid
          container
          spacing={spacing}
          justifyContent="center"
        >
          <Grid item>
            <Card
              className={classes.paper}
              style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", }}
            >
              <CardHeader
                className={classes.bot}
                title=
                {
                  <Typography variant="h5"><b>Vaccinated People In South East Countries</b></Typography>
                }
              />
              <div>
                <Bar
                  data={{
                    labels: ['Vietnam', 'Thailand', 'Cambodia', 'Malaysia', 'Singapore'],
                    datasets: [
                      {
                        label: 'Doses Given In Million',
                        data: [20.2, 31.8, 19.2, 55, 36.1],
                        fill: false,
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
                        label: 'Fully Vaccinated In Million',
                        data: [2.73, 7.78, 8.59, 15.8, 4.44],
                        fill: false,
                        backgroundColor: [
                          'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                          'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 2,
                        maxBarThickness: 30,
                      },
                      {
                        label: '% Of Population Fully Vaccinated',
                        data: [2.8, 11.2, 52.1, 49.4, 77.9],
                        fill: false,
                        backgroundColor: [
                          'rgba(255, 159, 64, 0.2)'
                          ,
                        ],
                        borderColor: [
                          'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 2,
                        maxBarThickness: 30,
                      }

                    ],
                  }}

                  options={{
                    indexAxis: 'y',
                    // Elements options apply to all of the options unless overridden in a dataset
                    // In this case, we are setting the border of each horizontal bar to be 2px wide
                    elements: {
                      bar: {
                        borderWidth: 2,
                      }
                    },
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right',
                      }
                    }
                  }}
                />
              </div>
              <CardActions className={classes.bot} />
            </Card>
          </Grid>

          {/* Line chart */}
          <Grid item>
            <Card
              className={classes.paper}
              style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", }}
            >
              <CardHeader
                className={classes.bot}
                title=
                {
                  <Typography variant="h5"><b>Total Death Cases From End Of June To Now</b></Typography>
                }
              />
              < div>
                <Line
                  data={{
                    labels: getMonth(vietNamSummary),
                    datasets: [
                      {
                        label: 'Vietnam Total Cases ',
                        data: getCountryConfirmedDeath(vietNamSummary),
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
                        label: 'Malaysia Total Cases ',
                        data: getCountryConfirmedDeath(malaysiaSummary),
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
                        label: 'Cambodia Total Cases ',
                        data: getCountryConfirmedDeath(cambodiaSummary),
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
                        label: 'Singapore Total Cases ',
                        data: getCountryConfirmedDeath(singaporeSummary),
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
                        label: 'Thailand Total Case',
                        data: getCountryConfirmedDeath(thaiLandSummary),
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
              <CardActions className={classes.bot} />
            </Card>
          </Grid>

          <Grid item>
            <Card
              className={classes.paper}
              style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", }}
            >
              <CardHeader
                className={classes.bot}
                title=
                {
                  <Typography variant="h5"><b>Total Confirmed Cases For The Last 7 Days</b></Typography>
                }
              />
              <div className="Bar">
                <Bar
                  data={{
                    labels: label,
                    datasets: [
                      {
                        label: 'Vietnam Total Cases ',
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
                        label: 'Malaysia Total Cases ',
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
                        label: 'Cambodia Total Cases ',
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
                        label: 'Singapore Total Cases ',
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
                        label: 'Thailand Total Case',
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
              <CardActions className={classes.bot} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}






