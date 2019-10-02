import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import './HomeAboutUs.scss'

const HomeAboutUs = () => (
    <Query query={gql`
{
  pageBy(uri: "main-home") {
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
                    return (<h1>Loading</h1>);
                }


                const image_url = data.pageBy.home.homeAboutUsImage.sourceUrl
                const about_us = {
                    backgroundImage: `url(${image_url})`
                }
               console.log(data.pageBy.home.homeAboutUsImage.sourceUrl)
                return (
                    <div className="wrapper_aboutus_content">
                        <div className="container">
                            <div className="row bottom_content">
                                <div className="col-lg-6">
                                    <div className="wrapper_about_image">
                                        <div className="bg_image" style={about_us}></div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="wrapper_right_info">
                                        <div className="home_about_us_text">
                                            <div className="wrapper_title">
                                            <h2>{data.pageBy.home.homeAboutUsTitle}</h2>
                                            <hr/>
                                            </div>
                                            <div className="about_us_text">
                                                <p>{data.pageBy.home.homeAboutUsText}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    </Query>
)
export default HomeAboutUs;