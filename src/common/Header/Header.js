import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './Header.scss'
import { generatePath } from "react-router";
import { Link, withRouter } from 'react-router-dom'
import { LOCALES, DEFAULT_LOCALE } from "../../constants";
import classNames from 'classnames'
import white_logo from './../../images/white_logo.png'
import StyledMenu from './components/StyledMenu'
import StyledBurger from './components/StyledBurger'
import WrapperMenu from './components/WrapperMenu'
import NavLinks from './components/NavLinks'
import WrapperLanguage from './components/WrapperLanguage'

import "animate.css/animate.min.css";
class HeaderMain extends React.Component{

    render() {
        const { data, currentLocale, location, match } = this.props
        const Menu = ({ open, location }) => {


            let array = ''
            if (this.props.match.params.locale === "uk") {
                 array = data.menus.nodes[0].menuItems.nodes;
            } else if (this.props.match.params.locale === "fr") {
                 array = data.menus.nodes[1].menuItems.nodes;
            } else if (this.props.match.params.locale === undefined) {
                 array = data.menus.nodes[2].menuItems.nodes;
            }
            return (
                <StyledMenu open={open}>
                    <WrapperLanguage className="language" open={open}>
                        <ul>
                            <li className='selected_language'>
                                {currentLocale}
                                <ul>
                                    {
                                        LOCALES.map(
                                            (locale, i) => {
                                                //const currentLocale = location.pathname.split('/')[1] || DEFAULT_LOCALE
                                                const active = locale === currentLocale
                                                const locale_param = locale === DEFAULT_LOCALE ? undefined : locale
                                                //const url = '/' + location.pathname.split('/').map((s, i) => i === 1 ? locale_param : s ).filter((param) => param && param.length).join('/')
                                                const url = generatePath(match.path, {
                                                    ...match.params,
                                                    locale: locale_param
                                                });

                                                return (
                                                    <li key={i} className={classNames({active: active})}>
                                                        <Link to={url}>{locale}</Link>
                                                    </li>
                                                )
                                            }
                                        )
                                    }
                                </ul>
                            </li>
                        </ul>
                    </WrapperLanguage>

                    {array.map((item,idx) =>{
                        const  s = item.url
                        let url = new URL(s).pathname


                        if ( url === '/' + DEFAULT_LOCALE) {
                            url = '/'
                        }
                        else if (url.indexOf('/' + DEFAULT_LOCALE + '/') === 0) {
                            url = url.substr(2, url.length)
                        }
                        return(
                            <div className='menu_item' key={idx}>
                                <Link to={url}>{item.label}</Link>
                            </div>
                        )
                    })}
                </StyledMenu>
            )
        }

        const Burger = ({ open, setOpen }) => {
            return (
                <StyledBurger open={open} onClick={() => setOpen(!open)}>
                    <div />
                    <div />
                    <div />
                </StyledBurger>
            )
        }


        const AppMenu = ({location}) => {
            const [open, setOpen] = React.useState(false);
            const node = React.useRef();
            return (
                <WrapperMenu open={open}  ref={node}>
                    <Burger open={open} setOpen={setOpen} />
                    <Menu location={location} open={open} setOpen={setOpen} />
                    <NavLinks className="nav_links" open={open} setOpen={setOpen}>
                        <a href={`tel:${data.pageBy.Header.facebookLink}`} ><span className="phone"></span></a>
                        <a href={data.pageBy.Header.facebookLink} ><span className="facebook"></span></a>
                        <a href={data.pageBy.Header.instagramLink} ><span className="insta"></span></a>
                    </NavLinks>
                </WrapperMenu>
            )
        }


        /* const useOnClickOutside = (ref, handler) => {
             React.useEffect(() => {
                     const listener = event => {
                         if (ref.current || ref.current.contains(event.target)) {
                             return;
                         }
                         handler(event);
                     };
                     document.addEventListener('mousedown', listener);

                     return () => {
                         document.removeEventListener('mousedown', listener);
                     };
                 },
                 [ref, handler],
             );
         };*/

        const locationBlog  = location.pathname.indexOf('blog');
        const HomeUrl = currentLocale === DEFAULT_LOCALE ? '/' : '/' + currentLocale

        return(
            <header id="mainMenu" className="main-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wrapper_logo">
                                <Link to={HomeUrl}>
                                    {locationBlog > 1 && location.pathname.length > 9
                                        ?
                                        <div className="main_logo" style={{backgroundImage: `url(${white_logo})`}}></div>
                                        :
                                        <div className="main_logo" style={{backgroundImage: `url(${data.pageBy.Header.headerLogo.sourceUrl})`}}></div>
                                    }
                                </Link>
                            </div>
                        </div>
                        <AppMenu location={location} />
                    </div>
                </div>
            </header>
        );
    }
}

const Header = (props) => {
    const currentLocale = props.match.params.locale || DEFAULT_LOCALE
    return (
        <Query query={gql`
    {
      menus {
        nodes {
          menuItems {
            nodes {
              label
              url
            }
          }
        }
      }
        pageBy(uri: "Header") {
        Header{
          headerLogo {
            sourceUrl
          }
          headerPhone
          instagramLink
          facebookLink
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
                    return <HeaderMain data={data} currentLocale={currentLocale} {...props} />
                }
            }
        </Query>
    )
}
export default withRouter(Header);