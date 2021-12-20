import { Link } from 'react-router-dom'
import { dateObjToFormatStr } from "../../util/time"

function CustomerListItem(props) {
    const date = new Date(props.customer.last_updated)
    const parsedTime = dateObjToFormatStr(date)
    return (
        <li>
            <p>{ props.customer.id }</p>
            <Link to={ `customers/${props.customer.id}` }>{ props.customer.attributes.email }</Link>
            <p>{ parsedTime }</p>
        </li>
    )
}

export default CustomerListItem