import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import button_scroll from './../../../images/bottom_scroll.png'
import './HomeBanner.scss'
import { Link} from "react-scroll";

const HomeBanner = (props) => (

//    pageBy(uri: "main-home-${props.locale}") {
    <Query query={gql`
{
  pageBy(uri: "uk/main-home") {
  
    home{
      homeBannerLogo {
        sourceUrl
      }
      homeBannerText
      homeBannerImage {
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
                var properties = []
                for (var k in data.pageBy.home) {
                    var v = data.pageBy.home[k]
                    properties.push({key: k, value: v})
                }

                const image_url = data.pageBy.home.homeBannerLogo.sourceUrl
                const banner_bg_url = {
                    backgroundImage: `url(${image_url})`
                }
                const  homeBannerImage = data.pageBy.home.homeBannerImage.sourceUrl
                const homeBannerImageStyle = {
                    backgroundImage: `url(${homeBannerImage})`
                }
                return (
                    <div className="wrapper_bunner_content">
                        <div className="container">
                            <div className="row center_content">
                                <div className="col-lg-6">
                                    <div className="wrpapper_left_info">
                                        <div className="img_logo" style={banner_bg_url}></div>
                                        <div className="home_banner_text">
                                            <hr/>
                                            <div className="banner_text">
                                               <p>{data.pageBy.home.homeBannerText}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="bg_image" style={homeBannerImageStyle}></div>
                                </div>
                                <div className="col-lg-12">
                                    <Link to="wrapper_aboutus_content"  smooth={true} duration= {1500} className="scroll_next_block">
                                        <img src={button_scroll} alt=""/>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )

                /*
                return (
                    <div className="container">
                        <div className="row">
                        {

                           properties.map((item, key) => {
                               const bg_logo = {
                                   'backgroundImage': 'url({{data.pageBy.home.homeBannerImage.sourceUrl})',
                                   'textAlign' :'center',

                               }
                               {
                                   //console.log(item.key, item.value)
                               }
                                return(
                                    //dataItems.exportTitle
                                    <div key={key} style={bg_logo}>
                                        <div className="col-md-6">
                                            <div className="img_logo" style={{color: 'red'}}>

                                            </div>
                                        </div>
                                        <div className="col-md-6"></div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                )*/

                   /* data.ravliks.edges.map(( ravlikItem, key) => {
                        return(
                            <div key={key}>
                                <h2>{ravlikItem.node.title}</h2>
                                <span>{ravlikItem.node.date}</span> <br/>
                                <Link to={`/ravlik/${ravlikItem.node.slug}`}>Learn more</Link>
                            </div>
                        )
                    })*/
            }
        }
    </Query>
)
export default HomeBanner;