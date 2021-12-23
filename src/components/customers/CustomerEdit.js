import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { dateObjToFormatStr } from "../../util/time";
import { fetchCustomerData } from "../../api/APIUtils";
import { patchCustomerData } from "../../api/APIUtils";


function CustomerEdit() {
    const [id, setId] = useState(0); 
    const [originalAttributes, setOriginalAttributes] = useState({})
    const [modifiedAttributes, setModifiedAttributes] = useState({})
    const [parsedTime, setParsedTime] = useState('');
    const urlParams = useParams();

    useEffect(()=>{
        fetchCustomerData(urlParams.id).then(response => {
            const customer = response.customer
            const date = new Date(customer.last_updated)
            const newTime = dateObjToFormatStr(date)
            setId(customer.id)
            setOriginalAttributes(customer.attributes)
            setModifiedAttributes(customer.attributes)
            setParsedTime(newTime)
        })
    }, [])

    const handleRemoveAttribute = attribute => {
        let newAttributes = {...modifiedAttributes};
        delete newAttributes[attribute];
        setModifiedAttributes(newAttributes);
    }
    
    const handleChangeAttribute = (key, value) => {
        let newAttributes = modifiedAttributes;
        newAttributes[key] = value;
        setModifiedAttributes(newAttributes);
    }
    
    const handleDiscardChanges = () => {
        setModifiedAttributes(originalAttributes)
    }

    const handleAddAttribute = () => {
        const name_input = document.getElementById('new_attribute_name_input');
        const value_input = document.getElementById('new_attribute_value_input');
        if (!(name_input.value in modifiedAttributes)) {
            let newAttributes = {...modifiedAttributes};
            newAttributes[name_input.value.trim()] = value_input.value.trim();
            setModifiedAttributes(newAttributes);
            name_input.value = '';
            value_input.value = '';
            name_input.focus()
        } else {
            alert("Customers can't have repeated attributes")
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        for (const key of Object.keys(modifiedAttributes)){
            formData.append(key, modifiedAttributes[key])
        }
        const response = await patchCustomerData(id, formData)
        console.log(response)
    }

    const mutableAttributes = () => {
        let mutables = {}
        for (const [key, value] of Object.entries(modifiedAttributes)){
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
            rows.push(<EditRow key={key} attribute={key} content={value} removable={true} />)
        }
        return rows
    }

    const EditRow = props => {
        const inputToggle = props.editable === false ? 
            <dd className="w-7/12 py-2 mt-0.5" >{props.content}</dd> : 
            <dd className="w-7/12"><input 
                className="w-full p-2 rounded border border-gray-400 mt-0.5" 
                type="text" 
                defaultValue={props.content} 
                onChange={ (event)=>{handleChangeAttribute(props.attribute, event.target.value)} }/>
            </dd>
        const removableToggle = props.removable === true ? 
            <button className="self-center pl-4 underline transition text-red-600 hover:cursor-pointer hover:text-red-800" onClick={()=>handleRemoveAttribute(props.attribute)}>Remove</button> : 
            <></>
        return (
            <div className="flex">
                <dt className="w-4/12 p-2 align-bottom text-gray-500">{props.attribute}</dt>
                { inputToggle }
                { removableToggle }
            </div>
        )
    }

    let builtMutableRows = buildRows(mutableAttributes())

    return (
        <div className="min-w-screen min-h-screen bg-gray-100 flex justify-center bg-gray-100 text-gray-700"> 
            <div className="w-9/12 my-6"> 
                <div className="flex justify-between" >
                    <div>
                        <h1 className="text-4xl font-medium mb-4">{originalAttributes.email}</h1>
                        <p>Last updated: { parsedTime }</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-3xl font-medium mb-2">Attributes</h2>
                    <form className="w-full" id="attribute-form" onSubmit={handleFormSubmit}>
                        <dl>
                            <EditRow attribute="id" content={id} editable={false}/>
                            <EditRow attribute="email" content={modifiedAttributes.email} />
                            <EditRow attribute="created_at" content={modifiedAttributes.created_at}/>
                            { builtMutableRows }
                        </dl>
                    </form>
                </div>

                    <div className="flex my-10">
                        <dt className="w-screen">
                            <input className="w-full p-2 rounded border border-gray-400 mt-2" type="text" placeholder="name" id="new_attribute_name_input" />
                        </dt>
                        <dd className="w-screen">
                            <input className="w-full p-2 rounded border border-gray-400 m-2" type="text" placeholder="value" id="new_attribute_value_input" />
                        </dd>
                        <input className="self-center pl-8 underline transition text-gray-400 hover:cursor-pointer hover:text-gray-800 mr-8" type="button" onClick={handleAddAttribute} value="Add" />
                    </div>
                    <div className="flex justify-end">
                        <input className="underline mx-4 hover:cursor-pointer" form="attribute-form" type="reset" value="Discard Changes" onClick={handleDiscardChanges}/>
                        <button className="px-6 py-3 bold bg-violet-600 h-12 transition-colors hover:bg-violet-500 text-white rounded font-medium" form="attribute-form">Save Changes</button>
                    </div>
            </div>
        </div>
    )
}

export default CustomerEdit



