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
             <dd>{props.content}</dd> : <dd><input type="text" 
                defaultValue={props.content} 
                onChange={ (event)=>{handleChangeAttribute(props.attribute, event.target.value)} }/>
            </dd>
        const removableToggle = props.removable === true ? <a onClick={()=>handleRemoveAttribute(props.attribute)}>Remove</a> : <></>
        return (
            <>
                <dt>{props.attribute}</dt>
                { inputToggle }
                { removableToggle }
            </>
        )
    }

    let builtMutableRows = buildRows(mutableAttributes())

    return (
        <> 
            <div>
                <div>
                    <h1>{originalAttributes.email}</h1>
                    <p>Last updated: { parsedTime }</p>
                </div>
            </div>

            <h2>Attributes</h2>
            <form id="attribute-form" onSubmit={handleFormSubmit}>
                <dl>
                    <EditRow attribute="id" content={id} editable={false}/>
                    <EditRow attribute="email" content={modifiedAttributes.email} />
                    <EditRow attribute="created_at" content={modifiedAttributes.created_at}/>
                    { builtMutableRows }
                </dl>
            </form>

                <div>
                    <dt>
                        <input type="text" placeholder="name" id="new_attribute_name_input" />
                    </dt>
                    <dd>
                        <input type="text" placeholder="value" id="new_attribute_value_input" />
                    </dd>
                    <input type="button" onClick={handleAddAttribute} value="Add" />
                </div>
                <input form="attribute-form" type="reset" value="Discard Changes" onClick={handleDiscardChanges}/>
                <button form="attribute-form">Save Changes</button>
        </>
    )
}

export default CustomerEdit



