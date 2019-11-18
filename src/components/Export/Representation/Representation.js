import React, { Component } from 'react';
import { Query } from 'react-apollo';
import  gql  from 'graphql-tag';
import classNames from 'classnames';

class PureRepresentation extends Component {

    render() {
        const { data } = this.props
        return(
            <div>


                <div className="representation_wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 move-button">
                                <div className="row">
                                    <div className="col-lg-2 align-content-center">
                                        <hr/>
                                    </div>
                                    <div className="col-lg-8">
                                        <h2>{data.pageBy.exportMeta.representationTitle}</h2>
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
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        );
    }
}

const Representation = () => {
    return (
        <Query query={gql`
{
  pageBy(uri: "uk/eksport") {
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