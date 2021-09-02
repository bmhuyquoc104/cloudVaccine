import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuid } from 'uuid';

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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(initialState);
  }
  
  return (
    <div className="Registration">
      {registrations.map((registration, idx) => {
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
      })}
      <Button variant="primary" onClick={handleShow}>
        Apply For Vaccine
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vaccine Application</Modal.Title>
        </Modal.Header>
        <Form >
          <Modal.Body>
            <Form.Control
              type="hidden"      
              value = {uuid()}  
              />
            <Form.Group className="mb-3" controlId="formBasicFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter Full Name"
                onChange={(e) => initialState['fullName'] = e.target.value}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Date Of Birth"
                required
                onChange={(e) => initialState['dateOfBirth'] = e.target.value}
                />
            </Form.Group>

           
            <Form.Group className="mb-3" controlId="formPassport">
              <Form.Label>Passport</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Passport"
                required
                onChange={(e) => initialState['passport'] = e.target.value}
              />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Gender"
                required
                onChange={(e) => initialState['gender'] = e.target.value}
              />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNationality">
              <Form.Label>Nationality</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Nationality"
                required
                onChange={(e) => initialState['Nationality'] = e.target.value}
              />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) => initialState['email'] = e.target.value}
                 />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="phone"
                placeholder="Phone"
                required
                onChange={(e) => initialState['phone'] = e.target.value}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                required
                onChange={(e) => initialState['address'] = e.target.value}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Agree " />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}




