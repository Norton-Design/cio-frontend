import { Link } from 'react-router-dom'

function CustomerListItem(props) {
    const time = new Date(props.customer.last_updated)
    console.log(time.toLocaleTimeString())
    return (
        <li>
            <p>{ props.customer.id }</p>
            <Link to={ `customers/${props.customer.id}` }>{ props.customer.attributes.email }</Link>
            <p>{ props.customer.last_updated }</p>
        </li>
    )
}

export default CustomerListItem