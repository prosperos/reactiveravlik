import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './HomeExport.scss'
//import classNames from 'classnames'
import { Link } from 'react-router-dom'

const HomeExport = () => (
    <Query query={gql`
{
  pageBy(uri: "uk/main-home") {
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
            ({ loading, error, data}) => {
                if (loading){
                    return null;
                }
                return (
                    <div className="wrapper_export_content">
                        <div className="bg_line"></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-1 hidden-xs "><hr/></div>
                                <div className="col-lg-11 center-block"><h2>{data.pageBy.home.exportTitle}</h2><hr className="title_line"/></div>
                                <div className="col-lg-6 offset-0 offset-sm-1 offset-md-1 offset-lg-1 offset-xl-1 vertical-center-block">
                                    <div className="export_text_wpapper">
                                        <div className="export_image" style={{backgroundImage: `url(${data.pageBy.home.exportImage.sourceUrl})`}}></div>
                                        <p>
                                            {data.pageBy.home.exportDescription}
                                        </p>
                                        <Link to={`/export/`} className="small_button">{data.pageBy.home.exportButtomText}</Link>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="export_image" style={{backgroundImage: `url(${data.pageBy.home.exportImage.sourceUrl})`}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    </Query>
)
export default HomeExport;