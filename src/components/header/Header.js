import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this);
        this.username = "take-home@customer.io";
    }
    
    logout () {
        alert("Will be implemented after the Login is complete...")
    }

    render () {
        return (
            <div>
                <div>Customer.io</div>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/customers">Customers</Link>
                </nav>

                <div>
                    <h2>{ this.username }</h2>
                    <button role="button" onClick={ this.logout }>Logout</button>
                </div>
            </div>
        )
    }
}

export default Header