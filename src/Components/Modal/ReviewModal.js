import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';

// Buttons
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// Modals
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Route53RecoveryControlConfig } from 'aws-sdk';

const configuration = {
    region: 'us-east-1',
    secretAccessKey: 'RijJPrAkst+a132dzazw+u9ssMWZsbttvvcVOE32',
    accessKeyId: 'AKIA4Y5CM62A3AGGGW2W'
}
AWS.config.update(configuration)

const docClient = new AWS.DynamoDB.DocumentClient()

var ses = new AWS.SES();
var sqs = new AWS.SQS();


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
            alert("Your form has been successfully submitted")
        }
    })
}


export default function ReviewModal() {
    const [reviews, setReview] = useState([]);
    const [registration,setRegistration] = useState([]);
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
    for (const mail of registration){
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
            alert('You have successfully added new review')
            for (var i = 0; i < emailArray.length; i++){

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


    return (
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
                style={{ border: 0, fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}
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
    );
}