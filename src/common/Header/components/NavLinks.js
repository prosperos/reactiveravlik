import styled from "styled-components";

const NavLinks = styled.div`
    position: absolute;
    bottom: 5px;
    left:${({ open }) => open ? '25px' : ' 25%'} ;
    width:  ${({ open }) => open ? '65px' : ' 65px'};
    @media (max-width: 576px) {
       width:  ${({ open }) => open ? '300px' : ' 0'};
       display : ${({ open }) => open ? 'block' : 'none'};
    }
`
export default NavLinks