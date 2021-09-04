// AWS STARTS
import * as AWS from 'aws-sdk'
import RegistrationModal from '../Components/Modal/RegistrationModal';

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
const params1 = {
  Destination: {
    /* required */
    CcAddresses: [
      /* more items */
    ],
    ToAddresses: [
      "nguyendanghuynhchau15720@gmail.com", //RECEIVER_ADDRESS
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
      ses.sendEmail(params1);
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
      <RegistrationModal />
    </div>
  );
}