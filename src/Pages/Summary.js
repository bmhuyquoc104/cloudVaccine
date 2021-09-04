import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"
import * as AWS from 'aws-sdk'
export default function Summary() {


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
        setTimeout(() => {
            docClient.put(params, function (err, data) {
                if (err) {
                    console.log('Error', err)
                } else {
                    console.log('Success', data)
                }
            })
        }, 50)
    }


    const [summaries, setSummaries] = useState([]);
    useEffect(() => {
        axios
            .get('https://api.covid19api.com/summary')
            .then((res) => {
                setSummaries(res.data.Countries);

            })
            .catch((err) => console.error(err))
    }, []
    )

    for (const summary of summaries) {
        putData('allCountry-summary', summary);
    }


    return (
        <div className="summary">
            <h1 style={{ color: "rgb(86, 100, 210)" }}>huy</h1>
            {/* <a href="https://imgur.com/3kkytsv"><img src="https://i.imgur.com/3kkytsv.png" title="source: imgur.com" /></a> */}
            <img src="https://i.imgur.com/ToDMYPT.png"></img>
        </div>
    )
}