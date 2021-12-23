import React, { useState, useEffect } from "react";
import CustomerListItem from "./CustomerListItem";
import { fetchCustomersData } from "../../api/APIUtils"

function CustomerList(props) {
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPageAmount, setPerPageAmount] = useState(25);

    useEffect(()=>{
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
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    { list.map(customer => <CustomerListItem key={customer.id} customer={customer}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default CustomerList;