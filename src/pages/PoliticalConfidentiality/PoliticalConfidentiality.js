import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './PoliticalConfidentiality.scss'
import Footer from "../../common/Footer/Footer";
import Header from "../../common/Header/Header";
import ReactHtmlParser from 'react-html-parser'


class HtmlComponent extends React.Component {

    render() {
        return ReactHtmlParser(this.props.html)
    }
}


const PoliticalConfidentiality = () => (
    <Query query={gql`
{
  pageBy(uri: "political") {
    title
    content
  }
}
    `
    }>
        {
            ({ loading, error, data}) => {
                if (loading){
                    return null;
                }
                console.log(data)
                return (
                    <div className="political_wrapper">
                        <Header/>
                        <div className="political_inner">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="title_wrapper">
                                            <h1><HtmlComponent html={data.pageBy.title}/></h1>
                                            <hr/>
                                        </div>
                                        <div className="wrapper_content">
                                            <p>
                                                <HtmlComponent html={data.pageBy.content}/>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Footer/>
                    </div>
                )
            }
        }
    </Query>
)
export default PoliticalConfidentiality;