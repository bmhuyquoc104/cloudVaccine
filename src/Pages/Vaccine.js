import React from 'react';
import axios from "axios"
import { useState, useEffect } from "react"

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

    return (
        <div className = "Vaccine">
            {vaccines.map((vaccine, idx) => {
                return (
                    <div key={`vaccine${idx}`}>
                        <p>{vaccine.id}</p>
                        <p>{vaccine.name}</p>
                        <p>{vaccine.effecientcy}</p>
                        <p>{vaccine.img}</p>
                        <p>{vaccine.like}</p>
                        <p>{vaccine.country}</p>
                    </div>
                )
            })}
        </div>
    );
}
