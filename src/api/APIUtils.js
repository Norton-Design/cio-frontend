// API calls will go here!

export const fetchCustomersData = async (pageNumber, perPageAmount) => {
    const response = await fetch(`http://localhost:1323/customers?page=${pageNumber}&per_page=${perPageAmount}`)
    const data = await response.json()
    return data;
}