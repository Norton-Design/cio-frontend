import { Link } from 'react-router-dom'
import { dateObjToFormatStr } from "../../util/time"

function CustomerListItem(props) {
    const date = new Date(props.customer.last_updated)
    const parsedTime = dateObjToFormatStr(date)
    return (
        <tr>
            <td>{ props.customer.id }</td>
            <td><Link to={ `${props.customer.id}` }>{ props.customer.attributes.email }</Link></td> 
            <td>{ parsedTime }</td>
        </tr>
    )
}

export default CustomerListItem