import React, { Component } from 'react';
import { Query } from 'react-apollo';
import  gql  from 'graphql-tag';
import classNames from 'classnames';
import './Export.scss';
import Footer from "../../common/Footer/Footer";
import ShelterMap from "../../components/Maps/Maps";

class PureExport extends Component {

    render() {
        const { data } = this.props
        return(
            <div>
                <div className="export_wrapper">
                    <div className="export_line"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8">
                            <div className="export_banner_image" style={{backgroundImage: `url(${data.pageBy.featuredImage.sourceUrl})`}}>

                            </div>
                            </div>
                            <div className="col-xl-4 aling-center">
                                <div className="title_content">
                                    <h1>{data.pageBy.title}</h1>
                                    <hr/>
                                    <p>{data.pageBy.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="representation_wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 move-button">
                                <div className="row">
                                    <div className="col-lg-2">
                                        <hr/>
                                    </div>
                                    <div className="col-lg-8">
                                        <h2>{data.pageBy.exportMeta.representationTitle}</h2>
                                    </div>
                                </div>
                            </div>


                            <div className="offset-lg-1 col-lg-10">
                                <div className="row">
                                    {
                                        data.pageBy.exportMeta.representationCountryItems.map((representationItem, key) => {

                                            const wrapper_item = classNames({'col-lg-6' : true, 'offset-lg-6' : key === 0 , 'move-item' : key === 1 })
                                            return (
                                                <div className={wrapper_item} key={key}>
                                                    <div className="partner_info" >
                                                        <h2>{representationItem.countryName}</h2>
                                                        <hr/>
                                                        <div className="contact_details">
                                                            <h3>{representationItem.personName}</h3>
                                                            <a className="phone" href={representationItem.phone}>{representationItem.phone}</a>
                                                            <a className="email" href={representationItem.email}>{representationItem.email}</a>
                                                            <address>{representationItem.address}</address>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="map">
                    <ShelterMap/>
                </div>
                <Footer/>
            </div>

        );
    }
}

const Export = () => {
    return (
        <Query query={gql`
{
  pageBy(uri: "uk/eksport") {
    title
    content
    featuredImage {
      sourceUrl
    }
    exportMeta{
      representationTitle
      representationCountryItems{
        countryName
        personName
        phone
        email
        address
      }
      partnershipTitle
      partnershipText
      partnershipImage{
        sourceUrl
      }
    }
  }
}

        `
        }>
            {
                ({loading, error, data}) => {
                    if (loading) {
                        return null;
                    }
                    if (error) {
                        console.log(error)
                        return
                    }

                    return <PureExport data={data} />
                }
            }
        </Query>
    )
}
export default Export;