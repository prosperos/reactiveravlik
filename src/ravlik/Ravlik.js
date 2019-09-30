import React, { Component} from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'


class Ravlik extends Component{
    render() {
        const props = this.props;
        console.log({props});

        if( !props.data.ravlik){
            return (<p>loading...</p>)
        }
        return(
            <div>
                <h2>{props.data.ravlik.title}</h2>
                <strong>{props.data.ravlik.ravlikMeta.price}</strong>
                <br />
                <strong>{props.data.ravlik.ravlikMeta.amount}</strong>
            </div>
        );
    }
}


const GetRavliksBySlug = gql`
query getRavkliksBySlug($slug: String) {
  ravlik: ravlikBy(uri: $slug){
    title
    ravlikMeta{
      price
      amount
    }
  }
}
`;

export default graphql(GetRavliksBySlug, {
    options: (props) => {
        const slug = props.match.params.slug;
        return{
            variables: {
                slug
            }
        }
    }
})(Ravlik);
