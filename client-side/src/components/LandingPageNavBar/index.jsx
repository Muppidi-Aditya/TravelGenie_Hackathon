import { Component } from "react";
import './index.css'

import LogoImage from '../../assets/sample1.png'

class LandingPageNavBar extends Component {
    render () {
        return (
            <div className="landing-page-nav-bar">
                <img src={LogoImage} className="landing-logo-image" />
                {/* <button className="landing-page-btn"> Get Started </button> */}
            </div>
        )
    }
}

export default LandingPageNavBar;