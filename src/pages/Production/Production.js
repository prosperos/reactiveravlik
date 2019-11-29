import React, { Component } from 'react';
import { Query } from 'react-apollo'
import  gql  from 'graphql-tag'

import { Link } from 'react-router-dom'
import Slider from "react-slick"
import classNames from 'classnames'
import './Production.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../../common/Footer/Footer";
import Header from "../../common/Header/Header";

class PureProduction extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
        };

        this.settings = {
            //centerMode: true,
            infinite: false,
            afterChange: (oldIndex) =>{
                console.log(oldIndex)
                if (oldIndex >= 1){
                    this.setState({open: true})
                }else {
                    this.setState({open: false})
                }
            },
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [

                {
                    breakpoint: 600,
                    settings: {
                        centerMode: true,
                        centerPadding: "10px",
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },

            ]
        };
    }


    render() {
        const { data, locale } = this.props
        return(
            <div>
                <Header/>
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

                                        <Link to={`/ravlik/}`}  className="slider_item first">
                                            <div className="ravlik_image"></div>
                                            <div className="wrapper_info_rawlik">

                                            </div>
                                        </Link>
                                        {
                                            data.ravliks.edges.map((ravlikItem, key) => {
                                                return (
                                                    <Link to={`/${locale}/our-products/${ravlikItem.node.slug}`} key={key} className="slider_item">
                                                        <div className="ravlik_image" style={{backgroundImage: `url(${ravlikItem.node.featuredImage.sourceUrl})`}}></div>
                                                        <div className="wrapper_info_rawlik">
                                                            <h3>{ravlikItem.node.title}</h3>
                                                            <p>{ravlikItem.node.content}</p>
                                                            <Link to={`/${locale}/our-products/${ravlikItem.node.slug}`} className="small_button">Детальніше</Link>
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
                <Footer/>
            </div>
        );
    }
}

const Production = (props) => {
    const { locale } = props.match.params

    return (
        <Query query={gql`
        {
          pageBy(uri: "/uk/our-products") {
            title
            content
          }
         
          ravliks {
            edges {
              node{
                title
                slug
                content
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

                    return <PureProduction data={data} locale={locale} />
                }
            }
        </Query>
    )
}
export default Production;
