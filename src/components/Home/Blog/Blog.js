import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link, withRouter } from 'react-router-dom'
import './Blog.scss'
import ScrollAnimation from 'react-animate-on-scroll'


const Blog = (props) => (
    <Query query={gql`
  {
        pageBy(uri: "uk/main-home") {
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
                    return null;
                }
                const {location} = props
                return(
                    <div className="home_blog">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-1">
                                    <ScrollAnimation  animateIn='fadeInLeft'>
                                    <hr/>
                                    </ScrollAnimation>
                                </div>
                                <div className="col-lg-11 center-block">
                                    <ScrollAnimation animateIn='fadeIn' delay={400}>
                                        <h2 className="main_title">
                                            {data.pageBy.home.blogTitle}
                                        </h2>
                                        <hr/>
                                    </ScrollAnimation>
                                </div>
                                   {
                                       data.posts.edges.map(( blogItem, key) => {
                                           const isMobile = window.innerWidth < 480;

                                           if (key > 2 || (isMobile && key > 0 ))
                                               return false;
                                            return(
                                                <div className="col-lg-4" key={key}>
                                                    <ScrollAnimation  animateIn='fadeInUp' delay={700}>
                                                        <Link to={`${location.pathname}blog/${blogItem.node.slug}`}>
                                                            <div className="blog-thumbnail">
                                                                <div className="blog_img" style={{backgroundImage: `url(${blogItem.node.featuredImage.sourceUrl})`}}></div>
                                                                <h3 className="title_blog">{blogItem.node.title}</h3>
                                                                <p>{blogItem.node.excerpt}</p>
                                                            </div>
                                                        </Link>
                                                    </ScrollAnimation>
                                                </div>
                                            )
                                        })
                                    }
                                <div className="col-lg-12">
                                    <ScrollAnimation  animateIn='fadeIn' delay={750}>
                                        <div className="btn_wrapper">
                                            <Link to={`${location.pathname}blog/`} className="big_button">{data.pageBy.home.blogButtonText}</Link>
                                        </div>
                                    </ScrollAnimation>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    </Query>
)
export default withRouter(Blog);