import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './Contact.scss'
//import classNames from 'classnames'
//import { Link } from 'react-router-dom'
import Popup from "../../components/Popup/Popup";
import ShelterMap from "../../components/Maps/Maps";
import Representation from "../../components/Export/Representation/Representation";
import Footer from "../../common/Footer/Footer";
import Header from "../../common/Header/Header";

const Contact = () => (
    <Query query={gql`
{
  pageBy(uri: "uk/contacts") {
  title
    contactsMeta{
        contactsPhone 
        contactsEmail
        contactsAddress
        buttonText
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

                return (
                    <div className="main_contact_wrapper">
                        <Header/>
                        <div className="page-wrapper">
                        <div className="wrapper_contact">
                            <div className="bg_line"></div>
                            <div className="container">
                               <div className="row">
                                   <div className="col-lg-4 align-content">
                                       <div className="title_wrapper">
                                           <h1>{data.pageBy.title}</h1>
                                           <hr/>
                                       </div>
                                       <div className="address_wrapper">
                                           <div className="footer_logo"></div>
                                           <a href={`tel:${data.pageBy.contactsMeta.contactsPhone}`} className="phone">{data.pageBy.contactsMeta.contactsPhone}</a>
                                           <a href={`mailto:${data.pageBy.contactsMeta.contactsEmail}`} className="email">{data.pageBy.contactsMeta.contactsEmail}</a>
                                           <address className="address">
                                               {data.pageBy.contactsMeta.contactsAddress}
                                           </address>
                                           <div className="popup_form">
                                               <Popup />
                                           </div>
                                       </div>
                                   </div>
                                   <div className="col-lg-8">
                                       <ShelterMap data={data}/>
                                   </div>
                               </div>
                            </div>
                        </div>
                        <Representation/>
                        </div>
                        <Footer/>
                    </div>
                )
            }
        }
    </Query>
)
export default Contact;