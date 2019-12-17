import React, { Component } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './HomeAboutUs.scss'
import { Link, withRouter } from 'react-router-dom'
import ScrollAnimation from 'react-animate-on-scroll'



class AboutUs extends Component {

    render() {
        const { data, location } = this.props
        const image_url = data.pageBy.home.homeAboutUsImage.sourceUrl
        const about_us = {
            backgroundImage: `url(${image_url})`
        }

        return (
            <div className="wrapper_aboutus_content">
                <ScrollAnimation animateIn="fadeInLeft" delay={100} >
                    <div className="wrapper_aboutus_line"></div>
                </ScrollAnimation>
                <div className="container">
                    <div className="row bottom_content">
                        <div className="col-lg-6">
                            <ScrollAnimation animateIn="fadeIn" delay={300}>
                                <div className="wrapper_about_image big_img">
                                    <div className="bg_image" style={about_us}></div>
                                </div>
                            </ScrollAnimation>
                        </div>
                        <div className="col-lg-6">
                            <ScrollAnimation animateIn="fadeInRight" delay={400} >
                                <div className="wrapper_right_info">
                                    <div className="home_about_us_text">
                                        <div className="wrapper_title">
                                            <h2>{data.pageBy.home.homeAboutUsTitle}</h2>
                                            <hr/>
                                        </div>
                                        <div className="wrapper_about_image small_img">
                                            <div className="bg_image" style={about_us}></div>
                                        </div>
                                        <div className="about_us_text">
                                            <p>{data.pageBy.home.homeAboutUsText}</p>
                                        </div>
                                        <Link to={`${location.pathname}about-us/`} className="small_button">{data.pageBy.home.homeAboutUsBtnName}</Link>
                                    </div>
                                </div>
                            </ScrollAnimation>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const HomeAboutUs = (props) => {
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
          homeAboutUsImage {
            sourceUrl
          }
          homeAboutUsTitle
          homeAboutUsText
          homeAboutUsBtnName
          homeAboutUsBtnUrl
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
                return <AboutUs data={data} {...props} />

            }
        }
    </Query>
    )
}
export default withRouter(HomeAboutUs);