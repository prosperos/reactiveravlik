import React, { Component } from 'react';
import { Query } from 'react-apollo';
import  gql  from 'graphql-tag';
import classNames from 'classnames';
import './Vyrobnytstvo.scss';
import Footer from "../../common/Footer/Footer"
import Header from "../../common/Header/Header"
import ScrollAnimation from 'react-animate-on-scroll'
import {  withRouter } from 'react-router-dom'

class PureVyrobnytstvo extends Component {

    render() {
        const { data } = this.props
        return(
            <>
                <Header/>
                <div className="page-wrapper">
                    <div className="vyrobnytstvo_wrapper">
                        <ScrollAnimation animateIn='fadeInRight' delay={750}>
                            <div className="virobnytstvo_line"></div>
                        </ScrollAnimation>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-4 align-bottom">
                                    <ScrollAnimation animateIn='fadeIn' delay={550}>
                                        <div className="title_content">
                                            <h1>{data.pageBy.title}</h1>
                                            <hr/>
                                            <p>{data.pageBy.content}</p>
                                        </div>
                                    </ScrollAnimation>
                                </div>
                                <div className="col-xl-8">
                                    <ScrollAnimation animateIn='fadeIn' >
                                        <div className="vyrobnytstvo_bunner_image" style={{backgroundImage: `url(${data.pageBy.featuredImage.sourceUrl})`}}></div>
                                    </ScrollAnimation>
                                    <ScrollAnimation animateIn='fadeIn' delay={250}>
                                        <div className="vyrobnytstvo_bunner_image_small" style={{backgroundImage: `url(${data.pageBy.production.smallImage.sourceUrl})`}}></div>
                                    </ScrollAnimation>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="prosses_vyrobnytstva">
                            <div className="vertical_line"></div>
                        <div className="prosses_line">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-11 offset-lg-1 col-12">
                                            {
                                                data.pageBy.production.leftRightContentItem.map((productionItem, key) => {
                                                    const col_class = classNames({'col-lg-5': true, 'order-first': key  % 2 !== 0})
                                                    const animate_position_left  = classNames({'fadeInLeft': true, 'fadeInRight': key  % 2 !== 0 })
                                                    return (
                                                        <div className="row item_proсess" key={key}>
                                                            <div className="col-lg-7">
                                                                <ScrollAnimation animateIn={animate_position_left} delay={250}>
                                                                    <div className="prosses_image" style={{backgroundImage: `url(${productionItem.growingImage.sourceUrl})`}}></div>
                                                                </ScrollAnimation>
                                                            </div>
                                                            <div className={col_class}>
                                                                <ScrollAnimation animateIn="fadeIn" delay={250}>
                                                                    <div className="prosses_info">
                                                                        <h2>{productionItem.growingTitle}</h2>
                                                                        <hr/>
                                                                        <div className="prosses_image_mobile" style={{backgroundImage: `url(${productionItem.growingImage.sourceUrl})`}}></div>
                                                                        <p>{productionItem.growingText}</p>
                                                                    </div>
                                                                </ScrollAnimation>
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
                    <div className="advanteges_vyrobnytstva">
                        <ScrollAnimation animateIn='fadeInLeft' delay={750}>
                            <div className="horisontal_line"></div>
                        </ScrollAnimation>
                        <div className="advanteges_line">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-11 offset-lg-1 col-12">
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <ScrollAnimation animateIn='fadeIn' delay={250}>
                                                    <div className="advanteges_image" style={{backgroundImage: `url(${data.pageBy.production.ourAdvantagesImage.sourceUrl})`}}></div>
                                                </ScrollAnimation>
                                            </div>
                                            <div className="col-lg-7 aling-center">
                                                <ScrollAnimation animateIn='fadeInRight' delay={550}>
                                                    <div className="inner_wrapper">
                                                        <h2>{data.pageBy.production.ourAdvantagesTitle}</h2>
                                                        <hr/>
                                                        <div className="item_proсess" >
                                                        {
                                                            data.pageBy.production.ourAdvantagesDetails.map((productionItem, key) => {
                                                                return (
                                                                    <div className="prosses_info" key={key}>
                                                                        <h2>{productionItem.detailsTitle}</h2>
                                                                        <strong>{productionItem.detailsDescription}</strong>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        </div>
                                                    </div>
                                                </ScrollAnimation>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}

const Vyrobnytstvo = (props) => {

    let locale = ''
    if (props.match.params.locale === "uk") {
        locale = "uk/production"
    } else if (props.match.params.locale === "fr") {
        locale = "production-fr/"
    } else if (props.match.params.locale === undefined) {
        locale = "production-en/"
    }
    const locale_url_prefix = locale ? '/' + locale : ''

    return (
        <Query query={gql`
    {
  pageBy(uri: "${locale_url_prefix}") {
    title
    content
    featuredImage{
      sourceUrl
    }
    production{
      smallImage{
        sourceUrl
      }
      leftRightContentItem{
        growingTitle
        growingText
        growingImage{
          sourceUrl
        }
      }
      ourAdvantagesTitle
        ourAdvantagesImage{
        sourceUrl
      }
      ourAdvantagesDetails {
        detailsDescription
        detailsTitle
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
                    return <PureVyrobnytstvo data={data} />
                }
            }
        </Query>
    )
}
export default withRouter(Vyrobnytstvo);