import axios from "axios"
import { useState, useEffect } from "react"
import React from "react"
import { DataGrid } from '@material-ui/data-grid';


import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

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
        width: "60vw",
        background:"#fde7f9",
    },
    control:
    {
        padding: theme.spacing(2),
    },
    bot:
    {
        color: 'white',
        background:  'linear-gradient(45deg, #aa4465 30%,#861657 90%)',
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
export default function Dashboard() {
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
    console.log(countriesSummary);

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
    var vietNamToday = [];

    var rows = [];
    var count = 1;
    for (const country of vietNamSummary) {

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
        }
    }
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
                    {/* Data grid */}
                    <Grid item>
                        <Card
                            className={classes.paper}
                            style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", }}
                        >
                            <CardHeader
                                className={classes.bot}
                                style={{ textAlign: "center" }}
                                title=
                                {
                                    <Typography variant="h5"><b>Latest Information For Covid Pandemic In 5 South East Countries</b></Typography>
                                }
                            />
                            <div div style={{ height: 500 }}>
                                <DataGrid
                                    rows={rows.map((r) => { return r })}
                                    columns={columns}
                                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                                    checkboxSelection
                                    disableSelectionOnClick
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
                                style={{ textAlign: "center" }}
                                title=
                                {
                                    <Typography variant="h5"><b>Vaccine distribution in Sai Gon</b></Typography>
                                }
                            />
                            <div>
                                <Pie
                                    data={{
                                        labels: ['Population', 'Total People Injected', 'Practical Distribution', 'Theory Distribution', 'Injected 2 doses'],
                                        datasets: [
                                            {
                                                label: 'Dataset1',
                                                data: [7000000, 9100000, 5800000, 13800000, 321400],
                                                backgroundColor: [
                                                    'rgb(46,139,87)',
                                                    'rgb(39,70,135)',
                                                    'rgb(128,0,128)',
                                                    'rgb(255,215,0)',
                                                    'rgb(255,69,0)'
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
                                            legend: {
                                                display: true,
                                                labels: {
                                                    font: {
                                                        size: 14
                                                    }
                                                }
                                            }
                                        },
                                    }}
                                />
                            </div>
                            <CardActions className={classes.bot} />
                        </Card>
                    </Grid>

                    {/* Hanoi pie chart */}
                    <Grid item>
                        <Card
                            className={classes.paper}
                            style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", }}
                        >
                            <CardHeader
                                className={classes.bot}
                                style={{ textAlign: "center" }}
                                title=
                                {
                                    <Typography variant="h5"><b>Vaccine distribution in Ha Noi</b></Typography>
                                }
                            />
                            <div>
                                <Pie
                                    data={{
                                        labels: ['Population', 'Total People Injected', 'Practical Distribution', 'Theory Distribution', 'Injected 2 doses'],
                                        datasets: [
                                            {
                                                label: 'Dataset1',
                                                data: [5700000, 11400000, 4300000, 11400000, 369600],
                                                backgroundColor: [
                                                    'rgb(46,139,87)',
                                                    'rgb(39,70,135)',
                                                    'rgb(128,0,128)',
                                                    'rgb(255,215,0)',
                                                    'rgb(255,69,0)'
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
                                            legend: {
                                                display: true,
                                                labels: {
                                                    font: {
                                                        size: 14
                                                    }
                                                }
                                            }
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
                                style={{ textAlign: "center" }}
                                title=
                                {
                                    <Typography variant="h5"><b>Vietnam Total Data For Covid Pandemic Today</b></Typography>
                                }
                            />
                            <div>
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
                                    margin={20}
                                    options={{
                                        maintainAspectRatio: false,
                                        plugins: {

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
                            </div>
                            <CardActions className={classes.bot} />
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}

