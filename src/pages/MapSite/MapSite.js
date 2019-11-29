import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './MapSite.scss'
//import classNames from 'classnames'
import Footer from "../../common/Footer/Footer";
import {Link} from "react-router-dom";
import Header from "../../common/Header/Header";

const MapSite = () => (
    <Query query={gql`
{
  pageBy(uri: "uk/karta-sajtu") {
    title
  }
  menus {
    nodes {
      menuItems {
        nodes {
          label
          url
        }
      }
    }
  }
}
    `
    }>
        {
            ({ loading, error, data}) => {
                if (loading){
                    return null;
                }
                let array = data.menus.nodes[0].menuItems.nodes;
                return (
                    <div className="maps_site_wrapper">
                        <Header/>
                        <div className="maps_site_menu">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-5 offset-lg-4 ">
                                        <div className="title_wrapper">
                                            <h1>{data.pageBy.title}</h1>
                                            <hr/>
                                        </div>
                                        <ul className="map_menu_wrapper">
                                        {array.map((item,idx) =>{
                                            const  s = item.url
                                            const url = new URL(s).pathname
                                            return(
                                                <li className='menu_item' key={idx}>
                                                    <Link to={url}>{item.label}</Link>
                                                </li>
                                            )
                                        })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Footer/>
                    </div>
                )
            }
        }
    </Query>
)
export default MapSite;