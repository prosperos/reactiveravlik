import styled from "styled-components";

const WrapperMenu = styled.div`
    position: fixed;
    z-index: 2000;
    
    width:  ${({ open }) => open ? '300px' : '65px'};
    height: 100vh;
    box-shadow: ${({ open }) => open ? 'none' : '0 0 30px rgba(0, 0, 0, 0.1)'} ;
    background-color:${({ open }) => open ? 'transparent' : 'white'};
    @media (max-width: 576px) {
      box-shadow: none;
      background-color:transparent;
      width: 80%;
      height: ${({ open }) => open ? '80%' : '10px'};
    }
`
export default WrapperMenu