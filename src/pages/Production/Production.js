import React, { Component } from 'react';
import { Query } from 'react-apollo'
import  gql  from 'graphql-tag'
import { Link, withRouter } from 'react-router-dom'
import Slider from "react-slick"
import classNames from 'classnames'
import './Production.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../../common/Footer/Footer";
import Header from "../../common/Header/Header";
import ScrollAnimation from 'react-animate-on-scroll'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className="move_buttom_left" >
            <ScrollAnimation animateIn='fadeIn' delay={2300}>
                <div
                    className={className}
                    style={{ ...style, display: "block" }}
                    onClick={onClick}
                />
            </ScrollAnimation>
        </div>
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className="move_buttom" >
            <ScrollAnimation animateIn='fadeIn' delay={2300}>
                <button className={className} style={{ ...style, display: "block"}} onClick={onClick}/>
            </ScrollAnimation>
        </div>
    );
}
class PureProduction extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false,
        };

        this.settings = {
            infinite: false,
            afterChange: (oldIndex) =>{
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
            prevArrow: <SamplePrevArrow />,
            nextArrow: <SampleNextArrow />,
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
        const url_prefix = locale ? `/${locale}` : ''

        return(
            <>
                <Header/>
                <div className="production_wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12" >
                                <div className="content_production">
                                   <div className={classNames({'product_text_wrapper': 1, 'full_text': this.state.open})}>
                                       <ScrollAnimation animateIn='fadeIn' delay={500}>
                                        <h1>{data.pageBy.title}</h1>
                                       </ScrollAnimation>
                                       <ScrollAnimation animateIn='fadeIn' delay={900}>
                                        <hr/>
                                       </ScrollAnimation>
                                       <ScrollAnimation animateIn='fadeInBottom' delay={1400}>
                                        <p>{data.pageBy.content}</p>
                                       </ScrollAnimation>
                                    </div>
                                    <Slider {...this.settings} className={classNames({'small_slider': 1, 'full_slider': this.state.open})}>
                                        <Link to='/'  className="slider_item first">
                                            <div className="ravlik_image"></div>
                                            <div className="wrapper_info_rawlik">
                                            </div>
                                        </Link>
                                        {
                                            data.ravliks.edges.map((ravlikItem, key) => {
                                                return (
                                                    <ScrollAnimation key={key} animateIn='fadeInRight' delay={1900}>
                                                        <Link to={`${url_prefix}/our-products/${ravlikItem.node.slug}`}  className="slider_item">
                                                            <div className="ravlik_image" style={{backgroundImage: `url(${ravlikItem.node.featuredImage.sourceUrl})`}}></div>
                                                            <div className="wrapper_info_rawlik">
                                                                <h3>{ravlikItem.node.title}</h3>
                                                                <p>{ravlikItem.node.content}</p>
                                                                <Link to={`/${locale}/our-products/${ravlikItem.node.slug}`} className="small_button">Детальніше</Link>
                                                            </div>
                                                        </Link>
                                                    </ScrollAnimation>
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
            </>
        );
    }
}

const Production = (props) => {
    const { locale } = props.match.params
    let locales = ''
    if (props.match.params.locale === "uk"){
        locales = props.match.params.locale + "/our-products"
    }else if(props.match.params.locale === "fr"){
        locales =  "la-production/"
    }else if(props.match.params.locale === undefined){
        locales =  "products/"
    }
    const locales_url_prefix = locales ? '/' + locales : ''

    return (
        <Query query={gql`
        {
           pageBy(uri: "${locales_url_prefix}") {
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
export default withRouter( Production );
