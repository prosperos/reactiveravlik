import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './UseCookies.scss'
import Footer from "../../common/Footer/Footer";
import Header from "../../common/Header/Header";
import ReactHtmlParser from 'react-html-parser'


class HtmlComponent extends React.Component {

    render() {
        return ReactHtmlParser(this.props.html)
    }
}


const UseCookies = () => (
    <Query query={gql`
{
  pageBy(uri: "uk/cookies") {
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
                //console.log("cookies", data)
                return (
                    <div className="сookies_wrapper">
                        <Header/>
                            <div className="сookies_inner">
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
export default UseCookies;