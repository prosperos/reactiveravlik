import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
//import { Link } from 'react-router-dom'


const HomeBanner = () => (
    <Query query={gql`
{
  pageBy(uri: "main-home") {
    id
    title
    slug
    uri
    home{
      homeBannerLogo {
        sourceUrl
      }
      homeBannerText
      homeBannerImage {
        sourceUrl
      }
      homeAboutUsImage{
        sourceUrl
      }
      homeAboutUsTitle
      homeAboutUsText
      homeAboutUsBtnName
      homeAboutUsBtnUrl
      
      ourServicesTitle
      ourServicesItems {
       \tourServicesIcon{
          sourceUrl
        }
        ourServicesDescription
        ourServicesTitle
      }
      
      ourProductsTitle
      
      productionTitle
      productionDescription
      productionImage{
        sourceUrl
      }
      exportTitle
      exportTitle
      exportImage{
        sourceUrl
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
                var properties = []
                for (var k in data.pageBy.home) {
                    var v = data.pageBy.home[k]
                    properties.push({key: k, value: v})
                }

                return (
                    <div className="container">
                        <div className="row">
                        {

                           properties.map((item, key) => {
                               const bg_logo = {
                                   'backgroundImage': 'url()',
                                   'textAlign' :'center',

                               }
                               {
                                   console.log(item.key, item.value)
                               }
                                return(
                                    //dataItems.exportTitle
                                    <div key={key} style={bg_logo}>
                                        <div className="col-md-6">
                                            <div className="img_logo" style={{color: 'red'}}>
                                                <h1>tetd</h1>
                                            </div>
                                        </div>
                                        <div className="col-md-6"></div>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                )

                   /* data.ravliks.edges.map(( ravlikItem, key) => {
                        return(
                            <div key={key}>
                                <h2>{ravlikItem.node.title}</h2>
                                <span>{ravlikItem.node.date}</span> <br/>
                                <Link to={`/ravlik/${ravlikItem.node.slug}`}>Learn more</Link>
                            </div>
                        )
                    })*/
            }
        }
    </Query>
)
export default HomeBanner;