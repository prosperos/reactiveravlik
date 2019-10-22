import React, { Component } from 'react';
import { Query } from 'react-apollo'
import  gql  from 'graphql-tag'

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
            initialSlide: 0

        };
    }


    render() {
        const { data, locale } = this.props
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

                                    <Link to={`/ravlik/}`}  className="slider_item first">
                                        <div className="ravlik_image"></div>
                                        <div className="wrapper_info_rawlik">
                                            <h3></h3>
                                            <p></p> <br/>
                                        </div>
                                    </Link>
                                    {
                                        data.ravliks.edges.map(( ravlikItem, key) => {
                                            return(
                                                <Link to={`/${locale}/produktsiya/${ravlikItem.node.slug}`} key={key} className="slider_item">
                                                    <div className="ravlik_image" style={{backgroundImage: `url(${ravlikItem.node.featuredImage.sourceUrl})`}}></div>
                                                    <div className="wrapper_info_rawlik">
                                                        <h3>{ravlikItem.node.title}</h3>
                                                        <p>{ravlikItem.node.content}</p>
                                                        <Link to={`/${locale}/produktsiya/${ravlikItem.node.slug}`} className="small_button">Детальніше</Link>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                    {/*<Link to={`/ravlik/}`}  className="slider_item last">
                                        <div className="ravlik_image"></div>
                                        <div className="wrapper_info_rawlik">
                                            <h3></h3>
                                            <p></p> <br/>
                                        </div>
                                    </Link>*/}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const Production = (props) => {
    const { locale } = props.match.params

    return (
        <Query query={gql`
        {
          pageBy(uri: "/uk/produktsiya") {
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
                ({loading, error, data}) => {
                    if (loading) {
                        return null;
                    }
                    if (error) {
                        console.log(error)
                        return
                    }


                    return <PureProduction data={data} locale={locale} />
                }
            }
        </Query>
    )
}
export default Production;

//fetch("/index.php?graphql", {"credentials":"include","headers":{"accept":"application/json","accept-language":"en-US,en;q=0.9,uk;q=0.8,ru;q=0.7","content-type":"application/json","x-wp-nonce":"a295687a2e"},"referrer":"http://reactwp/wp-admin/admin.php?page=wp-graphiql%2Fwp-graphiql.php&query=%7B++ravliks%28where%3A+%7Blanguage%3A+EN%7D%29+%7B++++edges+%7B++++++node+%7B++++++++title++++++++slug++++++++ravlikMeta+%7B++++++++++amount++++++++++price++++++++%7D++++++%7D++++%7D++%7D%7D","referrerPolicy":"strict-origin-when-cross-origin","body":"{\"query\":\"{\\n  ravliks(where: {language: EN}) {\\n    edges {\\n      node {\\n        title\\n        slug\\n        ravlikMeta {\\n          amount\\n          price\\n        }\\n      }\\n    }\\n  }\\n}\\n\",\"variables\":null}","method":"POST","mode":"cors"});

