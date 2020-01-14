import React, { Component } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import button_scroll from './../../../images/bottom_scroll.png'
import './HomeBanner.scss'
import { Link } from "react-scroll";
import {  withRouter } from 'react-router-dom'
import ScrollAnimation from "react-animate-on-scroll";

class HomeItems extends Component {
    render() {
        const { data } = this.props
     /*   let properties = []
        for (let k in data.pageBy.home) {
            let v = data.pageBy.home[k]
            properties.push({key: k, value: v})
        }*/

        const image_url = data.pageBy.home.homeBannerLogo.sourceUrl
        const banner_bg_url = {
            backgroundImage: `url(${image_url})`
        }
        const  homeBannerImage = data.pageBy.home.homeBannerImage.sourceUrl
        const homeBannerImageStyle = {
            backgroundImage: `url(${homeBannerImage})`
        }
        return (
            <div className="wrapper_bunner_content">
                <ScrollAnimation animateIn='fadeInRight'>
                    <div className="bunner_line"></div>
                </ScrollAnimation>
                <div className="container">
                    <div className="row center_content">
                        <div className="col-lg-6">
                            <div className="wrpapper_left_info">
                                <ScrollAnimation delay={800} animateIn='fadeInUp'>
                                    <div className="img_logo" style={banner_bg_url}></div>
                                </ScrollAnimation>
                                <div className="home_banner_text">
                                    <ScrollAnimation delay={900} animateIn='fadeInLeft'>
                                        <hr />
                                    </ScrollAnimation>
                                    <ScrollAnimation delay={1500} animateIn='fadeIn'>
                                        <div className="banner_text">
                                            <p>{data.pageBy.home.homeBannerText}</p>
                                        </div>
                                    </ScrollAnimation>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <ScrollAnimation delay={300} animateIn='fadeIn'>
                                <div className="bg_image" style={homeBannerImageStyle}></div>
                            </ScrollAnimation>
                        </div>
                        <div className="col-lg-12">
                            <Link to="wrapper_aboutus_content"  smooth={true} duration= {1500} className="scroll_next_block">
                                <img src={button_scroll} alt=""/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const HomeBanner = (props) => {
    let locale = ''
    if (props.match.params.locale === "uk"){
        locale = props.match.params.locale + "/main-home"
    }else if(props.match.params.locale === "fr"){
        locale =  "accueil/"
    }else if(props.match.params.locale === undefined){
        locale =  "home/"
    }
    const locale_url_prefix = locale ? '/' + locale : ''

    return (
        <Query query={gql`
        {
         pageBy(uri: "${locale_url_prefix}") {
            home{
              homeBannerLogo {
                sourceUrl
              }
              homeBannerText
              homeBannerImage {
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
                    return <HomeItems data={data}/>

                }
            }
        </Query>
    )
}
export default  withRouter(HomeBanner);