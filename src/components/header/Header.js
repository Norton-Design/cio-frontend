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
            <div className="py-6 bg-indigo-900 w-screen">
                <div className="flex justify-between mx-auto w-9/12 text-white font-bold">
                    <div className="flex items-end">
                        <h3 className="mr-5 text-2xl bold">Customer.io</h3>
                        <nav>
                            <Link className="mr-5 underline" to="/">Home</Link>
                            <Link  className="mr-5 underline"to="/customers">Customers</Link>
                        </nav>
                    </div>

                    <div className="flex items-end">
                        <h2 className="ml-5">{ this.username }</h2>
                        <button className="ml-5 underline font-bold" role="button" onClick={ this.logout }>Log out</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header