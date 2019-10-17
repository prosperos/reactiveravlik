import React, { Component, useState } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import Slider from "react-slick"
import classNames from 'classnames'
import './Production.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class PureProduction extends Component {



    constructor(props) {
        super(props)
        this.state = {
            open: false,
            index: 3
        };



        this.settings = {
            className: "center",
            centerMode: true,
            beforeChange: (oldIndex, newIndex) =>{
                console.log(oldIndex, 'new ', newIndex)
                if (newIndex >= 1){
                    this.setState({open: true})
                    this.setState({index: 4})
                }else {
                    this.setState({open: false})
                    this.setState({index: 3})
                }
                console.log('index',this.state.index)
            },
            //slidesToShow: this.state.index,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 1

        };
    }


    render() {
        const { data } = this.props

        return(
            <div className="production_wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12" >
                            <div className="content_production">
                               <div className={classNames({'product_text_wrapper': 1, 'full_text': this.state.open})}>
                                    <h1>{data.pageBy.title}</h1>
                                    <hr/>
                                    <p>{data.pageBy.content}</p>
                                </div>
                                
                                <Slider {...this.settings} className={classNames({'small_slider': 1, 'full_slider': this.state.open})}>

                                    <Link to={`/ravlik/}`}  className="slider_item">
                                        <div className="ravlik_image"></div>
                                        <div className="wrapper_info_rawlik">
                                            <h3></h3>
                                            <p></p> <br/>
                                        </div>
                                    </Link>
                                    {
                                        data.ravliks.edges.map(( ravlikItem, key) => {
                                            return(
                                                <Link to={`/ravlik/${ravlikItem.node.slug}`} key={key} className="slider_item">
                                                    <div className="ravlik_image" style={{backgroundImage: `url(${ravlikItem.node.featuredImage.sourceUrl})`}}></div>
                                                    <div className="wrapper_info_rawlik">
                                                        <h3>{ravlikItem.node.title}</h3>
                                                        <p>{ravlikItem.node.content}</p> <br/>
                                                        <Link to={`/ravlik/${ravlikItem.node.slug}`} className="small_button">Learn more</Link>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const Production = () => (
    <Query query={gql`
    {
          
          pageBy(uri: "/uk/produktsiya") {
            title
            content
          }
        
    
        ravliks{
            edges {
              node{
                title
                slug
                content
                featuredImage{
                  sourceUrl
                }
                ravlikMeta{
                  amount
                  price
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

                return <PureProduction data={data} />
            }
        }
    </Query>
)
export default Production;