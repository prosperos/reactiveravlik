import React, { Component } from 'react';
import { Query } from 'react-apollo';
import  gql  from 'graphql-tag';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

import './Page404.scss'
class PurePage404 extends Component {

    render() {
        const { data } = this.props

        if (data && document.querySelector('#mainMenu')) {
            let header = document.querySelector('#mainMenu').style.display = "none";
        }

        return(
            <div className="page_404">
                <div className="container">
                    <div className="row">
                        <div className="offset-lg-3 col-lg-6">
                            <div className="wrapper_404">
                                <img src={data.pageBy.featuredImage.sourceUrl} alt=""/>
                                <h1>{data.pageBy.title}</h1>
                                <p>{data.pageBy.content}</p>
                               <Link to="/" className="big_button">{data.pageBy.page404.page404ButtonName}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const Page404 = () => {
    return (
        <Query query={gql`
{
  pageBy(uri: "uk/page404-2") {
    title
    content
    featuredImage {
      sourceUrl
    }
    page404{
      page404ButtonName
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

                    return <PurePage404 data={data} />
                }
            }
        </Query>
    )
}
export default Page404;