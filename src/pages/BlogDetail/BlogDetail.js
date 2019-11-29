import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import './BlogDetail.scss'
import Footer from "../../common/Footer/Footer";
import ReactHtmlParser from 'react-html-parser'
import Page404 from "../Page404/Page404"
import Header from "../../common/Header/Header";
const dateFormat = require('dateformat')


class HtmlComponent extends React.Component {

    render() {
        return ReactHtmlParser(this.props.html)
    }
}

class BlogDetail extends React.Component{


    render() {
        const postBy = this.props.data && this.props.data.postBy
        if( !postBy ){
            return <Page404/>
        }

        const date = postBy.date
        const newDate = new Date(date)
        const finalDate = dateFormat(newDate, "dd.mm.yyyy" );
        return(
            <div>
                <Header/>
                <div className="article">
                    <div className="container_products">
                        <div className="product_content_line"></div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="product_image_mobile" style={{backgroundImage: `url(${postBy.featuredImage.sourceUrl})`}}></div>
                                    <div className="bg-text">
                                        <h1>{postBy.title}</h1>
                                        <p><HtmlComponent html={postBy.excerpt}/></p>
                                    </div>
                                </div>
                                <div className="col-lg-8 offset-lg-2 col-12">
                                    <div className="article_content">
                                        <HtmlComponent html={postBy.content} />
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <span className="date">{finalDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

const GetBlogDetailsBySlug = gql`
query getBlogBySlug($slug: String) {
   postBy(uri: $slug){
    title
    slug
    date
    excerpt
    content
    featuredImage{
      sourceUrl
    }
  }
}
`;

export default graphql(GetBlogDetailsBySlug, {
    options: (props) => {
        const slug = props.match.params.slug;
        return{
            variables: {
                slug
            }
        }
    }
})(BlogDetail);
