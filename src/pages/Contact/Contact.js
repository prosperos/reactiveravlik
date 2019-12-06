import '../../../node_modules/aos/dist/aos.css';
import React, { Component } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './Contact.scss'
import Popup from "../../components/Popup/Popup";
import ShelterMap from "../../components/Maps/Maps";
import Representation from "../../components/Export/Representation/Representation";
import Footer from "../../common/Footer/Footer";
import Header from "../../common/Header/Header";
import AOS from "aos";


class AnimateContact extends Component {
    constructor(props, context) {
        super(props, context);
        AOS.init();
    }

    componentWillReceiveProps (){
        AOS.refresh();
    }

    render() {
        const {data} = this.props
        return (
            <div className="main_contact_wrapper">
                <Header/>
                <div className="page-wrapper">
                    <div className="wrapper_contact">
                        <div className="bg_line" data-aos="fade-left" data-aos-delay="1950"  data-aos-duration="12000"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 align-content">
                                    <div className="title_wrapper">
                                        <h1 data-aos="fade-in" data-aos-delay="450">{data.pageBy.title}</h1>
                                        <hr data-aos="fade-in-left" data-aos-delay="550" />
                                    </div>
                                    <div className="address_wrapper" data-aos="fade-in" data-aos-delay="450">

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
                                <div className="col-lg-8" data-aos="fade-left" data-aos-delay="650" >
                                    <ShelterMap data={data}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Representation/>
                </div>
                <Footer/>
            </div>
        );
    }

}

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

                return <AnimateContact data={data} />

            }
        }
    </Query>
)
export default Contact;