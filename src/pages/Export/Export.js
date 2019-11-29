import React, { Component } from 'react';
import { Query } from 'react-apollo';
import  gql  from 'graphql-tag';
import './Export.scss';
import Footer from "../../common/Footer/Footer";
import ShelterMap from "../../components/Maps/Maps";

import Popup from "../../components/Popup/Popup";
import Representation from "../../components/Export/Representation/Representation";
import Header from "../../common/Header/Header";

class PureExport extends Component {

    render() {
        const { data } = this.props
        return(
            <div>
                <Header/>
                <div className="page-wrapper">
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
                <Representation/>
                <div className="map">
                    <ShelterMap data={data}/>
                </div>
                <div className="partners_wrapper">
                    <div className="partner_line"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-11"><div className="title_wrapper"><hr/><h2>{data.pageBy.exportMeta.partnershipTitle}</h2></div></div>
                            <div className="col-xl-6 order-text">
                                <div className="parters_description">
                                   <p> {data.pageBy.exportMeta.partnershipText}</p>
                                </div>
                            </div>
                            <div className="col-xl-6 order-img">
                                <div className="partners_image" style={{backgroundImage: `url(${data.pageBy.exportMeta.partnershipImage.sourceUrl})`}}></div>
                            </div>
                            <div className="col-xl-12 order-btn">
                                <div className="partners_button">
                                    <Popup/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
  pageBy(uri: "uk/export") {
    title
    content
    featuredImage {
      sourceUrl
    }
    exportMeta{
   
      partnershipTitle
      partnershipText
      partnershipImage{
        sourceUrl
      }
      buttonName
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