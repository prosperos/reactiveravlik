import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import './Footer.scss'
import { Form, Field } from 'react-final-form'
import MyForm from "../../components/Form/Form";


const Footer = () => (
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
                    return (<h1>Loading</h1>);
                }
                return(
                    <footer className="main-footer">
                        <div className="container">
                            <div className="row">
                                <div className="offset-1 col-lg-4">
                                    <div className="address_wrapper">
                                        <div className="footer_logo"></div>
                                        <a href={`tel:${data.pageBy.footer.phone}`} className="phone">+{data.pageBy.footer.phone}</a>
                                        <a href={`mailto:${data.pageBy.footer.email}`} className="email">{data.pageBy.footer.email}</a>
                                        <address className="address">
                                            {data.pageBy.footer.location}
                                        </address>
                                    </div>
                                </div>
                                <div className="offset-1 col-lg-5">

                                    <MyForm />
                                </div>
                            </div>
                        </div>
                    </footer>
                );
            }
        }
    </Query>
)
export default Footer;