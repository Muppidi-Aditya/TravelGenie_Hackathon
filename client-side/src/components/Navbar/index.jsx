import { Component } from "react";
import './index.css'

import WebsiteLogo from '../../assets/websitelogo-1.png';

class Navbar extends Component {
    render () {
        return (
            <div className="home-page-navbar">
                <img src = {WebsiteLogo} />
                <ul>
                    <li> HOME </li>
                    <li> MY TRIP </li>
                    <li> GROUPS </li>
                    <li> POSTING </li>
                    <li> PAST TRIPS </li>
                </ul>
                <button> SIGN OUT </button>
            </div>
        )
    }
}

export default Navbar;