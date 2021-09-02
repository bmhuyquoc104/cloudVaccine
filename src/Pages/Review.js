import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuid } from 'uuid';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import * as AWS from 'aws-sdk'
import IconButton from '@material-ui/core/IconButton';

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
        } else {
            initialState['id'] = uuid();
            initialState['like'] = 0;
            initialState['dislike'] = 0;
            putData('vaccine-review', initialState)
            console.log(initialState);
        }
        setValidated(true);
    }

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

  
    return (
        <div className="Review">

            {reviews.map((review, idx) => {
                return (
                    <div key={`review${idx}`}>
                        <p>{review.author}</p>
                        {/* <p>{review.description}</p> */}
                        <IconButton onClick={() => addLikeOrDislike(idx,1)}>  
                            <ThumbUpIcon/>
                        </IconButton>
                        {review.like}
                        <IconButton onClick={() => addLikeOrDislike(idx,2)}>
                            <ThumbDownAltIcon/>
                        </IconButton>
                        {review.dislike}
                        {/* <p>{review.id}</p>
                        <p>{review.rate}</p>
                        <p>{review.phone}</p>
                        <p>{review.email}</p>
                        <p>{review.vaccine}</p> */}
                    </div>
                )
            })}
            <Button variant="primary" onClick={handleShow}>
                Apply For Review
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Review Application</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
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




