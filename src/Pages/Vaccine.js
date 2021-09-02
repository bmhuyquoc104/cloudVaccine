import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import * as AWS from 'aws-sdk'
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
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
    const addLike = async (idx) =>{
        if(click === false ){
            vaccines[idx].like +=1;
            await putData('vaccine-covid',vaccines[idx]);
            console.log(vaccines[idx]);
            click = true;
        }
        else{
            vaccines[idx].like -=1;
            await putData('vaccine-covid',vaccines[idx]);
            console.log(vaccines[idx]);
            click = false;
        }
    }

    return (
        <div className = "Vaccine">
            {vaccines.map((vaccine, idx) => {
                return (
                    <div key={`vaccine${idx}`}>
                        <p>{vaccine.id}</p>
                        <p>{vaccine.name}</p>
                        <p>{vaccine.effecientcy}</p>
                        <p>{vaccine.img}</p>
                        <div>
                        <IconButton onClick={() => addLike(idx)}>  
                        <FavoriteBorderRoundedIcon/>
                        </IconButton>
                        {vaccine.like}
                        </div>
                        <p>{vaccine.country}</p>
                    </div>
                )
            })}
        </div>
    );
}
