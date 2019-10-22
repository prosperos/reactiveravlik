import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import './ProductionItem.scss'
import {Link} from "react-router-dom";

class ProductionItem extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            disabledNext: false,
            disabledPrev: false,
        }
    }

    get items() {
        //console.log("items: ", this.props)
        return this.props.data.ravliks.edges
    }

    get currentItem() {
        return this.items[this.currentIndex]
    }

    get currentIndex() {
        const { slug, locale } = this.props.match.params

        for (let i = 0; i < this.items.length; i++){
            let item = this.items[i];

            //console.log('for index ', item)
            //console.log('current',slug)
            if (item.node.slug === slug) {
                return i
            }

        }
        return -1
      /*  return this.items.indexOf((item) => {
            //console.log("currentIndex: item: ", item, " ; slug: ", slug)
            return item.node.slug === slug
        })*/
    }

    get nextItem() {
        const items = this.items
        let index = this.currentIndex + 1
        if (index > items.length - 1) {
            index = 0
        }

        console.log('nextItem: ', items[index])
        console.log('index: ', index)
        return items[index].node
    }

    get prevItem() {
        const items = this.items
        let index = this.currentIndex - 1
        if (index < 0) {
            index = items.length - 1
        }
        return items[index].node
    }

    getItemUrl = (item) => {
        return `/${this.props.match.params.locale}/produktsiya/${item.slug}`
    }


    render() {
       // console.log('RENDER: slug: ', this.props.match.params.slug)
        //console.log(this.items)
        const props = this.props;


        const { index, disabledNext, disabledPrev } = this.state
        const profile = this.props.profiles ? this.props.profiles[index] : null

       // console.log('data', this.props.match.params);

        if( !props.data.ravlik){
            return null
        }

        const item = this.currentItem

        return(
            <div className="wrapper_products">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 vertical_content">
                            <div className="content_inner">
                                <h1>{props.data.ravlik.title}</h1>
                                <hr/>
                                <p>{props.data.ravlik.content}</p>
                            </div>
                            <div className="product_info">
                                <strong>{props.data.ravlik.ravlikMeta.price}</strong>
                                <br />
                                <strong>{props.data.ravlik.ravlikMeta.amount}</strong>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="product_image_line"></div>
                            <div className="produtct_image" style={{backgroundImage: `url(${props.data.ravlik.featuredImage.sourceUrl})`}}></div>
                        </div>

                    <div className="wrapper_button">
                        <Prev url={this.getItemUrl(this.prevItem)} />
                        <Next url={this.getItemUrl(this.nextItem)} />
                    </div>

                    </div>
                </div>
            </div>
        );
    }
}
function Prev(props) {
    return (
        <Link to={props.url} className="prew"></Link>
    );
}

function Next(props) {
    return (
        <Link to={props.url} className="next"></Link>
    );
}





const GetProductionItemsBySlug = gql`
query getRavkliksBySlug($slug: String) {
  ravlik: ravlikBy(uri: $slug){
    title
    slug
    content
    featuredImage{
      sourceUrl
    }
    categories {
      edges {
        node {
          description
          name
        }
      }
    }
    ravlikMeta{
      price
      amount
    }
  }
  
        ravliks {
            edges {
              node{
                title
                slug
                content
                featuredImage{
                  sourceUrl
                }
                ravlikMeta{
                  amount
                  price
                }
              }
            }
        }
        pageBy(uri: "page-of-text") {
            allText {
              category
              umovyZberihannya
            }
        }
}


`;

export default graphql(GetProductionItemsBySlug, {
    options: (props) => {
        const slug = props.match.params.slug;
        return{
            variables: {
                slug
            }
        }
    }
})(ProductionItem);
