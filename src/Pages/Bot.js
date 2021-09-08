import React from 'react';
// Buttons
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// Modals
import Form from 'react-bootstrap/Form';
import { TextField } from '@material-ui/core';
export default function Bot() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const initialState = {
        question: ''
    }

    return (
        <div className="bot">
            <h1 style={{ color: 'white' }}>This page is made for bot</h1>
            <Form id="myform" onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Ask me please</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Ask Me Please !!!!"
                        required
                        onChange={(e) => initialState['question'] = e.target.value}
                    />

                </Form.Group>
                <ButtonGroup className="mb-2">
                    <Button type="submit" style={{ fontWeight: 'bold', backgroundImage: 'linear-gradient(45deg, #20BF55 30%, #01BAEF 90%)', border: 0 }}>
                        Search
                    </Button>
                </ButtonGroup>
            </Form>

            <TextField
                id="answer"
                label="Waiting for message"
                variant="filled"
                color="blue"
                background-color= 'red'
            />
        </div>
    )
}