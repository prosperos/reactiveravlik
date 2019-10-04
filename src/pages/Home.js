import React, { Component} from 'react'
//import { Query } from 'react-apollo'
//import gql from 'graphql-tag'
//import { Link } from 'react-router-dom'

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
    renderBanner = () => {

    }

    render() {
        return(
            <div>
                {/*<h2>{props.data.ravlik.title}</h2>*/}
                {/*<strong>{props.data.ravlik.ravlikMeta.price}</strong>*/}
                {/*<br />*/}
                {/*<strong>{props.data.ravlik.ravlikMeta.amount}</strong>*/}
                <HomeBanner/>
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