import React, { Component } from 'react';
import { Query } from 'react-apollo';
import  gql  from 'graphql-tag';
import './Export.scss';
import Footer from "../../common/Footer/Footer";
import ShelterMap from "../../components/Maps/Maps";
import Popup from "../../components/Popup/Popup";
import Representation from "../../components/Export/Representation/Representation";
import Header from "../../common/Header/Header";
import ScrollAnimation from 'react-animate-on-scroll'

class PureExport extends Component {

    render() {
        const { data } = this.props
        return(
            <div>
                <Header/>
                <div className="page-wrapper">
                <div className="export_wrapper">
                    <ScrollAnimation animateIn='fadeInLeft' delay={750}>
                        <div className="export_line"></div>
                    </ScrollAnimation>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8">
                                <ScrollAnimation animateIn='fadeInLeft' delay={550}>
                                    <div className="export_banner_image" style={{backgroundImage: `url(${data.pageBy.featuredImage.sourceUrl})`}}></div>
                                </ScrollAnimation>
                            </div>
                            <div className="col-xl-4 aling-center">

                                    <div className="title_content">
                                        <ScrollAnimation delay={250} animateIn='fadeIn'>
                                            <h1>{data.pageBy.title}</h1>
                                        </ScrollAnimation>
                                        <ScrollAnimation delay={50} animateIn='fadeInRight'>
                                            <hr/>
                                        </ScrollAnimation>
                                        <ScrollAnimation delay={450} animateIn='fadeIn'>
                                            <p>{data.pageBy.content}</p>
                                        </ScrollAnimation>
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
                    <ScrollAnimation delay={400} animateIn='fadeInRight'>
                        <div className="partner_line"></div>
                    </ScrollAnimation>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-11">
                                <div className="title_wrapper">
                                    <ScrollAnimation  animateIn='fadeInLeft'>
                                        <hr/>
                                    </ScrollAnimation>
                                    <ScrollAnimation delay={200} animateIn='fadeIn'>
                                        <h2>{data.pageBy.exportMeta.partnershipTitle}</h2>
                                    </ScrollAnimation>
                                </div>
                            </div>
                            <div className="col-xl-6 order-text">
                                <ScrollAnimation delay={400} animateIn='fadeIn'>
                                    <div className="parters_description">
                                       <p> {data.pageBy.exportMeta.partnershipText}</p>
                                    </div>
                                </ScrollAnimation>
                            </div>
                            <div className="col-xl-6 order-img">
                                <ScrollAnimation delay={300} animateIn='fadeIn'>
                                    <div className="partners_image" style={{backgroundImage: `url(${data.pageBy.exportMeta.partnershipImage.sourceUrl})`}}></div>
                                </ScrollAnimation>
                            </div>
                            <div className="col-xl-12 order-btn">
                                <ScrollAnimation delay={600} animateIn='fadeIn'>
                                    <div className="partners_button">
                                        <Popup/>
                                    </div>
                                </ScrollAnimation>
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