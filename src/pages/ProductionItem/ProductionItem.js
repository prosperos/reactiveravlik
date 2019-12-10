import 'aos/dist/aos.css'
import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import './ProductionItem.scss'
import {Link} from "react-router-dom";
import Page404 from "../Page404/Page404"
import Header from "../../common/Header/Header";
import AOS from 'aos';



class ProductionItem extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            disabledNext: false,
            disabledPrev: false,
            startAnimation: false
        }
    }

    componentDidMount() {
        AOS.init();
    }

    get items() {
        //console.log("items: ", this.props)
        return this.props.data.ravliks.edges
    }

    get currentItem() {
        return this.items[this.currentIndex]
    }

    get currentIndex() {
        const { slug } = this.props.match.params

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

        //console.log('nextItem: ', items[index])
        //console.log('index: ', index)
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
        return `/${this.props.match.params.locale}/our-products/${item.slug}`
    }

    render() {
        const props = this.props;
        if( !props.data.ravlik){
            return <Page404/>
        }
        return(
            <div className="container_product">
                <Header/>
                <div className="wrapper_products">
                    <div className="product_content_line" data-aos="fade-left" data-aos-delay="350"></div>
                    <div className="product_image_line" data-aos="fade-in" data-aos-delay="750"></div>
                    <div className="product_detail_leaf_right_bottom"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="product_image_mobile" style={{backgroundImage: `url(${props.data.ravlik.featuredImage.sourceUrl})`}}></div>
                            </div>
                            <div className="col-lg-6 vertical_content">
                                <div className="content_inner">
                                    <h1  data-aos="fade-in" data-aos-delay="50">{props.data.ravlik.title}</h1>
                                    <hr  data-aos="fade-right" data-aos-delay="150"/>
                                    <div className="ravlik_text" data-aos="fade-in" data-aos-delay="350">
                                        <p>{props.data.ravlik.content}</p>
                                    </div>
                                </div>
                                <div className="product_info" data-aos="fade-left" data-aos-delay="350">
                                    <div className="innert_product_info">
                                        <div className="category_title"><h3>{props.data.pageBy.allText.category}</h3></div>
                                        <div className="wrapper_category_items">
                                            <ul>
                                            {
                                                props.data.ravlik.categories.edges.map(( ravlikItem, key) => {
                                                    return(
                                                        <li  key={key} className="rawlik_name">
                                                           <strong> {ravlikItem.node.name}</strong>
                                                        </li>
                                                    )
                                                })
                                            }
                                            </ul>
                                            <ul>
                                                {
                                                    props.data.ravlik.categories.edges.map(( ravlikItem, key) => {
                                                        return(
                                                            <li key={key}  className="rawlik_description">
                                                                {ravlikItem.node.description}
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="innert_product_info">
                                        <div className="storage_conditions"><h3>{props.data.pageBy.allText.umovyZberihannya}</h3></div>
                                        <p>{props.data.ravlik.ravlikMeta.storageConditions}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 static_img">
                                <div className="produtct_image" data-aos="fade-left" data-aos-delay="550" style={{backgroundImage: `url(${props.data.ravlik.featuredImage.sourceUrl})`}}></div>
                            </div>

                        </div>
                    </div>
                    <div className="full_height_wrapper" data-aos="fade-in" data-aos-delay="950">
                        <div className="wrapper_button"  >
                            <Prev url={this.getItemUrl(this.prevItem)} />
                            <Next url={this.getItemUrl(this.nextItem)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const prevNextHandler = () => {
    const aos_elements = document.querySelectorAll(".aos-init")
    aos_elements.forEach((item) => {
        item.classList.remove("aos-animate")
        item.classList.remove("aos-init")
    })

    setTimeout(() => {
        AOS.init()
    }, 900)
}

function Prev(props) {
    return (
        <Link to={props.url} onClick={prevNextHandler} className="prew"></Link>
    );
}

function Next(props) {
    return (
        <Link to={props.url} onClick={prevNextHandler} className="next"></Link>
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
        storageConditions
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
                storageConditions
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
