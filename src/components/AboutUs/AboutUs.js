import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
//import { Link } from 'react-router-dom'
import './About.scss'

const AboutUs = () => (
    <Query query={gql`
{
  pageBy(uri: "/uk/pro-nas") {
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
            ({ loading, error, data}) => {
                if (loading){
                    return null;
                }
                return(
                    <div>
                        <div className="about_us_bunner">
                            <div className="about_us_bg_line"></div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-7">
                                       <div className="banner_big_image" style={{backgroundImage: `url(${data.pageBy.aboutUs.bigImage.sourceUrl})`}}></div>
                                       <div className="banner_small_image" style={{backgroundImage: `url(${data.pageBy.aboutUs.smallImage.sourceUrl})`}}></div>
                                        <span className="leaf_boottom"></span>
                                    </div>
                                    <div className="col-lg-4 offset-lg-1 wrapper_text">
                                        <h1>
                                            {data.pageBy.aboutUs.mainBlockTitle}
                                        </h1>
                                        <hr/>
                                        <p>{data.pageBy.aboutUs.mainBlockText}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lets_meet">
                            <div className="meet_bg_line"></div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="wrapper_meet">
                                            <h2> {data.pageBy.aboutUs.aboutUsTitle}</h2>
                                            <hr />
                                            <div className="meet_mobile_image" style={{backgroundImage: `url(${data.pageBy.aboutUs.aboutUsImage.sourceUrl})`}}></div>
                                            <p> {data.pageBy.aboutUs.aboutUsText}</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="meet_big_image" style={{backgroundImage: `url(${data.pageBy.aboutUs.aboutUsImage.sourceUrl})`}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="eat_delicacies">
                            <span className="delicacies_line_bg"></span>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-xl-3">
                                        <div className="left_image" style={{backgroundImage: `url(${data.pageBy.aboutUs.eatDelicaciesLeftImage.sourceUrl})`}}></div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="delicacies_wrapper_text">
                                            <h2> {data.pageBy.aboutUs.eatDelicaciesTitle}</h2>
                                            <hr />
                                            <div className="left_image_mobile" style={{backgroundImage: `url(${data.pageBy.aboutUs.eatDelicaciesLeftImage.sourceUrl})`}}></div>
                                            <p> {data.pageBy.aboutUs.eatDelicaciesText}</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-3">
                                        <div className="right_image" style={{backgroundImage: `url(${data.pageBy.aboutUs.bigImage.sourceUrl})`}}></div>
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
export default AboutUs;