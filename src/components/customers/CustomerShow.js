import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import { dateObjToFormatStr } from "../../util/time"
import { fetchCustomerData } from "../../api/APIUtils"


function CustomerShow(props) {
    const [id, setId] = useState(0); 
    const [events, setEvents] = useState({});
    const [attributes, setAttributes] = useState({})
    const [parsedTime, setParsedTime] = useState('')
    const urlParams = useParams();

    useEffect(()=>{
        fetchCustomerData(urlParams.id).then(response => {
            const customer = response.customer
            if (customer && customer.events){
                setEvents(customer.events);
            }
            setId(customer.id)
            setAttributes(customer.attributes)
            let date = new Date(customer.last_updated)
            setParsedTime(dateObjToFormatStr(date))
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
        <div className="min-w-screen min-h-screen bg-gray-100 flex justify-center bg-gray-100 text-gray-700"> 
            <div className="w-9/12 my-6">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-4xl font-medium mb-4">{attributes.email}</h1>
                        <p>Last updated: { parsedTime }</p>
                    </div>
                    <Link className="p-3 bold bg-violet-600 h-12 transition-colors hover:bg-violet-500 text-white rounded" to={`edit`} >Edit Attributes</Link>
                </div>

                <div className="mt-6">
                    <h2 className="text-3xl font-medium mb-2">Attributes</h2>
                    <table className="w-full">
                        <tbody>
                            <ShowRow attribute="id" content={id}/>
                            <ShowRow attribute="email" content={attributes.email}/>
                            <ShowRow attribute="created_at" content={attributes.created_at}/>
                            { buildRows(mutableAttributes()) }
                        </tbody>
                    </table>
                </div>
                <div className="mt-6 w-full">
                    <h2 className="text-3xl font-medium mb-2">Events</h2>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-200 w-full text-left border border-gray-300 border-t-0 border-l-0 border-r-0">
                                <th className="w-4/12 font-normal pl-2 py-2">Event Name</th>
                                <th className="font-normal py-2">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            { buildRows(events) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CustomerShow

function ShowRow(props){
    return (
        <tr>
            <td className="p-2 w-4/12 text-gray-500">{props.attribute}</td>
            <td className="p-2">{props.content}</td>
        </tr>
    )
}