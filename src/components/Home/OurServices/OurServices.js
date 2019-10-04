import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './OurServices.scss'
import classNames from 'classnames'
//import { Link } from 'react-router-dom'

const OurServices = () => (
    <Query query={gql`
{
  pageBy(uri: "main-home") {
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
            ({ loading, error, data}) => {
                if (loading){
                    return (<h1>Loading</h1>);
                }
                const itemServices = data.pageBy.home.ourServicesItems

                return (
                    <div className="wrapper_our_services_content">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-1">

                                </div>
                                <div className="col-lg-11">
                                  {/*  <div className="wrapper_about_image">
                                       <h1>{data.pageBy.home.ourServicesTitle}</h1>
                                    </div>*/}
                                </div>
                                <div className="col-lg-1"><hr/></div>
                                <div className="col-lg-10">
                                    <div className="row move_block">
                                        <div className="col-lg-6">
                                            <div className="wrapper_about_image">
                                                <h1>{data.pageBy.home.ourServicesTitle}</h1>
                                            </div>
                                        </div>
                                        {itemServices.map((item,idx) =>{
                                            const col_class = classNames({'col-lg-6': true, 'first': idx === 2 , 'second': idx === 1 , 'offset-6': idx === itemServices.length-1 })
                                            return(
                                                <div className={col_class} key={idx}>
                                                    <div className='services_item'>
                                                        <div className="icon" style={{backgroundImage: `url(${item.ourServicesIcon.sourceUrl})`}}></div>
                                                        <div className="services_text">
                                                            <h3 className="services_title">{item.ourServicesTitle}</h3>
                                                            <p>{item.ourServicesDescription}</p>
                                                        </div>
                                                    </div>
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
export default OurServices;