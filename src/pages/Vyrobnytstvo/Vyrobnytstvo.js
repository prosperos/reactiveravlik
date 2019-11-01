import React, { Component } from 'react';
import { Query } from 'react-apollo';
import  gql  from 'graphql-tag';
import classNames from 'classnames';
import './Vyrobnytstvo.scss';
import Footer from "../../common/Footer/Footer";

class PureVyrobnytstvo extends Component {

    render() {
        const { data } = this.props
        return(
            <div>
                <div className="vyrobnytstvo_wrapper">
                    <div className="virobnytstvo_line"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 align-bottom">
                                <div className="title_content">
                                    <h1>{data.pageBy.title}</h1>
                                    <hr/>
                                    <p>{data.pageBy.content}</p>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div className="vyrobnytstvo_bunner_image" style={{backgroundImage: `url(${data.pageBy.featuredImage.sourceUrl})`}}></div>
                                <div className="vyrobnytstvo_bunner_image_small" style={{backgroundImage: `url(${data.pageBy.production.smallImage.sourceUrl})`}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="prosses_vyrobnytstva">
                    <div className="vertical_line"></div>
                    <div className="prosses_line">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-11 offset-lg-1 col-12">
                                        {
                                            data.pageBy.production.leftRightContentItem.map((productionItem, key) => {
                                                const col_class = classNames({'col-lg-5': true, 'order-first': key  % 2 !== 0})
                                                return (
                                                    <div className="row item_proсess" key={key}>
                                                        <div className="col-lg-7"  >
                                                            <div className="prosses_image" style={{backgroundImage: `url(${productionItem.growingImage.sourceUrl})`}}></div>
                                                        </div>
                                                        <div className={col_class}>
                                                            <div className="prosses_info">
                                                                <h2>{productionItem.growingTitle}</h2>
                                                                <hr/>
                                                                <div className="prosses_image_mobile" style={{backgroundImage: `url(${productionItem.growingImage.sourceUrl})`}}></div>
                                                                <p>{productionItem.growingText}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="advanteges_vyrobnytstva">
                    <div className="horisontal_line"></div>
                    <div className="advanteges_line">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-11 offset-lg-1 col-12">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="advanteges_image" style={{backgroundImage: `url(${data.pageBy.production.ourAdvantagesImage.sourceUrl})`}}></div>
                                        </div>
                                        <div className="col-lg-7 aling-center">
                                            <div className="inner_wrapper">
                                                <h2>{data.pageBy.production.ourAdvantagesTitle}</h2>
                                                <hr/>
                                                <div className="item_proсess" >
                                                {
                                                    data.pageBy.production.ourAdvantagesDetails.map((productionItem, key) => {
                                                        return (
                                                            <div className="prosses_info" key={key}>
                                                                <h2>{productionItem.detailsTitle}</h2>
                                                                <strong>{productionItem.detailsDescription}</strong>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

const Vyrobnytstvo = () => {
    return (
        <Query query={gql`
    {
  pageBy(uri: "uk/vyrobnytstvo") {
    title
    content
    featuredImage{
      sourceUrl
    }
    production{
      smallImage{
        sourceUrl
      }
      leftRightContentItem{
        growingTitle
        growingText
        growingImage{
          sourceUrl
        }
      }
      ourAdvantagesTitle
        ourAdvantagesImage{
        sourceUrl
      }
      ourAdvantagesDetails {
        detailsDescription
        detailsTitle
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

                    return <PureVyrobnytstvo data={data} />
                }
            }
        </Query>
    )
}
export default Vyrobnytstvo;