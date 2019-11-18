import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import './Production.scss'
import classNames from 'classnames'

const Production = () => (
    <Query query={gql`
  {
        pageBy(uri: "uk/main-home") {
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
            ({ loading, error, data}) => {
                if (loading){
                    return null;
                }
               return(
                   <div className="production_ravliks">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-1">
                                    <hr className="hide_mobile"/>
                                </div>
                                <div className="col-lg-11 center-block">
                                    <h2 className="main_title">
                                        {data.pageBy.home.ourProductsTitle}
                                    </h2>
                                    <hr className="visible-sm"/>
                                </div>
                            {
                                data.ravliks.edges.map(( ravlikItem, key) => {
                                    const col_class = classNames({'col-lg-5': true, 'offset-0 offset-lg-1 offset-md-1 offset-sm-1 offset-xl-1': key === 0 || key ===1 || key === data.ravliks.edges.length-1 })
                                    const wrapper_item = classNames({'wrapper_item' : true, 'top_offset' : key === 1 || key === data.ravliks.edges.length-1})
                                    return(
                                        <div className={col_class} key={key}>
                                            <div className={wrapper_item}>
                                                <div className="ravlik_img" style={{backgroundImage: `url(${ravlikItem.node.featuredImage.sourceUrl})`}}></div>
                                                <h3 className="info_ravlik">
                                                    <Link to={`/ravlik/${ravlikItem.node.slug}`}>{ravlikItem.node.title}</Link>
                                                </h3>
                                                <p>{ravlikItem.node.content}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="col-lg-12">
                                <div className="btn_wrapper">
                                    <Link to={`/productionua/`} className="big_button">{data.pageBy.home.ourProductsButtonText}</Link>
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
export default Production;