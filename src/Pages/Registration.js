// AWS STARTS
import * as AWS from 'aws-sdk'

import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuid } from 'uuid';
const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./lib/sesClient.js");



const configuration = {
  region: 'us-east-1',
  secretAccessKey: 'RijJPrAkst+a132dzazw+u9ssMWZsbttvvcVOE32',
  accessKeyId: 'AKIA4Y5CM62A3AGGGW2W',
  smtpUsername: 'AKIA4Y5CM62A5U2RIQUR',
  smtpPassword: 'BFid+bWD5no2D1a7gkUoBibbP4rFaDt5EUbIGtcPELjA'
}
AWS.config.update(configuration)

var ses = new AWS.SES();
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialState = {
    fullName: '', Nationality: '', passport: '', dateOfBirth: '',
    gender: '', phone: '', address: '', email: ''
  }

  const [validated, setValidated] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      initialState['id'] = uuid();
      putData('vaccine-register', initialState);
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
        Source: "nguyendanghuynhchau15720@gmail.com", // SENDER_ADDRESS
        ReplyToAddresses: [
          /* more items */
        ],
      };
      const email = { EmailAddress: "nguyendanghuynhchau15720@gmail.com" };
      ses.sendEmail(params, function (err, res) {
        if (err) {
            console.log("Error uploading data: ", err);
        } else {
            console.log("Successfully send email");
        }
    });
      console.log(initialState);
    }
    setValidated(true);
  }

  return (
    <div className="Registration">
      {/* {registrations.map((registration, idx) => {
        return (
          <div key={`registration${idx}`}>
            <p>{registration.dateOfBirth}</p>
            <p>{registration.passport}</p>
            <p>{registration.fullName}</p>
            <p>{registration.id}</p>
            <p>{registration.gender}</p>
            <p>{registration.Nationality}</p>
          </div>
        )
      })} */}
      <Button variant="primary" onClick={handleShow}>
        Apply For Vaccine
      </Button>
      <Modal show={show} onHide={handleClose} style={{color: '#1abc9c', fontWeight: 'bold'}}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontWeight: 'bold'}}>Vaccine Application</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{backgroundColor: '#F0F8FF'}}>
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
                pattern = "^(?!^0+$)[a-zA-Z0-9]{3,20}$"
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
                <option value="O">Andrew</option>
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
                pattern = "[A-Za-z]+"
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
                pattern = "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
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

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox"
                label="Agree to send your information to us "
                required
                feedback="You must agree before submitting."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}