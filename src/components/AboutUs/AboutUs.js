import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './About.scss'
import ScrollAnimation from 'react-animate-on-scroll'
import {  withRouter } from 'react-router-dom'

const AboutUs = ( props ) => {

    let locale = ''
    if (props.match.params.locale === "uk") {
        locale = "about-us-2"
    } else if (props.match.params.locale === "fr") {
        locale = "a-propos-de-nous/"
    } else if (props.match.params.locale === undefined) {
        locale = "about-us/"
    }
    const locale_url_prefix = locale ? '/' + locale : ''

    return (
        <Query query={gql`
{
  pageBy(uri: "${locale_url_prefix}") {
    aboutUs{
      bigImage {
        sourceUrl
      }
      smallImage {
        sourceUrl
      }
      mainBlockTitle
      mainBlockText
      
      aboutUsTitle
      aboutUsText
      aboutUsImage {
        sourceUrl
      }
      eatDelicaciesLeftImage{
        sourceUrl
      }
      eatDelicaciesTitle
      eatDelicaciesText
      eatDelicaciesRightImage{
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
                    return (
                        <div>
                            <div className="about_us_bunner">
                                <ScrollAnimation animateIn='fadeInLeft' delay={750}>
                                    <div className="about_us_bg_line"></div>
                                </ScrollAnimation>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-7">
                                            <ScrollAnimation animateIn='fadeIn'>
                                                <div className="banner_big_image"
                                                     style={{backgroundImage: `url(${data.pageBy.aboutUs.bigImage.sourceUrl})`}}></div>
                                            </ScrollAnimation>
                                            <ScrollAnimation animateIn='fadeIn' delay={250}>
                                                <div className="banner_small_image"
                                                     style={{backgroundImage: `url(${data.pageBy.aboutUs.smallImage.sourceUrl})`}}></div>
                                            </ScrollAnimation>
                                            <span className="leaf_boottom"></span>
                                        </div>
                                        <div className="col-lg-4 offset-lg-1 wrapper_text">
                                            <ScrollAnimation animateIn='fadeInRight' delay={550}>
                                                <h1>{data.pageBy.aboutUs.mainBlockTitle}</h1>
                                                <hr/>
                                                <p>{data.pageBy.aboutUs.mainBlockText}</p>
                                            </ScrollAnimation>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lets_meet">
                                <ScrollAnimation animateIn='fadeInRight' delay={500}>
                                    <div className="meet_bg_line"></div>
                                </ScrollAnimation>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-6 animations-top">
                                            <ScrollAnimation animateIn='fadeInLeft' delay={250}>
                                                <div className="wrapper_meet">
                                                    <h2> {data.pageBy.aboutUs.aboutUsTitle}</h2>
                                                    <hr/>
                                                    <div className="meet_mobile_image"
                                                         style={{backgroundImage: `url(${data.pageBy.aboutUs.aboutUsImage.sourceUrl})`}}></div>
                                                    <p> {data.pageBy.aboutUs.aboutUsText}</p>
                                                </div>
                                            </ScrollAnimation>
                                        </div>
                                        <div className="col-lg-6">
                                            <ScrollAnimation animateIn='fadeIn'>
                                                <div className="meet_big_image"
                                                     style={{backgroundImage: `url(${data.pageBy.aboutUs.aboutUsImage.sourceUrl})`}}></div>
                                            </ScrollAnimation>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="eat_delicacies">
                                <span className="delicacies_line_bg"></span>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-xl-3">
                                            <ScrollAnimation animateIn='fadeInRight' delay={250}>
                                                <div className="left_image"
                                                     style={{backgroundImage: `url(${data.pageBy.aboutUs.eatDelicaciesLeftImage.sourceUrl})`}}></div>
                                            </ScrollAnimation>
                                        </div>
                                        <div className="col-xl-6">
                                            <ScrollAnimation animateIn='fadeIn' delay={100}>
                                                <div className="delicacies_wrapper_text">
                                                    <h2> {data.pageBy.aboutUs.eatDelicaciesTitle}</h2>
                                                    <hr/>
                                                    <div className="left_image_mobile"
                                                         style={{backgroundImage: `url(${data.pageBy.aboutUs.eatDelicaciesLeftImage.sourceUrl})`}}></div>
                                                    <p> {data.pageBy.aboutUs.eatDelicaciesText}</p>
                                                </div>
                                            </ScrollAnimation>
                                        </div>
                                        <div className="col-xl-3">
                                            <ScrollAnimation animateIn='fadeInLeft' delay={250}>
                                                <div className="right_image"
                                                     style={{backgroundImage: `url(${data.pageBy.aboutUs.bigImage.sourceUrl})`}}></div>
                                            </ScrollAnimation>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            }
        </Query>
    )
}
export default withRouter( AboutUs );