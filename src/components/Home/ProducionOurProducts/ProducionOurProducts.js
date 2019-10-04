import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './ProducionOurProducts.scss'
//import classNames from 'classnames'
import { Link } from 'react-router-dom'

const ProducionOurProducts = () => (
    <Query query={gql`
{
  pageBy(uri: "main-home") {
    home{
        productionTitle 
        productionText
        productionButtonText
        productionImage{
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
                    return (<h1>Loading</h1>);
                }

                return (
                    <div className="wrapper_production_content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-5 offset-1 vertical-center-block">
                                    <div className="production_text_wpapper">
                                        <div className="wrapper_title">
                                            <h2>{data.pageBy.home.productionTitle}</h2>
                                            <hr/>
                                        </div>
                                        <p>
                                            {data.pageBy.home.productionText}
                                        </p>
                                        <Link to={`/production/`} className="small_button">{data.pageBy.home.productionButtonText}</Link>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="production_image" style={{backgroundImage: `url(${data.pageBy.home.productionImage.sourceUrl})`}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    </Query>
)
export default ProducionOurProducts;