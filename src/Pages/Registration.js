// AWS STARTS
import * as AWS from 'aws-sdk'
import Divider from '@material-ui/core/Divider';

import {
  Link
} from "react-router-dom";



import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import Button2 from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { v4 as uuid } from 'uuid';
import GetAppIcon from '@material-ui/icons/GetApp';
// Icons
import SendIcon from '@material-ui/icons/Send';

// For cards
import { Grid, Card, CardActionArea, CardActions, CardContent, Typography, CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  control: {
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  paper:
  {
    width: "70vw",
    background: "#fde7f9",
  },
  bot:
  {
    color: 'white',
    background: 'linear-gradient(45deg, #aa4465 30%,#861657 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  icon:
  {
    color: theme.palette.background.default,
  },
  info:
  {
    marginTop: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  divider:
  {
    background: theme.palette.secondary.main,
    margin: "3vh"
  }
}));


const configuration = {
  region: 'us-east-1',
  secretAccessKey: 'RijJPrAkst+a132dzazw+u9ssMWZsbttvvcVOE32',
  accessKeyId: 'AKIA4Y5CM62A3AGGGW2W',
  smtpUsername: 'AKIA4Y5CM62A5U2RIQUR',
  smtpPassword: 'BFid+bWD5no2D1a7gkUoBibbP4rFaDt5EUbIGtcPELjA'
}
AWS.config.update(configuration)

var ses = new AWS.SES();

var bucket = new AWS.S3({
  accessKeyId: 'AKIA4Y5CM62A3AGGGW2W',
  secretAccessKey: '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',
  endpoint: new AWS.Endpoint('s3.amazonaws.com'),
  params: {
    Bucket: 'covidsummary'
  }
})



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
// AWS ENDS

export default function Registration() {

  const [registrations, setRegistrations] = useState([]);
  useEffect(() => {
    axios
      .get('https://bys39xubeg.execute-api.us-east-1.amazonaws.com/reg/registers')
      .then((res) => {
        setRegistrations(res.data.Registers);

      })
      .catch((err) => console.error(err))
  }, []
  )
  console.log(registrations);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialState = {
    fullName: '', Nationality: '', passport: '', dateOfBirth: '',
    gender: '', phone: '', address: '', email: '', link: ''
  }

  const [validated, setValidated] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      initialState['id'] = uuid();

      var fileChooser = document.getElementById('file-chooser')

      var file = fileChooser.files[0]
      var p = {
        Key: file.name,
        ContentType: file.type,
        Body: file,
        ACL: 'public-read'
      }
      bucket.putObject(p, function (err, data) {
        if (err) {
          console.log("Error uploading data to S3: ", err);
        } else {
          console.log("Successfully upload to S3");
        }

      })

      const params = {
        Destination: {
          /* required */
          CcAddresses: [
            /* more items */
          ],
          ToAddresses: [
            initialState['email'], //RECEIVER_ADDRESS
            /* more To-email addresses */
          ],
        },
        Message: {
          /* required */
          Body: {
            /* required */
            Html: {
              Charset: "UTF-8",
              Data: "You successfully registered the vaccination",
            },
            Text: {
              Charset: "UTF-8",
              Data: "You successfully registered the vaccination",
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "Welcome new vaccinator",
          },
        },
        Source: "vaccinationprogramcloudproject@gmail.com", // SENDER_ADDRESS
        ReplyToAddresses: [
          /* more items */
        ],

      };

      ses.sendEmail(params, function (err, res) {
        if (err) {
          console.log("Error uploading data: ", err);
        } else {
          console.log("Successfully send email");
        }
      });
      initialState['link'] = "https://covidsummary.s3.us-east-1.amazonaws.com/" + file.name;
      putData('vaccine-register', initialState);
      alert('You have successfully added new registration')
    }
    setValidated(true);
  }

  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        spacing={2}
        style={{ paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px" }}
        className={classes.root}
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Card
            className={classes.paper}
            style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", }}
          >
            <CardHeader
              className={classes.bot}
              style={{ textAlign: "center" }}
              title=
              {
                <Typography variant="h5"><b>Our Polices and Procedures</b></Typography>
              }
            />
            <CardActionArea>
              <CardContent>
                <Typography color="secondary" variant="h4" style={{ marginTop: "10px", paddingLeft: "10px" }}><b>Benefits of Getting a COVID-19 Vaccine</b></Typography>

                <Divider variant="middle" classes={{ root: classes.divider }} />

                <Typography color="secondary" variant="h6" style={{ marginTop: "10px", paddingLeft: "10px" }}><b>Benefits of Getting a COVID-19 Vaccine</b></Typography>
                <Typography variant="body1" className={classes.info}>
                  COVID-19 vaccines were developed using science that has been around for decades.
                  <br /><br />
                  COVID-19 vaccines have received and continue to undergo the most intensive safety monitoring in U.S. history.
                  Learn more about how federal partners are ensuring COVID-19 vaccines work.
                  <br /><br />
                  COVID-19 vaccines are not experimental. They went through all the required stages of clinical trials.
                  Extensive testing and monitoring have shown that these vaccines are safe and effective.
                </Typography>

                <Divider variant="middle" classes={{ root: classes.divider }} />

                <Typography color="secondary" variant="h6" style={{ marginTop: "10px", paddingLeft: "10px" }}><b>COVID-19 vaccines are effective</b></Typography>
                <Typography variant="body1" className={classes.info}>
                  COVID 19-vaccines are effective. They can keep you from getting and spreading the virus that causes COVID-19.
                  <br /><br />
                  COVID-19 vaccines also help keep you from getting seriously ill even if you do get COVID-19.
                  <br /><br />
                  Getting vaccinated yourself may also protect people around you, particularly people at increased risk for severe
                  illness from COVID-19.
                </Typography>

                <Divider variant="middle" classes={{ root: classes.divider }} />
                <Typography color="secondary" variant="h6" style={{ marginTop: "10px", paddingLeft: "10px" }}><b>Health Declaration</b></Typography>
                <Typography variant="body1" className={classes.info}>
                  To received our vaccine. You must download and fill out the health declaration form below before applying for vaccine.
                  <br /><br />
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.bot}>
              <Button
                size="medium"
                endIcon={<SendIcon />}
                className={classes.icon}
                style={{ marginLeft: "3vw" }}
              >
                  <a size="medium" style={{ textDecoration: 'none', color: 'inherit' }} className={classes.icon} href = "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/covid-19-vaccines" target = "blank">Learn More
                  </a>
              </Button>

              <Button
                size="medium"
                endIcon={<GetAppIcon />}
                className={classes.icon}
              >
                 <a size="medium" style={{ textDecoration: 'none', color: 'inherit' }} className={classes.icon} href = "https://documentcloud.adobe.com/link/review?uri=urn:aaid:scds:US:8b5c0bfc-62d8-4822-97f1-ab7d037e3e37" target = "_blank" download>Link To Download Health Declearation</a>
              </Button>
            </CardActions>
          </Card>
          <br></br>
          <div className="Registration">
            <Button2
              onClick={handleShow}
              style={{ border: 0, fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #4c4177 30%, #473146  90%)' }}
              size="lg"
            >
              Apply For Vaccine
            </Button2>

            <Modal show={show} onHide={handleClose} style={{ border: 0, boderRadius: 5, color: '#FE6B8B', fontWeight: 'bold' }}>
              <Modal.Header
                closeButton
                style={{ backgroundImage: 'linear-gradient(45deg, #aa4465 30%,#861657 90%)' }}
              >
                <Modal.Title style={{ fontWeight: 'bold', color: 'white' }}>Vaccine Application</Modal.Title>
              </Modal.Header>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                  <Form.Group className="mb-3" controlId="formBasicFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter Full Name"
                      onChange={(e) => initialState['fullName'] = e.target.value}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid fullName.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Enter Date Of Birth"
                      required
                      onChange={(e) => initialState['dateOfBirth'] = e.target.value}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid date of birth.
                    </Form.Control.Feedback>
                  </Form.Group>


                  <Form.Group className="mb-3" controlId="formPassport">
                    <Form.Label>Passport</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Passport"
                      required
                      pattern="^(?!^0+$)[a-zA-Z0-9]{3,20}$"
                      onChange={(e) => initialState['passport'] = e.target.value}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid passport.
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      required
                      onChange={(e) => initialState['gender'] = e.target.value}
                    >
                      <option></option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please choose a gender.
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicNationality">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Nationality"
                      required
                      pattern="[A-Za-z]+"
                      onChange={(e) => initialState['Nationality'] = e.target.value}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid nationality.
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                    </Form.Text>
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

                  <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      required
                      onChange={(e) => initialState['address'] = e.target.value}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid address.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" >
                    <Form.Label>Health Declaration File</Form.Label>
                    <Form.Control id="file-chooser"
                      type="file"
                      accept="image/*,.pdf"
                      required
                    // onChange={(e) => initialState['address'] = e.target.value}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please upload your health declaration file in PDF or PNG.
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* <input type="file" id="file-chooser" accept="image/*,.pdf"/> */}

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
                    <Button

                      onClick={handleClose}
                      style={{ boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', border: 0 }}


                    >
                      Cancel
                    </Button>
                    <Button

                      type="submit"
                      style={{ boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #20BF55 30%, #01BAEF 90%)', border: 0 }}


                    >
                      Submit
                    </Button>
                  </ButtonGroup>
                </Modal.Footer>
              </Form>
            </Modal>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
