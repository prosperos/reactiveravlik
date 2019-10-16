import React, { Component} from 'react'

import "../components/base.scss"
import HomeBanner from "../components/Home/HomeBanner/HomeBanner"
import HomeAboutUs from "../components/Home/HomeAboutUs/HomeAboutUs"
import OurServices from "../components/Home/OurServices/OurServices";
import Production from "../components/Home/Production/Production";
import ProducionOurProducts from "../components/Home/ProducionOurProducts/ProducionOurProducts";
import HomeExport from "../components/Home/HomeExport/HomeExport";
import Blog from "../components/Home/Blog/Blog";
import Footer from "../common/Footer/Footer";

export default class Home extends Component{
    render() {
        console.log("Home#render: props: ", JSON.parse(JSON.stringify(this.props)))

        return(
            <div className="home_leaf">
                <HomeBanner locale={this.props.match.params.locale} />
                <HomeAboutUs/>
                <OurServices/>
                <Production/>
                <ProducionOurProducts/>
                <HomeExport/>
                <Blog/>
                <Footer/>
            </div>
        );
    }
}