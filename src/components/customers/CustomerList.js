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
        <div className="overflow-x-auto">
            <div className="min-w-screen min-h-screen bg-gray-100 flex justify-center bg-gray-100 font-sans overflow-hidden">
                <div className="w-9/12 my-6">
                <h1 className="text-4xl font-bold">Customers</h1>
                <div className="w-full">
                    <div className="bg-white shadow-md -rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="text-gray-800 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">ID</th>
                                    <th className="py-3 px-6 text-left">Email</th>
                                    <th className="py-3 px-6 text-right">Last Updated</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900 text-sm">
                                { list.map(customer => <CustomerListItem key={customer.id} customer={customer}/>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerList;