import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AWS from 'aws-sdk'

import Button from '@material-ui/core/Button';

// Icons
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

// The modal
import ReviewModal from '../Components/Modal/ReviewModal'


// For cards
import { Grid, Card, CardActionArea, CardActions, CardContent, Typography, CardHeader, Avatar, List} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: "65vw",
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
    },
    avatar:
    {
        width: "70px",
        height: "70px",
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
    var allButtons = document.getElementsByClassName("MuiButton-label");
    const addLikeOrDislike = async (idx, mode) => {
        var likeButton = allButtons[idx * 2];
        var dislikeButton = allButtons[idx * 2 + 1];
        try {
            if (click === false) {
                if (mode === 1) {
                    reviews[idx].like += 1
                    likeButton.innerHTML = '<span class="MuiButton-startIcon MuiButton-iconSizeMedium"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"></path></svg></span>' + reviews[idx].like;
                }
                else if (mode === 2) {
                    reviews[idx].dislike += 1
                    dislikeButton.innerHTML = '<span class="MuiButton-startIcon MuiButton-iconSizeMedium"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2V4zM2.17 11.12c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.45.52.86.88 1.22L10 22l6.41-6.41c.38-.38.59-.89.59-1.42V6.34C17 5.05 15.95 4 14.66 4h-8.1c-.71 0-1.36.37-1.72.97l-2.67 6.15z"></path></svg></span>' + reviews[idx].dislike;
                }
                console.log(reviews[idx]);
                await putData('vaccine-review', reviews[idx]);
                click = true;
            }
            else {
                if (mode === 1 && reviews[idx].like > 0) {
                    reviews[idx].like -= 1
                    likeButton.innerHTML = '<span class="MuiButton-startIcon MuiButton-iconSizeMedium"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"></path></svg></span>' + reviews[idx].like;
                }
                else if (mode === 2 && reviews[idx].dislike > 0) {
                    reviews[idx].dislike -= 1
                    dislikeButton.innerHTML = '<span class="MuiButton-startIcon MuiButton-iconSizeMedium"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2V4zM2.17 11.12c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.45.52.86.88 1.22L10 22l6.41-6.41c.38-.38.59-.89.59-1.42V6.34C17 5.05 15.95 4 14.66 4h-8.1c-.71 0-1.36.37-1.72.97l-2.67 6.15z"></path></svg></span>' + reviews[idx].dislike;
                }
                console.log(reviews[idx]);
                await putData('vaccine-review', reviews[idx]);
                click = false;
            }
        } catch (error) {
            console.log('error on adding Like to review', error);
        }
    };

    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
    
    return (
        <div>
            <Grid container spacing={2} style={{ paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px" }} className={classes.root}>
                <Grid item xs={12}>

                    <ReviewModal />
                    <br></br>
                    <Grid container justifyContent="center" spacing={spacing}>
                        {reviews.map((review, idx) => {
                            return (
                                <Grid key={`review${idx}`} item>
                                    <Card
                                        className={classes.paper}
                                        style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", }}
                                    >
                                        <CardHeader style={{padding: 5}}
                                            avatar={
                                                <Avatar aria-label="review" className={classes.avatar} src={review.img} alt={review.author}/>
                                            }
                                            title={
                                                <Typography color="secondary"><b>{review.author}</b></Typography>
                                            }
                                            subheader={
                                                <List style={{margin: 0, padding: 0}}>
                                                    <Typography variant="subtitle2">{review.email}</Typography>
                                                    <Typography variant="subtitle2">{review.phone}</Typography>
                                                </List>
                                            }
                                            action={
                                                <List style={{marginRight: 15, color: "#7F53AC"}}>
                                                    <Typography style={{textTransform: "uppercase"}}><b>{review.vaccine}</b></Typography>
                                                    <Typography><i>Rate:</i>{review.rate}</Typography>
                                                </List>
                                            }
                                        />
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography variant="body1">{review.description}</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions className={classes.bot}>
                                            <Button
                                                size="medium"
                                                startIcon={<ThumbUpIcon />}
                                                onClick={() => addLikeOrDislike(idx, 1)}
                                                className={classes.icon}
                                            >
                                                {review.like}
                                            </Button>
                                            <Button
                                                size="medium"
                                                startIcon={<ThumbDownAltIcon />}
                                                onClick={() => addLikeOrDislike(idx, 2)}
                                                className={classes.icon}
                                            >
                                                {review.dislike}
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




