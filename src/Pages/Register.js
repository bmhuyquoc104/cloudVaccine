import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"

// For input form
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import {
    Lock as LockIcon,
    Settings as SettingsIcon,  
    User as UserIcon,
    UserPlus as UserPlusIcon,
    Users as UsersIcon
} from 'react-feather';

// For modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// For table
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableFooter,
    Paper,
    Typography
 } from '@material-ui/core';

export default function Register() {

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
    console.log(registrations)

    const useStyles = makeStyles((theme) => ({
        table: { minWidth: 650,},
        tableContainer:
        {
            borderRadius: 15,
            margin: '10px 10px'
        },
        tableHeaderCell:
        {
            fontWeight: 'bold',
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.background.default
        },
        field:
        {
            marginTop: 20,
            marginBottom: 20,
            display: 'block',
            width: 800,
            minWidth: 100
        },
        name:
        {
            fontWeight: 'bold',
            color: theme.palette.secondary.dark
        },
        container: 
        {
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
        },
        button: {
            margin: theme.spacing(1),
            justifyContent: 'center',
            flexDirection: 'row',
        },
        text: 
        {
            fontWeight: 'bold',
            fontSize: 40,
            fontFamily: 'Roboto',
            color: theme.palette.secondary.dark
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }));

    const classes = useStyles();

    // For pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // For modal form
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container className={classes.container}>
            <Typography className={classes.text}>Covid-19 vaccine registration for individual</Typography>
            
            <Button className={classes.button}
                size="large"
                variant="contained"
                color="primary"
                onClick={handleOpen}
                startIcon={<PersonAddIcon />}>
                Register
            </Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <form noValidate autoComplete="off">
                        <TextField
                            label="Full name"
                            variant="outlined"
                            color="primary"
                            fullWidth
                            required
                            className={classes.field}
                            // onChange={event => setInput('fullName', event.target.value)}
                            // value={formState.fullName}
                        />
                        <TextField
                            label="Nationality"
                            variant="outlined"
                            color="primary"
                            fullWidth
                            required
                            className={classes.field}
                            // onChange={event => setInput('nationality', event.target.value)}
                            // value={formState.nationality}
                        />
                        <TextField
                            label="Passport"
                            variant="outlined"
                            color="primary"
                            fullWidth
                            required
                            className={classes.field}
                            // onChange={event => setInput('passport', event.target.value)}
                            // value={formState.passport}
                        />
                        <TextField
                            label="Date of birth"
                            variant="outlined"
                            color="primary"
                            fullWidth
                            required
                            className={classes.field}
                            // onChange={event => setInput('dateofbirth', event.target.value)}
                            // value={formState.dateofbirth}
                        />
                        <TextField
                            label="Gender"
                            variant="outlined"
                            color="primary"
                            fullWidth
                            required
                            className={classes.field}
                            // onChange={event => setInput('gender', event.target.value)}
                            // value={formState.gender}
                        />
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={handleClose}
                            startIcon={<SaveIcon />}>
                            Register
                        </Button>
                    </form>
                </div>
                </Fade>
            </Modal>
            
            <TableContainer component={Paper} className={classes.tableContainer} fullWidth>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}>Full name</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Nationality</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Passport</TableCell>
                        <TableCell className={classes.tableHeaderCell}>DoB</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Gender</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {registrations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((registration, idx) => (
                        <TableRow key={`registration${idx}`}>
                            <TableCell>
                                <Typography className={classes.name}>{registration.fullName}</Typography>
                            </TableCell>
                            <TableCell>
                                {registration.Nationality}
                            </TableCell>
                            <TableCell>
                                {registration.passport}
                            </TableCell>
                            <TableCell>
                                {registration.dateOfBirth}
                            </TableCell>
                            <TableCell>
                                {registration.gender}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={registrations.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </TableFooter>
                </Table>
            </TableContainer>
        </Container>
    );
}




