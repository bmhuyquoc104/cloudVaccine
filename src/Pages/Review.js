import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AWS from 'aws-sdk'
import Fade from '@material-ui/core/Fade';
import { v4 as uuid } from 'uuid';

import Button2 from '@material-ui/core/Button';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// Icons
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

// The modal
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

// For cards
import { Grid, Card, CardActionArea, CardActions, CardContent, Typography, CardHeader, Avatar, List } from '@material-ui/core'
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

var ses = new AWS.SES();

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
            alert("Your Review has been successfully submitted.")
        }
    })
}

const putData2 = (tableName, data) => {
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
    const [registration, setRegistration] = useState([]);
    useEffect(() => {
        axios
            .get('https://raq11y02t1.execute-api.us-east-1.amazonaws.com/rev/reviews')
            .then((res) => {
                setReview(res.data.Reviews);

            })
            .catch((err) => console.error(err))
        axios
            .get('https://bys39xubeg.execute-api.us-east-1.amazonaws.com/reg/registers')
            .then((res) => {
                setRegistration(res.data.Registers);
            })
            .catch((err) => console.error(err))
    }, []
    )



    var emailArray = [];
    for (const mail of registration) {
        emailArray.push(mail.email);
    }

    console.log(emailArray)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const initialState = {
        author: '', description: '', dislike: '', like: '',
        id: '', rate: '', phone: '', email: '', vaccine: ""
    }
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            e.preventDefault();
        } else {
            initialState['id'] = uuid();
            initialState['like'] = 0;
            initialState['dislike'] = 0;
            putData('vaccine-review', initialState)
            for (var i = 0; i < emailArray.length; i++) {

                const paramsSendEmail = {
                    Destination: {
                        /* required */
                        CcAddresses: [
                            /* more items */
                        ],
                        ToAddresses: [
                            //   emailArray[i], //RECEIVER_ADDRESS
                            /* more To-email addresses */
                            "bmhuyquoc104@gmail.com",
                        ],
                    },
                    Message: {
                        /* required */
                        Body: {
                            /* required */
                            Html: {
                                Charset: "UTF-8",
                                Data: "New Review has been updated",
                            },
                            Text: {
                                Charset: "UTF-8",
                                Data: "New Review has been updated",
                            },
                        },
                        Subject: {
                            Charset: "UTF-8",
                            Data: "New vaccine update",
                        },
                    },
                    Source: "vaccinationprogramcloudproject@gmail.com", // SENDER_ADDRESS
                    ReplyToAddresses: [
                        /* more items */
                    ],

                };

                ses.sendEmail(paramsSendEmail, function (err, res) {
                    if (err) {
                        console.log("Error uploading data: ", err);
                    } else {
                        console.log("Successfully send email");
                    }
                });

            }
            console.log(initialState);
        }


        setValidated(true);
    }


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
                await putData2('vaccine-review', reviews[idx]);
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
                await putData2('vaccine-review', reviews[idx]);
                click = false;
            }
        } catch (error) {
            console.log('error on adding Like to review', error);
        }
    };

    const checked = React.useState(true);
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={2} style={{ paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px" }} className={classes.root}>
                <Grid item xs={12}>

                    <div className="Review">
                        <style type="text/css">
                            {`
                header {
                background-color: purple;
                }
                `}
                        </style>
                        <Button
                            onClick={handleShow}
                            style={{ border: 0, marginBottom: '20px', marginLeft: '40%',fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}
                            size="lg"
                        >
                            Leave A Review
                        </Button>
                        <Modal show={show} onHide={handleClose} style={{ border: 0, boderRadius: 5, color: '#FE6B8B', fontWeight: 'bold' }}>
                            <Modal.Header
                                closeButton
                                style={{ backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}
                            >
                                <Modal.Title style={{ fontWeight: 'bold', color: 'white' }}>Review Application</Modal.Title>
                            </Modal.Header>
                            <Form id="myform" noValidate validated={validated} onSubmit={handleSubmit} >
                                <Modal.Body>
                                    <Form.Group className="mb-3" controlId="formBasicFullName">
                                        <Form.Label>Author</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            placeholder="Enter Author"
                                            onChange={(e) => initialState['author'] = e.target.value}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid author.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicDate">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Enter Description"
                                            required
                                            onChange={(e) => initialState['description'] = e.target.value}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid description.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicFullName">
                                        <Form.Label>Rate</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            pattern="^\d{1,2}(\.\d{1,2})?$"
                                            placeholder="Enter rate out of 10"
                                            onChange={(e) => initialState['rate'] = e.target.value}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid rate number.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicGender">
                                        <Form.Label>Vaccine</Form.Label>
                                        <Form.Select
                                            required
                                            placeholder="Enter Description"
                                            onChange={(e) => initialState['vaccine'] = e.target.value}
                                        >
                                            <option></option>
                                            <option value="AstraZeneca">AstraZeneca</option>
                                            <option value="SPUTNIK V">SPUTNIK V</option>
                                            <option value="Sinopharm">Sinopharm</option>
                                            <option value="Pfizer">Pfizer</option>
                                            <option value="Moderna">Moderna</option>
                                            <option value="Nano Covax">Nano Covax</option>
                                            <option value="Vero Cell">Vero Cell</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a vaccine field.
                                        </Form.Control.Feedback>
                                        <Form.Text className="text-muted">
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter email"
                                            required
                                            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                                            onChange={(e) => initialState['email'] = e.target.value}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid email.
                                        </Form.Control.Feedback>
                                        <Form.Text className="text-muted">
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPhone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b"
                                            placeholder="Phone"
                                            required
                                            onChange={(e) => initialState['phone'] = e.target.value}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a Vietnamese phone number.
                                        </Form.Control.Feedback>
                                    </Form.Group>


                                    <Form.Group className="mb-3" controlId="formBasicImage">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="https://"
                                            required
                                            pattern="[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"
                                            onChange={(e) => initialState['img'] = e.target.value}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please upload vaccine image.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox"
                                            label="Agree to send your information to us "
                                            required
                                            feedback="You must agree before submitting."
                                        />
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <ButtonGroup className="mb-2">
                                        <Button type="reset" style={{ fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0 }}>
                                            Reset
                                        </Button>
                                        <Button type="submit" style={{ fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #20BF55 30%, #01BAEF 90%)', border: 0 }}>
                                            Submit
                                        </Button>
                                    </ButtonGroup>
                                </Modal.Footer>
                            </Form>
                        </Modal>
                    </div>
                    <br></br>
                    <Grid container justifyContent="center" spacing={spacing}>
                        {reviews.map((review, idx) => {
                            return (
                                <Grid key={`review${idx}`} item>
                                    <Fade in={checked} {...(checked ? { timeout: 1000 } : {})}>
                                        <Card
                                            className={classes.paper}
                                            style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", }}
                                        >
                                            <CardHeader style={{ padding: 5 }}
                                                avatar={
                                                    <Avatar aria-label="review" className={classes.avatar} src={review.img} alt={review.author} />
                                                }
                                                title={
                                                    <Typography color="secondary"><b>{review.author}</b></Typography>
                                                }
                                                subheader={
                                                    <List style={{ margin: 0, padding: 0 }}>
                                                        <Typography variant="subtitle2">{review.email}</Typography>
                                                        <Typography variant="subtitle2">{review.phone}</Typography>
                                                    </List>
                                                }
                                                action={
                                                    <List style={{ marginRight: 15, color: "#7F53AC" }}>
                                                        <Typography style={{ textTransform: "uppercase" }}><b>{review.vaccine}</b></Typography>
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
                                                <Button2
                                                    size="medium"
                                                    startIcon={<ThumbUpIcon />}
                                                    onClick={() => addLikeOrDislike(idx, 1)}
                                                    className={classes.icon}
                                                >
                                                    {review.like}
                                                </Button2>
                                                <Button2
                                                    size="medium"
                                                    startIcon={<ThumbDownAltIcon />}
                                                    onClick={() => addLikeOrDislike(idx, 2)}
                                                    className={classes.icon}
                                                >
                                                    {review.dislike}
                                                </Button2>

                                            </CardActions>
                                        </Card>
                                    </Fade>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}




