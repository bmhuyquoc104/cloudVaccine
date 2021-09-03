import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import { Grid, Card, CardMedia, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 440,
    width: 300,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Vaccine() {
    const [vaccines, setVaccines] = useState([]);
    useEffect(() => {
        axios
            .get('https://75hpp2g9n5.execute-api.us-east-1.amazonaws.com/vac/vaccines')
            .then((res) => {
                setVaccines(res.data.Vaccines);
            })
            .catch((err) => console.error(err))
    }, []
    )
    console.log(vaccines)

    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    return (
            <Grid container spacing={2} style={{paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px"}} className={classes.root}>
              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={spacing}>
                  {vaccines.map((vaccine, idx) => {
                    return (
                      <Grid key={`vaccine${idx}`} item>
                        <Card className={classes.paper}>
                          <CardMedia image={'https://' + vaccine.img} style={{ width: "250px", height: "300px", margin: "auto" }} alt="..."/>
                          <CardContent>
                            <Typography><b>{vaccine.name}</b></Typography>
                            <Typography><b>ID:</b> {vaccine.id}</Typography>
                            <Typography><b>Efficiency:</b> {vaccine.effecientcy}</Typography>
                            <Typography><b>Like:</b> {vaccine.like}</Typography>
                            <Typography><b>Country:</b> {vaccine.country}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
            </Grid>
    );
}
