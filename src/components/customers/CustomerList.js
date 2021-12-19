import React, { useState, useEffect } from "react";
import CustomerListItem from "./CustomerListItem";
import { fetchCustomersData } from "../../api/APIUtils"

function CustomerList(props) {
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPageAmount, setPerPageAmount] = useState(25);

    useEffect(()=> {
        fetchCustomersData(currentPage, perPageAmount).then(response => {
            if (response.meta){
                const metaData = response.meta
                setCurrentPage(metaData.page)
                setTotalPages(metaData.total)
                setPerPageAmount(metaData.per_page)
            }
            setList(response.customers)
        })
    }, [])

    return (
        <div>
            <h1>Customers</h1>
            <ul>
                <li>
                    <h2>ID</h2>
                    <h2>Email</h2>
                    <h2>Last Updated</h2>
                </li>
                { list.map(customer => <CustomerListItem key={customer.id} customer={customer}/>)}
            </ul>
        </div>
    )
}

export default CustomerList;