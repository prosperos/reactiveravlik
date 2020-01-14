import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './OurServices.scss'
import classNames from 'classnames'
import ScrollAnimation from 'react-animate-on-scroll'
import { withRouter } from 'react-router-dom'

const OurServices = (props) => {
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
                  ourServicesTitle 
                  ourServicesItems{
                    ourServicesIcon{
                        sourceUrl
                    }
                    ourServicesDescription
                    ourServicesTitle
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
                    const itemServices = data.pageBy.home.ourServicesItems
                    return (
                        <div className="wrapper_our_services_content">
                            <div className="container">
                                <div className="row">
                                    <ScrollAnimation animateIn="fadeInLeft">
                                        <div className="col-lg-1">
                                            <hr className="mobile_hide"/>
                                        </div>
                                    </ScrollAnimation>
                                    <div className="col-lg-10">
                                        <div className="row move_block">
                                            <div className="col-lg-6">
                                                <ScrollAnimation delay={450} animateIn='fadeIn'>
                                                    <div className="wrapper_about_image">
                                                        <h1>{data.pageBy.home.ourServicesTitle}</h1>
                                                        <hr className="visible-sm"/>
                                                    </div>
                                                </ScrollAnimation>
                                            </div>
                                            {itemServices.map((item, idx) => {
                                                const col_class = classNames({
                                                    'col-lg-6': true,
                                                    'first': idx === 3,
                                                    'second': idx === 1,
                                                    'third offset-lg-6 ': idx === 2,
                                                    'offset-lg-6 offset-sm-6 offset-md-6 offset-xl-6 offset-0': idx === itemServices.length - 1
                                                })
                                                return (
                                                    <div className={col_class} key={idx}>
                                                        <ScrollAnimation delay={400 * (idx + 1)} animateIn='fadeIn'>
                                                            <div className='services_item'>
                                                                <div className="icon"
                                                                     style={{backgroundImage: `url(${item.ourServicesIcon.sourceUrl})`}}></div>
                                                                <div className="services_text">
                                                                    <h3 className="services_title">{item.ourServicesTitle}</h3>
                                                                    <p>{item.ourServicesDescription}</p>
                                                                </div>
                                                            </div>
                                                        </ScrollAnimation>
                                                    </div>
                                                )
                                            })}
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
}
export default withRouter( OurServices );