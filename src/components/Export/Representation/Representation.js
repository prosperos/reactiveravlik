import React, { Component } from 'react';
import { Query } from 'react-apollo';
import  gql  from 'graphql-tag';
import classNames from 'classnames'
import ScrollAnimation from 'react-animate-on-scroll'

class PureRepresentation extends Component {

    render() {
        const { data } = this.props
        return(
            <>
                <div className="representation_wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 move-button">
                                <div className="row">
                                    <div className="col-lg-2 align-content-center">
                                        <ScrollAnimation animateIn="fadeInLeft"  >
                                            <hr/>
                                        </ScrollAnimation>
                                    </div>
                                    <div className="col-lg-8">
                                        <ScrollAnimation delay={450} animateIn='fadeIn'>
                                            <h2>{data.pageBy.exportMeta.representationTitle}</h2>
                                        </ScrollAnimation>
                                    </div>
                                </div>
                            </div>
                            <div className="offset-lg-1 col-lg-10">
                                <div className="row">
                                    {
                                        data.pageBy.exportMeta.representationCountryItems.map((representationItem, key) => {

                                            const wrapper_item = classNames({'col-lg-6' : true, 'offset-lg-6 margin-sm-15' : key === 0 , 'move-item' : key === 1 })
                                            return (
                                                <div className={wrapper_item} key={key}>
                                                    <ScrollAnimation delay={300* (key+1)} animateIn='fadeIn'>
                                                        <div className="partner_info" >
                                                            <h2>{representationItem.countryName}</h2>
                                                            <hr/>
                                                            <div className="contact_details">
                                                                <h3>{representationItem.personName}</h3>
                                                                <a className="phone" href={representationItem.phone}>{representationItem.phone}</a>
                                                                <a className="email" href={representationItem.email}>{representationItem.email}</a>
                                                                <address>{representationItem.address}</address>
                                                            </div>
                                                        </div>
                                                    </ScrollAnimation>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );
    }
}

const Representation = () => {
    return (
        <Query query={gql`
{
  pageBy(uri: "uk/export") {
    exportMeta{
      representationTitle
      representationCountryItems{
        countryName
        personName
        phone
        email
        address
      }
    
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

                    return <PureRepresentation data={data} />
                }
            }
        </Query>
    )
}
export default Representation;