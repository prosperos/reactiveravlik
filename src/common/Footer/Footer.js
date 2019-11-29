import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import './Footer.scss'
import MyForm from "../../components/Form/Form";
import Popup from "../../components/Popup/Popup";
import ScrollAnimation from 'react-animate-on-scroll'

const Footer = (props) => {

    return(
        <Query query={gql`
    {
      pageBy(uri: "Footer") {
        footer{
          phone
          email
          location
          contactTitle
          contactButtonName
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
                    return(
                        <footer className="main-footer">
                            <div className="container">
                                <div className="row">
                                    <div className="offset-0 offset-lg-1 offset-md-1 offset-xl-1 offset-sm-1 col-lg-4 col-xl-4 col-sm-4 col-md-4">
                                        <div className="address_wrapper">
                                            <ScrollAnimation animateIn='fadeIn'>
                                                <div className="footer_logo"></div>
                                            </ScrollAnimation>
                                            <ScrollAnimation animateIn='fadeIn'>
                                            <a href={`tel:${data.pageBy.footer.phone}`} className="phone">+{data.pageBy.footer.phone}</a>
                                            </ScrollAnimation>
                                            <ScrollAnimation animateIn='fadeIn'>
                                            <a href={`mailto:${data.pageBy.footer.email}`} className="email">{data.pageBy.footer.email}</a>
                                            </ScrollAnimation>
                                            <ScrollAnimation animateIn='fadeIn'>
                                            <address className="address">
                                                {data.pageBy.footer.location}
                                            </address>
                                            </ScrollAnimation>
                                            <div className="mobile_popup_form">
                                                <Popup />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="offset-1 col-lg-5">
                                        <div className="form_wrapper">
                                            <div className="form_title">
                                                <h2>{data.pageBy.footer.contactTitle}</h2>
                                                <hr/>
                                            </div>
                                            <MyForm />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer_links">
                                <div className="container">
                                    <div className="row wrapper_bootom">
                                        <div className="col-lg-2 col-6">
                                            <div className="footer_content">
                                                <p>© 2019 ТзОВ "Rue des escargots"</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-6">
                                            <div className="footer_content">
                                                <Link to="/polityka-konfidentsiynosti/" className="footer_copyright">
                                                    Політика конфіденсійності
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-6 ">
                                            <div className="footer_content">
                                                <Link to="/cookies/" className="footer_copyright">
                                                    Використання cookies
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-6">
                                            <div className="footer_content">
                                                <Link to="/maps-site/" className="footer_copyright">
                                                    Карта сайту
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="offset-1 col-6 col-lg-2 offset-xs-0 offset-md-2  offset-xl-2">
                                            <div className="footer_content link">
                                                <Link to="http://voroninstudio.eu/" className="footer_copyright">
                                                    Розроблено у VORONIN STUDIO
                                                    2019
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    );
                }
            }
        </Query>
    )
}
export default Footer;