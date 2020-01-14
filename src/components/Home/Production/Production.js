import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, withRouter } from 'react-router-dom'
import './Production.scss'
import classNames from 'classnames'
import ScrollAnimation from 'react-animate-on-scroll'

const Production = (props) => {
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
              ourProductsTitle 
              ourProductsButtonText
            }
          }
        ravliks{
            edges {
              node{
                title
                content
                slug
                featuredImage{
                  sourceUrl
                }
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
                        <div className="production_ravliks">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-1">
                                        <ScrollAnimation animateIn='fadeInLeft'>
                                            <hr className="hide_mobile"/>
                                        </ScrollAnimation>
                                    </div>
                                    <div className="col-lg-11 center-block">
                                        <ScrollAnimation delay={200} animateIn='fadeIn'>
                                            <h2 className="main_title">
                                                {data.pageBy.home.ourProductsTitle}
                                            </h2>
                                            <hr className="visible-sm"/>
                                        </ScrollAnimation>
                                    </div>
                                    {
                                        data.ravliks.edges.map((ravlikItem, key) => {

                                            if (key > 3 )
                                                return false;

                                            const col_class = classNames({
                                                'col-lg-5': true,
                                                'offset-0 offset-lg-1 offset-md-1 offset-sm-1 offset-xl-1': key === 0 || key === 1 || key === data.ravliks.edges.length - 1
                                            })
                                            const wrapper_item = classNames({
                                                'wrapper_item': true,
                                                'top_offset': key === 1 || key === data.ravliks.edges.length - 1
                                            })

                                            return (
                                                <div className={col_class} key={key}>
                                                    <ScrollAnimation delay={300 * key} animateIn='fadeIn'>
                                                        <Link
                                                            to={`${location.pathname}our-products/${ravlikItem.node.slug}`}>
                                                                <div className={wrapper_item}>
                                                                    <div className="ravlik_img"
                                                                         style={{backgroundImage: `url(${ravlikItem.node.featuredImage.sourceUrl})`}}></div>
                                                                    <h3 className="info_ravlik">
                                                                        <Link
                                                                            to={`${location.pathname}our-products/${ravlikItem.node.slug}`}>{ravlikItem.node.title}</Link>
                                                                    </h3>
                                                                    <p>{ravlikItem.node.content}</p>
                                                                </div>
                                                        </Link>
                                                    </ScrollAnimation>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="col-lg-12">
                                        <ScrollAnimation delay={650} animateIn='fadeIn'>
                                            <div className="btn_wrapper">
                                                <Link to={`${location.pathname}our-products`}
                                                      className="big_button">{data.pageBy.home.ourProductsButtonText}</Link>
                                            </div>
                                        </ScrollAnimation>
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
export default  withRouter(Production);