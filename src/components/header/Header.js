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
            <div className="w-full py-6 bg-white w-screen">
                <div className="flex items-center justify-between mx-auto xl:max-w-7xl lg:max-w-3xl md:px-2 px-4">
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
            </div>
        )
    }
}

export default Header