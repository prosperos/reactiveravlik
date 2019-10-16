import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import './Header.scss'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { LOCALES, DEFAULT_LOCALE } from "../../constants";
import classNames from 'classnames'


const Header = ({location}) => (
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
                    return (<br/>);
                }
                const WrapperLanguage = styled.div`
                    left : ${({ open }) => open ? '25px' : '322px'};
                        @media (max-width: 576px) {
                            left : ${({ open }) => open ? '25px' : '0'};
                        }
                `
                const NavLinks = styled.div`
                    position: absolute;
                    bottom: 35px;
                    left:${({ open }) => open ? '25px' : ' 25%'} ;
                    width:  ${({ open }) => open ? '65px' : ' 65px'};
                    @media (max-width: 576px) {
                       width:  ${({ open }) => open ? '300px' : ' 0'};
                       display : ${({ open }) => open ? 'block' : 'none'};
                    }
                `
                const WrapperMenu = styled.div`
                    position: fixed;
                    z-index: 2000;
                    background-color: #ffffff;
                    width:  ${({ open }) => open ? '300px' : '65px'};
                    height: 100vh;
                    box-shadow: 0 0 30px #E6E7E8;
                    @media (max-width: 576px) {
                      box-shadow: none;
                      background-color: transparent;
                      width: 80%;
                    }
                `
                const StyledMenu = styled.nav`
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  background: #ffffff;
                  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
                  height: 100vh;
                  text-align: left;
                  width: 300px;
                  top: 0;
                  left: 0;
                  transition: transform 0.3s ease-in-out;
                  box-shadow: 0 0 30px #E6E7E8;
                  @media (max-width: 576px) {
                      width:100%;
                      box-shadow: none;
                  }
                
                  a {
                    font-size: 20px;
                    padding-bottom: 20px;
                    padding-left: 50px;
                    line-height: 27px;
                    color: #747474;
                    text-decoration: none;
                    transition: color 0.3s linear;
                
                    @media (max-width: 576px) {
                      font-size: 1.5rem;
                      text-align: center;
                    }
                
                    &:hover {
                      color: #343078;
                    }
                  }
                `

                const Menu = ({ open, location }) => {
                    let array = data.menus.nodes[0].menuItems.nodes;
                    //console.log("Menu: location: ", JSON.parse(JSON.stringify(location)))

                    return (
                        <StyledMenu open={open}>
                            <WrapperLanguage className="language" open={open}>
                                <ul>
                                    <li className='selected_language'>
                                        {location.pathname.split('/')[1] || DEFAULT_LOCALE}
                                        <ul>
                                            {
                                                LOCALES.map(
                                                    (locale, i) => {
                                                        const currentLocale = location.pathname.split('/')[1] || DEFAULT_LOCALE
                                                        const active = locale === currentLocale
                                                        const url = location.pathname.split('/').map((s, i) => i === 1 ? locale : s ).join('/')
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
                                const url = new URL(s).pathname
                                return(
                                    <div className='menu_item' key={idx}>
                                        <Link to={url}>{item.label}</Link>
                                    </div>
                                )
                            })}
                        </StyledMenu>
                    )
                }

                const StyledBurger = styled.button`
                  position: absolute;
                  top: 50%;
                  transform: translate(-50%, -50%);
                  left: ${({ open }) => open ? '90%' : '50%'};
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                  width: 21px;
                  height:${({ open }) => open ? '31px' : '21px'} ;
                  background: transparent;
                  border: none;
                  cursor: pointer;
                  padding: 0;
                  z-index: 3110;
                
                   
                  &:focus {
                    outline: none;
                  }
                    @media (max-width: 576px) {
                    top:45px;
                    left: ${({ open }) => open ? '92%' : '12%'};
                    }
                  div {
                    width: 25px;
                    height: 2px;
                    background: ${({ open }) => open ? '#747474' : '#747474'};
                    border-radius: 10px;
                    transition: all 0.3s linear;
                    position: relative;
                    transform-origin: 1px;
                
                    :first-child {
                      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
                    }
                
                    :nth-child(2) {
                      opacity: ${({ open }) => open ? '0' : '0'};
                      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
                      display: none;
                    }
                
                    :nth-child(3) {
                      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
                    }
                  }
                `

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

                return(
                    <header  id="mainMenu" className="main-header">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="wrapper_logo">
                                        <Link to="/">
                                            <div className="main_logo" style={{backgroundImage: `url(${data.pageBy.Header.headerLogo.sourceUrl})`}}></div>
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
    </Query>
)
export default withRouter(props => <Header {...props}/>);