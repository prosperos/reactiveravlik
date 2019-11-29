import React, { Component} from 'react'

import "../components/base.scss"

import OurServices from "../components/Home/OurServices/OurServices";
import ProducionOurProducts from "../components/Home/ProducionOurProducts/ProducionOurProducts";
import HomeExport from "../components/Home/HomeExport/HomeExport";
import AboutUs from "../components/AboutUs/AboutUs";
import Footer from "../common/Footer/Footer";
import Header from "../common/Header/Header";

export default class About extends Component{
    render() {
        return(
            <div>
                <Header/>
                <div className="about-wrapper">
                    <AboutUs />
                    <div className="wrapper_services">
                        <OurServices />
                    </div>
                    <ProducionOurProducts/>
                    <HomeExport/>
                </div>
                <Footer/>
            </div>
        );
    }
}