import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import './Blog.scss'
import classNames from 'classnames'

const Blog = () => (
    <Query query={gql`
  {
        pageBy(uri: "main-home") {
            home{
              blogTitle 
              blogButtonText
            }
          }
            posts{
              edges{
                node{
                  title
                  excerpt
                  slug
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
            ({ loading, error, data}) => {
                if (loading){
                    return (<h1>Loading</h1>);
                }
                return(
                    <div className="home_blog">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-1">
                                    <hr/>
                                </div>
                                <div className="col-lg-11">
                                    <h2 className="main_title">
                                        {data.pageBy.home.blogTitle}
                                    </h2>
                                </div>
                               {
                                   data.posts.edges.map(( blogItem, key) => {
                                        return(
                                            <div className="col-lg-4" key={key}>
                                                <Link to={`/blog/${blogItem.node.slug}`}>
                                                    <div className="blog-thumbnail">
                                                        <div className="blog_img" style={{backgroundImage: `url(${blogItem.node.featuredImage.sourceUrl})`}}></div>
                                                        <h3 className="title_blog">{blogItem.node.title}</h3>
                                                        <p>{blogItem.node.excerpt}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                                <div className="col-lg-12">
                                    <div className="btn_wrapper">
                                        <Link to={`/blog/`} className="big_button">{data.pageBy.home.blogButtonText}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    </Query>
)
export default Blog;