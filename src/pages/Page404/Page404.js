import React, { Component } from 'react';
import { Query } from 'react-apollo';
import  gql  from 'graphql-tag';
import { Link, withRouter } from 'react-router-dom';
import './Page404.scss'

class PurePage404 extends Component {
    render() {
        const { data } = this.props
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

const Page404 = (props) => {
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
                    return <PurePage404 data={data} {...props} />
                }
            }
        </Query>
    )
}
export default withRouter(Page404);