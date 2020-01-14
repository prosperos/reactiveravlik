import 'aos/dist/aos.css';
import React, { Component } from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import './Blog.scss'
import classnames from 'classnames'
import Footer from "../../common/Footer/Footer";
import Header from "../../common/Header/Header";
import AOS from 'aos';


const dateFormat = require('dateformat')

class PureBlog extends Component {

    constructor(props, context) {
        super(props, context);
        AOS.init();
    }

    componentWillReceiveProps (){
        AOS.refresh();
    }
    state = {
        list:  [],
        page: 0,
        pageSize: 5
    }

    get pagination() {

        const list = this.props.data.posts.edges


        const {  pageSize } = this.state;
        const size = list.length / pageSize;
        let pagination = [];

        for (let index = 0; index < size; index++) {
            pagination.push(
                <span key={index} className={classnames({active: this.state.page === index})} onClick={() =>this.changePage(index)}>{index + 1}</span>
            )
        }

        return pagination;
    }

    get page() {
        const list = this.props.data.posts.edges;
        const {  page, pageSize } = this.state;
        return list.slice(page * pageSize, (page + 1) * pageSize);
    }

    changePage(page) {
        this.setState({ page });
    }

    render(){

        const { data, locale } = this.props

        return(
            <div>
                <Header/>
                <div className="home_blog main-blog">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-1">
                                <hr data-aos="fade-in-left" data-aos-delay="50"/>
                            </div>
                            <div className="col-lg-11 center-block">
                                <h2 data-aos="fade-in" data-aos-delay="150" className="main_title">Блог</h2>
                            </div>
                            <div className="col-lg-12 center-block">
                                <div className="row">
                                    {
                                        this.page.map(( blogItem, key) => {
                                            const date = blogItem.node.date
                                            const newDate = new Date(date)
                                            const finalDate = dateFormat(newDate, "dd.mm.yyyy" );
                                            return(
                                                <div className="col-lg-10 offset-lg-1 col-xl-10 offset-xl-1 col-sm-10 offset-sm-1" key={key}>
                                                    <Link data-aos="fade-in" data-aos-delay="550" className="wrapper_article" to={`/${locale}/blog/${blogItem.node.slug}`}>
                                                        <div className="blog-thumbnail">
                                                            <div className="blog_img" style={{backgroundImage: `url(${blogItem.node.featuredImage.sourceUrl})`}}></div>
                                                        </div>
                                                        <div className="exept_info">
                                                            <span className="date">{finalDate}</span>
                                                            <h3 className="title_blog">{blogItem.node.title}</h3>
                                                            <p>{blogItem.node.excerpt}</p>
                                                            <span className="small_button" href={`/${locale}/blog/${blogItem.node.slug}`}>{data.pageBy.allText.buttonName}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className={'pagination'}  data-aos="fade-in" data-aos-delay="750">
                                            <span className="prew" onClick={() =>this.changePage(0)} ></span>
                                                {this.pagination}
                                            <span className="last" onClick={() =>this.changePage(Math.floor(data.posts.edges.length / this.state.pageSize))} ></span>
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