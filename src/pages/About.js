import React, { Component} from 'react'

import "../components/base.scss"

import OurServices from "../components/Home/OurServices/OurServices";
import ProducionOurProducts from "../components/Home/ProducionOurProducts/ProducionOurProducts";
import HomeExport from "../components/Home/HomeExport/HomeExport";
import AboutUs from "../components/AboutUs/AboutUs";
import Footer from "../common/Footer/Footer";

export default class About extends Component{
    render() {
        return(
            <div>
                <AboutUs />
                <div className="wrapper_services">
                    <OurServices />
                </div>
                <ProducionOurProducts/>
                <HomeExport/>
                <Footer/>
            </div>
        );
    }
}