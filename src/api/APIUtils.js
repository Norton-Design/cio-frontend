// API calls will go here!
// Pull out API url to alternate between Dev and Prod
const BASE_URL = "http://localhost:1323/"

export const fetchCustomersData = async (pageNumber, perPageAmount) => {
    const response = await fetch(BASE_URL + `customers?page=${pageNumber}&per_page=${perPageAmount}`)
    const data = await response.json()
    return data;
}

export const fetchCustomerData = async (customerId) => {
    const response = await fetch(BASE_URL + `customers/${customerId}`)
    const data = await response.json()
    return data
}