import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import { dateObjToFormatStr } from "../../util/time"
import { fetchCustomerData } from "../../api/APIUtils"


function CustomerShow(props) {
    const [customer, setCustomer] = useState({});
    const [id, setId] = useState(0); 
    const [events, setEvents] = useState({});
    const [attributes, setAttributes] = useState({})
    const [lastUpdated, setLastUpdated] = useState(0)

    const urlParams = useParams();
    let date;
    let parsedTime;

    useEffect(()=>{
        fetchCustomerData(urlParams.id).then(response => {
            const customer = response.customer
            console.log(customer)
            if (customer && customer.events){
                setEvents(customer.events);
            }
            setCustomer(customer);
            setId(customer.id)
            setAttributes(customer.attributes)
            setLastUpdated(customer.last_updated)
            date = new Date(customer.last_updated)
            parsedTime = dateObjToFormatStr(date)
        })

    }, [])

    const mutableAttributes = () => {
        let mutables = {}
        for (const [key, value] of Object.entries(attributes)){
            if (key === 'email' || key === 'created_at'){
                continue;
            } else {
                mutables[key] = value
            }
        }
        return mutables;
    }

    const buildRows = obj => {
        let rows = []
        for (const [key, value] of Object.entries(obj)){
            rows.push(<ShowRow key={key} attribute={key} content={value} />)
        }
        return rows
    }

    return (
        <> 
            <div>
                <div>
                    <h1>{attributes.email}</h1>
                    <p>Last updated: { parsedTime }</p>
                </div>
                <Link to={`edit`} >Edit Attributes</Link>
            </div>

            <h2>Attributes</h2>
            <ul>
                <ShowRow attribute="id" content={id}/>
                <ShowRow attribute="email" content={attributes.email}/>
                <ShowRow attribute="created_at" content={attributes.created_at}/>
                { buildRows(mutableAttributes()) }
            </ul>
            <h2>Events</h2>
            <ul>
                <ShowRow attribute="Event Name" content="Count"/>
                { buildRows(events) }
            </ul>
        </>
    )
}

export default CustomerShow

function ShowRow(props){
    return (
        <li>
            <dt>{props.attribute}</dt>
            <dd>{props.content}</dd>
        </li>
    )
}