import React, { Component} from 'react'
//import { Query } from 'react-apollo'
//import gql from 'graphql-tag'
//import { Link } from 'react-router-dom'
import HomeBanner from "../components/Home/HomeBanner/HomeBanner";

export default class Home extends Component{
    render() {
        return(
            <div>
                {/*<h2>{props.data.ravlik.title}</h2>*/}
                {/*<strong>{props.data.ravlik.ravlikMeta.price}</strong>*/}
                {/*<br />*/}
                {/*<strong>{props.data.ravlik.ravlikMeta.amount}</strong>*/}
                <HomeBanner/>

            </div>
        );
    }
}