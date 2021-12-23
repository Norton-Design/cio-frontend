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

export const patchCustomerData = async (customerId, customerFormData) => {
    const response = await fetch(BASE_URL + `customers/${customerId}`, {
        method: "PATCH",
        body: JSON.stringify({ "customer": { 
            "attributes" : customerFormData
            }
        }),
        headers: {
            'Content-Type': 'application/json'
          },
    });

    const data = await response.json()
    return data;
}