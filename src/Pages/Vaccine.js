import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom';


// Modal
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// For cards
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, Container} from '@material-ui/core'

// For button
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button2 from '@material-ui/core/Button';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


import * as AWS from 'aws-sdk'
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root:
  {
    flexGrow: 1,
  },
  paper:
  {
    width: "30vw",
    height: "100vh"
    // Media 35vh => content = 100 - 35 = 65
  },
  control:
  {
    padding: theme.spacing(2),
  },
  container:
  {
        background: 'linear-gradient(45deg, #1d2671 60%, #d76d77 90%)',
  },
  mid:
  {
    height: "40vh"
  },
  bot:
  {
    height: "25vh",
    justifyContent: "center"
  },
  text:
  {
    color: '#ee9ca7',
    fontSize: "1rem",
    marginBottom:"15px"
  },
  headText:
  {
    color: "white",
    fontSize: "1.25rem",
    marginBottom:"15px"
  },
}));

const configuration = {
  region: 'us-east-1',
  secretAccessKey: 'RijJPrAkst+a132dzazw+u9ssMWZsbttvvcVOE32',
  accessKeyId: 'AKIA4Y5CM62A3AGGGW2W'
}
AWS.config.update(configuration)


const docClient = new AWS.DynamoDB.DocumentClient()

var sns = new AWS.SNS();
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



