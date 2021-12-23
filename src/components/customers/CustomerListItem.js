import { Link } from 'react-router-dom'
import { dateObjToFormatStr } from "../../util/time"

function CustomerListItem(props) {
    const date = new Date(props.customer.last_updated)
    const parsedTime = dateObjToFormatStr(date)
    return (
        <tr className="border-b border-gray-200 odd:bg-gray-100 hover:bg-sky-100">
            <td className="py-3 px-6 text-left whitespace-nowrap">{ props.customer.id }</td>
            <td className="py-3 px-6 text-left whitespace-nowrap underline"><Link to={ `${props.customer.id}` }>{ props.customer.attributes.email }</Link></td> 
            <td className="py-3 px-6 text-right whitespace-nowrap">{ parsedTime }</td>
        </tr>
    )
}

export default CustomerListItem