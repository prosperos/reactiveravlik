import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './HomeExport.scss'
import { Link, withRouter } from 'react-router-dom'
import ScrollAnimation from 'react-animate-on-scroll'

const HomeExport = (props) => {
    let locale = ''
    if (props.match.params.locale === "uk") {
        locale = props.match.params.locale + "/main-home"
    } else if (props.match.params.locale === "fr") {
        locale = "accueil/"
    } else if (props.match.params.locale === undefined) {
        locale = "home/"
    }
    const locale_url_prefix = locale ? '/' + locale : ''

    return (
        <Query query={gql`
{
 pageBy(uri: "${locale_url_prefix}") {
    home{
        exportTitle 
        exportDescription
        exportButtomText
        exportImage{
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

                    const {location} = props
                    return (
                        <div className="wrapper_export_content">
                            <ScrollAnimation delay={400} animateIn='fadeInRight'>
                                <div className="bg_line"></div>
                            </ScrollAnimation>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-1 hidden-xs ">
                                        <ScrollAnimation animateIn='fadeInLeft'>
                                            <hr/>
                                        </ScrollAnimation>
                                    </div>
                                    <div className="col-lg-11 center-block">
                                        <ScrollAnimation delay={200} animateIn='fadeIn'>
                                            <h2>{data.pageBy.home.exportTitle}</h2>
                                        </ScrollAnimation>
                                        <ScrollAnimation animateIn='fadeInLeft'>
                                            <hr className="title_line"/>
                                        </ScrollAnimation>
                                    </div>
                                    <div
                                        className="col-lg-6 offset-0 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1 vertical-center-block">
                                        <ScrollAnimation delay={400} animateIn='fadeIn'>
                                            <div className="export_text_wpapper">
                                                <div className="export_image"
                                                     style={{backgroundImage: `url(${data.pageBy.home.exportImage.sourceUrl})`}}></div>
                                                <p>
                                                    {data.pageBy.home.exportDescription}
                                                </p>
                                                <Link to={`${location.pathname}export`}
                                                      className="small_button">{data.pageBy.home.exportButtomText}</Link>
                                            </div>
                                        </ScrollAnimation>
                                    </div>
                                    <div className="col-lg-4">
                                        <ScrollAnimation delay={300} animateIn='fadeIn'>
                                            <div className="export_image"
                                                 style={{backgroundImage: `url(${data.pageBy.home.exportImage.sourceUrl})`}}></div>
                                        </ScrollAnimation>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        </Query>
    )
}
export default withRouter(HomeExport);