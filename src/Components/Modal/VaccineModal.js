import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';

// For cards
import { Grid, Card, CardMedia, CardActionArea, CardContent, Typography } from '@material-ui/core'

// For button
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

// Buttons
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import * as AWS from 'aws-sdk'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuid } from 'uuid';

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



export default function VaccineModal() {
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialState = {
    country: '', description: '', effecientcy: '', img: '',
    like: '', name: '', id: ''
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
      putData('vaccine-covid', initialState)
      alert('You have successfully added new vaccine')
      console.log(initialState);
    }
    setValidated(true);
  }

  return (
    <div>
        <Button
          onClick={handleShow}
          style={{ border: 0, fontWeight: 'bold', marginBottom: '20px', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}
          size="lg"
        >
          Add new vaccine
        </Button>
        <Modal show={show} onHide={handleClose} style={{ border: 0, boderRadius: 5, color: '#FE6B8B', fontWeight: 'bold' }}>
            <Modal.Header
            closeButton
            style={{ backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}
            >
            <Modal.Title style={{ fontWeight: 'bold', color: 'white' }}>Vaccine Addition</Modal.Title>
            </Modal.Header>
            <Form id="myform" noValidate validated={validated} onSubmit={handleSubmit} >
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicFullName">
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type="text"
                    required
                    placeholder="Enter Country"
                    onChange={(e) => initialState['country'] = e.target.value}
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid country.
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
                <Form.Label>Effecientcy</Form.Label>
                <Form.Control
                    type="text"
                    required
                    pattern="\b(?<!\.)(?!0+(?:\.0+)?%)(?:\d|[1-9]\d|100)(?:(?<!100)\.\d+)?%"
                    placeholder="Enter percentage out of 100"
                    onChange={(e) => initialState['effecientcy'] = e.target.value}
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid efficiency number (number + %).
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    required
                    onChange={(e) => initialState['name'] = e.target.value}
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid name.
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                </Form.Text>
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
