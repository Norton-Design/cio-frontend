import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import { dateObjToFormatStr } from "../../util/time"
import { fetchCustomerData } from "../../api/APIUtils"


function CustomerShow(props) {
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
            if (customer && customer.events){
                setEvents(customer.events);
            }
            setId(customer.id)
            setAttributes(customer.attributes)
            setLastUpdated(customer.last_updated)
            date = new Date(customer.last_updated)
            parsedTime = dateObjToFormatStr(date)
        })
    }, [urlParams.id])

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
            <table>
                <tbody>
                    <ShowRow attribute="id" content={id}/>
                    <ShowRow attribute="email" content={attributes.email}/>
                    <ShowRow attribute="created_at" content={attributes.created_at}/>
                    { buildRows(mutableAttributes()) }
                </tbody>
            </table>
            <h2>Events</h2>
            <table>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    { buildRows(events) }
                </tbody>
            </table>
        </>
    )
}

export default CustomerShow

function ShowRow(props){
    return (
        <tr>
            <td>{props.attribute}</td>
            <td>{props.content}</td>
        </tr>
    )
}