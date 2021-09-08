import axios from "axios"
import { useState, useEffect } from "react"
import React from "react"
import { Pie } from 'react-chartjs-2';
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
export default function HanoiPie() {
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

    const classes = useStyles();
    return (
        <div>
            <div>
                <Pie
                    data={{
                        labels: ['Population', 'Total People Injected', 'Practical Distribution', 'Theory Distribution', 'Injected 2 doses'],
                        datasets: [
                            {
                                label: 'Dataset1',
                                data: [5700000, 11400000, 4300000, 11400000, 369600],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(255, 159, 64, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(54, 162, 235, 1)',
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
        </div>

    )
}

