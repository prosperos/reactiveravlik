import React, { Component } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import './Blog.scss'
import Pagination from "react-js-pagination";
const dateFormat = require('dateformat')

class PureBlog extends Component {

    render(){
        const { data, locale } = this.props
        return(
            <div className="home_blog main-blog">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-1">
                            <hr/>
                        </div>
                        <div className="col-lg-11 center-block">
                            <h2 className="main_title">Блог
                            </h2>
                        </div>
                        {
                            data.posts.edges.map(( blogItem, key) => {
                                const date = blogItem.node.date
                                const newDate = new Date(date)
                                const finalDate = dateFormat(newDate, "dd.mm.yyyy" );
                                return(
                                    <div className="col-lg-10 offset-lg-1 col-xl-10 offset-xl-1 col-sm-10 offset-sm-1" key={key}>
                                        <Link className="wrapper_article" to={`/${locale}/bloh/${blogItem.node.slug}`}>
                                            <div className="blog-thumbnail">
                                                <div className="blog_img" style={{backgroundImage: `url(${blogItem.node.featuredImage.sourceUrl})`}}></div>

                                            </div>
                                            <div className="exept_info">
                                                <span className="date">{finalDate}</span>
                                                <h3 className="title_blog">{blogItem.node.title}</h3>
                                                <p>{blogItem.node.excerpt}</p>
                                                <span className="small_button" href={`/${locale}/bloh/${blogItem.node.slug}`}>{data.pageBy.allText.buttonName}</span>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                        <div className="col-lg-11 center-block">


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const Blog = (props) => {

    const { locale } = props.match.params

    return(
    <Query query={gql`
  {
    posts{
      edges{
        node{
          title
          excerpt
          slug
          date
          featuredImage{
            sourceUrl
          }
        }
      }
    }
     pageBy(uri: "page-of-text") {
        allText {
          buttonName
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
                return <PureBlog data={data} locale={locale} />

            }
        }
    </Query>
    )
}
export default Blog;