import { Component } from "react";
import './index.css'
import Navbar from "../../components/Navbar";

import HomePageBannerImage from '../../assets/home-page-background.jpg'

class HomePage extends Component {
    render () {
        return (
            <div className="home-page">
                <Navbar />
                <div className="home-page-banner-image">
                    <div className="home-page-text">

                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;