import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"

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
 import Container from '@material-ui/core/Container';

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
    console.log(reviews)

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
        name:
        {
            fontWeight: 'bold',
            color: theme.palette.secondary.dark
        },
        container: 
        {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
        },
        text: 
        {
            fontWeight: 'bold',
            fontSize: 40,
            fontFamily: 'Roboto',
            color: theme.palette.secondary.dark
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

    return (
                    <Container className={classes.container}>
                        <Typography className={classes.text}>Reviews</Typography>
                        <TableContainer component={Paper} className={classes.tableContainer} fullWidth>
                            <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeaderCell}>Author</TableCell>
                                    <TableCell className={classes.tableHeaderCell}>ID</TableCell>
                                    <TableCell className={classes.tableHeaderCell}>Description</TableCell>
                                    <TableCell className={classes.tableHeaderCell}>Rate</TableCell>
                                    <TableCell className={classes.tableHeaderCell}>Dislike</TableCell>
                                    <TableCell className={classes.tableHeaderCell}>Like</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((review, idx) => (
                                    <TableRow key={`review${idx}`}>
                                        <TableCell>
                                            <Typography className={classes.name}>{review.author}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            {review.id}
                                        </TableCell>
                                        <TableCell>
                                            {review.description}
                                        </TableCell>
                                        <TableCell>
                                            {review.rate}
                                        </TableCell>
                                        <TableCell>
                                            {review.dislike}
                                        </TableCell>
                                        <TableCell>
                                            {review.like}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                component="div"
                                count={reviews.length}
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




