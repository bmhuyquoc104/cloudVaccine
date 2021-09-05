import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import { Grid, Card, CardMedia, CardActionArea, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import * as AWS from 'aws-sdk'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root:
  {
    flexGrow: 1,
  },
  paper:
  {
    width: 300,
  },
  control:
  {
    padding: theme.spacing(2),
  },
  bot:
  {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  text:
  {
    color: 'white'
  }
}));

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



export default function Vaccine() {
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

  var click = false;
  var allHeartContainers = document.getElementsByClassName("MuiGrid-root MuiGrid-item");
  var ThuCoBeXinhXan;

  for (const item of allHeartContainers) {
    ThuCoBeXinhXan = item.getElementsByTagName('div');
  }

  console.log(ThuCoBeXinhXan)


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



  // <button class="MuiButtonBase-root MuiIconButton-root" tabindex="0" type="button"><span class="MuiIconButton-label"><svg class="MuiSvgIcon-root makeStyles-text-23" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg></span><span class="MuiTouchRipple-root"></span></button>
  const addLike = async (idx) => {
    if (click === false) {
      vaccines[idx].like += 1;
      await putData('vaccine-covid', vaccines[idx]);
      console.log(vaccines[idx]);
      click = true;
    }
    else {
      vaccines[idx].like -= 1;
      await putData('vaccine-covid', vaccines[idx]);
      console.log(vaccines[idx]);
      click = false;
    }
  }

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();


  return (
    <Grid container spacing={2} style={{ paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px" }} className={classes.root}>
      <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button
          onClick={handleShow}
          style={{ border: 0, fontWeight: 'bold', marginBottom: '20px', backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}
          size="lg"
        >
          Add new vaccine
        </Button>
        <Grid container justifyContent="center" spacing={spacing}>

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
          {vaccines.map((vaccine, idx) => {
            return (
              <Grid key={`vaccine${idx}`} item>
                <Card
                  className={classes.paper}
                  style={{ border: "none", boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", borderRadius: "15px", }}>
                  <CardActionArea>
                    <CardContent>
                      <CardMedia image={vaccine.img} style={{ width: "150px", height: "200px", margin: "auto" }} alt="..." />
                    </CardContent>
                  </CardActionArea>

                  <CardContent className={classes.bot}>
                    <Typography className={classes.text}><b>{vaccine.name}</b></Typography>
                    <Typography className={classes.text}><b>ID:</b> {vaccine.id}</Typography>
                    <Typography className={classes.text}><b>Efficiency:</b> {vaccine.effecientcy}</Typography>
                    <Typography className={classes.text}><IconButton onClick={() => addLike(idx)}>
                      <FavoriteIcon className={classes.text} />
                    </IconButton> {vaccine.like}</Typography>
                    <Typography className={classes.text}><b>Country:</b> {vaccine.country}</Typography>
                    <Typography className={classes.text}><b>Country:</b> {vaccine.country}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
