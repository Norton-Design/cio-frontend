import React, { useState, useEffect } from "react";
import CustomerListItem from "./CustomerListItem";
import { fetchCustomersData } from "../../api/APIUtils"
import { Link, useSearchParams } from 'react-router-dom';

function CustomerList(props) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState( searchParams.get('page') || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPageAmount, setPerPageAmount] = useState( searchParams.get('per_page') || 25);

    useEffect(()=>{
        fetchCustomersData(currentPage, perPageAmount).then(response => {
            if (response.meta){
                const metaData = response.meta
                const responseTotalPages = Math.ceil(metaData.total / metaData.per_page)
                setCurrentPage(metaData.page)
                setTotalPages(responseTotalPages)
                setPerPageAmount(metaData.per_page)
            }
            setList(response.customers)
        })
    }, [currentPage, perPageAmount])

    const prevPageLink = currentPage > 1 ? 
        <Link 
            className="mx-6 border p-2 rounded shadow-md hover:bg-sky-200" 
            to={`/customers?page=${currentPage - 1}&per_page=${perPageAmount}`}
            onClick={()=>{setCurrentPage(currentPage - 1)}}>Previous
        </Link> : 
        <></>;
    const nextPageLink = currentPage < totalPages && totalPages > 1 ? 
        <Link 
            className="mx-6 border p-2 rounded shadow-md hover:bg-sky-200" 
            to={`/customers?page=${currentPage + 1}&per_page=${perPageAmount}`} 
            onClick={()=>{setCurrentPage(currentPage + 1)}}>Next {perPageAmount}
        </Link> : 
        <></> ;

    return (
        <div className="overflow-x-auto">
            <div className="min-w-screen min-h-screen bg-gray-100 flex justify-center bg-gray-100">
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
                    <div className="flex justify-center items-center">
                        { prevPageLink }
                        { nextPageLink }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerList;