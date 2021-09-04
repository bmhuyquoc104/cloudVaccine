import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk'

import Button from '@material-ui/core/Button';

// Icons
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ReplyIcon from '@material-ui/icons/Reply';

// The modal
import ReviewModal from '../Components/Modal/ReviewModal'


// For cards
import { Grid, Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      width: 900,
    },
    control: {
      padding: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
    bot:
    {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    icon:
    {
        color: theme.palette.background.default,
    }
}));

const configuration = {
    region: 'us-east-1',
    secretAccessKey: 'RijJPrAkst+a132dzazw+u9ssMWZsbttvvcVOE32',
    accessKeyId: 'AKIA4Y5CM62A3AGGGW2W'
}
AWS.config.update(configuration)

const docClient = new AWS.DynamoDB.DocumentClient()
const putData = (tableName, data) => {
    var params = {
        TableName: tableName,
        Item: data
    }

    docClient.put(params, function (err, data) {
        if (err) {
            console.log('Error', err)
        } else {
            console.log('Success', data)
        }
    })
}

export default function Review() {

    const [reviews, setReview] = useState([]);
    useEffect(() => {
        axios
            .get('https://raq11y02t1.execute-api.us-east-1.amazonaws.com/rev/reviews')
            .then((res) => {
                setReview(res.data.Reviews);

            })
            .catch((err) => console.error(err))
    }, []
    )

    var click = false;
    const addLikeOrDislike = async (idx,mode) => {
        try {
            if (click === false) {
                if (mode === 1) reviews[idx].like += 1;
                else if (mode === 2) reviews[idx].dislike +=1;
                console.log(reviews[idx]);
                await putData('vaccine-review', reviews[idx]);
                click = true;
            }
            else {
                if (mode === 1 && reviews[idx].like >0) reviews[idx].like -= 1;
                else if (mode === 2 && reviews[idx].dislike > 0) reviews[idx].dislike -=1;
                console.log(reviews[idx]);
                await putData('vaccine-review',reviews[idx]);
                click = false;
            }
        } catch (error) {
            console.log('error on adding Like to review', error);
        }
    };

    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
  
    return (
        <div className="Review">
            
            <Grid container spacing={2} style={{paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px"}} className={classes.root}>
            
                <Grid item xs={12}>
                <ReviewModal />
                <br></br>
                <Grid container justifyContent="center" spacing={spacing}>
                    {reviews.map((review, idx) => {
                    return (
                        <Grid key={`review${idx}`} item>
                        <Card className={classes.paper} >
                            <CardActionArea>
                               <CardContent>
                                    <Typography color="secondary" variant="h6"><b>{review.author}</b></Typography>
                                    <Typography variant="body1">{review.description}</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.bot}>
                                        <Button
                                        size="medium"
                                        startIcon={<ThumbUpIcon/>}
                                        onClick={() => addLikeOrDislike(idx,1)}
                                        className={classes.icon}
                                        >
                                        {review.like}
                                        </Button>
                                        <Button
                                        size="medium"
                                        startIcon={<ThumbDownAltIcon/>}
                                        onClick={() => addLikeOrDislike(idx,2)}
                                        className={classes.icon}
                                        >
                                        {review.dislike}
                                        </Button>
                                        <Button
                                        size="medium"
                                        startIcon={<ReplyIcon/>}
                                        className={classes.icon}
                                        >
                                        Reply
                                        </Button>
                                    </CardActions>
                            
                        </Card>
                        </Grid>
                    )
                    })}
                </Grid>
                </Grid>
            </Grid>
        </div>
        
    );
}