export default function Vaccine() {
  const [vaccines, setVaccines] = useState([]);
  const [registration, setRegistration] = useState([]);
  useEffect(() => {
    axios
      .get('https://75hpp2g9n5.execute-api.us-east-1.amazonaws.com/vac/vaccines')
      .then((res) => {
        setVaccines(res.data.Vaccines);
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialState = {
    dateOfConsultation: '', email: '', fullname: '', inquiry: '',
    message: '', phone: '', id: ''
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
      putData('consult', initialState)
      alert("You have successfully submitted your consult")
      var params = {
        Name: initialState['name']
      }

      sns.createTopic(params, function (err, res) {
        if (err) {
          console.log("Error uploading data: ", err);
        } else {
          console.log("Successfully create topic");
        }
      });

      for (var i = 0; i < emailArray.length; i++) {

        const paramsSendEmail = {
          Destination: {
            /* required */
            CcAddresses: [
              /* more items */
            ],
            ToAddresses: [
              emailArray[i], //RECEIVER_ADDRESS
              /* more To-email addresses */
            ],
          },
          Message: {
            /* required */
            Body: {
              /* required */
              Html: {
                Charset: "UTF-8",
                Data: "We have successfully received your consult. We will contact you soon",
              },
              Text: {
                Charset: "UTF-8",
                Data: "We have successfully received your consult. We will contact you soon",
              },
            },
            Subject: {
              Charset: "UTF-8",
              Data: "We have successfully received your consult. We will contact you soon",
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
  var allHeartContainers = document.getElementsByClassName("MuiButton-label");

  // <button class="MuiButtonBase-root MuiIconButton-root" tabindex="0" type="button"><span class="MuiIconButton-label"><svg class="MuiSvgIcon-root makeStyles-text-23" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></span><span class="MuiTouchRipple-root"></span></button>
  const addLike = async (idx) => {
    if (click === false) {
      vaccines[idx].like += 1;
      allHeartContainers[idx].innerHTML = '<span class="MuiButton-startIcon MuiButton-iconSizeLarge"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></span>' + vaccines[idx].like;
      await putData2('vaccine-covid', vaccines[idx]);
      console.log(vaccines[idx]);
      click = true;
    }
    else {
      vaccines[idx].like -= 1;
      allHeartContainers[idx].innerHTML = '<span class="MuiButton-startIcon MuiButton-iconSizeLarge"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></span>' + vaccines[idx].like;
      await putData2('vaccine-covid', vaccines[idx]);
      console.log(vaccines[idx]);
      click = false;
    }
  }


  const checked = React.useState(true);
  const [spacing, setSpacing] = React.useState(6);
  const classes = useStyles();


  return (
    <Grid container spacing={6} style={{ paddingTop: "20px",}} className={classes.root}>
      <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="Vaccine">

          <Modal show={show} onHide={handleClose} style={{ border: 0, boderRadius: 5, color: '#FE6B8B', fontWeight: 'bold' }}>
            <Modal.Header
              closeButton
              style={{ backgroundImage: 'linear-gradient(45deg, #aa4465 30%,#861657 90%)'}}
            >
              <Modal.Title style={{ fontWeight: 'bold', color: 'white', justifyContent: 'center' }}>New Consult</Modal.Title>
            </Modal.Header>
            <Form id="myform" noValidate validated={validated} onSubmit={handleSubmit} >
              <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Enter Full Name"
                    onChange={(e) => initialState['fullname'] = e.target.value}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid full Name.
                  </Form.Control.Feedback>
                </Form.Group>

               

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
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

                <Form.Group className="mb-3" controlId="formBasicGender">
                  <Form.Label>Inquiry</Form.Label>
                  <Form.Select
                    required
                    onChange={(e) => initialState['inquiry'] = e.target.value}
                  >
                    <option></option>
                    <option value="What vaccine brand is the best?">What vaccine brand is the best?</option>
                    <option value="What is the side effect after getting shot. Do all vaccine type have the same side effect?">What is the side effect after getting shot. Do all vaccine type have the same side effect?</option>
                    <option value="How is vaccine work. Do we get 100% immuned?">How is vaccine work. Do we get 100% immuned?</option>
                    <option value="What do I need to do before and after getting a shot?">What do I need to do before and after getting a shot?</option>
                    <option value="What happen if I don't get injectiton?">What happen if I don't get injectiton?</option>
                    <option value="Is the vaccine covide like the conspiracy theory on Internet (goverment implement tracking chip as liquid and call it as vaccine)?">Is the vaccine covide like the conspiracy theory on Internet (goverment implement tracking chip as liquid and call it as vaccine)?</option>
                    <option value="Are there any case that die after getting shot?">Are there any case that die after getting shot?</option>
                    <option value="If i'm inffected by covid, can I still get a vaccine shot safely?">If i'm inffected by covid, can I still get a vaccine shot safely?</option>
                    <option value="Is vaccine verocel safe to be injected, and how effected is it?">Is vaccine verocel safe to be injected, and how effected is it?</option>
                    <option value="When will Vietnam vaccine be allowed to use?">When will Vietnam vaccine be allowed to use?</option>
                    <option value="Other?">Other?</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please choose a sample Inquiry for consult.
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Message"
                    required
                    onChange={(e) => initialState['message'] = e.target.value}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid message.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicDate">
                  <Form.Label>Date of Consultation</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Date Of Consultation"
                    required
                    onChange={(e) => initialState['dateOfConsultation'] = e.target.value}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid date of consultation.
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
        <Grid container justifyContent="center" spacing={spacing}>
          {vaccines.map((vaccine, idx) => {
            return (
              <Grid key={`vaccine${idx}`} item>

                <Fade in={checked} {...(checked ? { timeout: 1000 } : {})}>
                  <Card
                    className={classes.paper}
                    style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", }}>

                    {/* <CardActionArea style={{padding:0}}>
                      <CardContent> */}
                    <CardMedia image={vaccine.img} style={{ width: "30vw", height: "35vh", margin: "auto" }} alt="..." />
                    {/* </CardContent>
                  </CardActionArea> */}
                  <Container className={classes.container}>
                    <CardContent className={classes.mid}>
                      <Typography className={classes.headText}><b>{vaccine.name}</b></Typography>
                      <Typography className={classes.text}><b>ID:</b> {vaccine.id}</Typography>
                      <Typography className={classes.text}><b>Efficiency:</b> {vaccine.effecientcy}</Typography>
                      <Typography className={classes.text}><b>Description:</b> {vaccine.description}</Typography>
                      <Typography className={classes.text}><b>Country:</b> {vaccine.country}</Typography>
                      <Button2
                        size="large"
                        style={{ color: "#ee9ca7", fontWeight: 'bold' }}
                        startIcon={<FavoriteIcon />}
                        className={classes.text}
                        onClick={() => addLike(idx)}
                      >
                        {vaccine.like}
                      </Button2>
                      </CardContent>
                      <CardActions  className={classes.bot}>
                          <Link to="/register">
                          <Button
                            size="large"
                            style={{ color: "white", fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #aa4465 30%,#861657 90%)', border: 0 }}
                            className={classes.text}

                          >
                            Apply Vaccine
                          </Button>
                          </Link>
                          <Button
                            size="large"
                            className={classes.text}
                            style={{ color: "white", fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #4c4177 30%, #473146  90%)', border: 0  }}
                            onClick={handleShow}
                          >
                            Book A Consult
                          </Button>
                      </CardActions>
                    </Container>
                  </Card>
                </Fade>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
