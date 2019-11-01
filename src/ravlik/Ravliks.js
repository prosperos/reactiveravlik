import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

const Ravliks = () => (
    <Query query={gql`
    {
        ravliks{
            edges {
              node{
                title
                date
                slug
               
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
                <div>
                    {
                        data.ravliks.edges.map(( ravlikItem, key) => {
                            return(
                                <div key={key}>
                                    <h2>{ravlikItem.node.title}</h2>
                                    <span>{ravlikItem.node.date}</span> <br/>
                                    <Link to={`/ravlik/${ravlikItem.node.slug}`}>Learn more</Link>
                                </div>
                            )
                        })
                    }
                </div>
            );
        }
    }
    </Query>
)
export default Ravliks;