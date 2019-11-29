import styled from "styled-components";

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
                      
                      
                      :hover{
                        div{
                            background:#D1AD1F;
                        }
                      }
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

export default StyledBurger