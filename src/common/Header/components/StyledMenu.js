import styled from "styled-components";

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
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
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
        font-family: "Playfair Display";
        margin-bottom:20px;
        @media (max-width: 576px) {
          font-size: 1.5rem;
          text-align: center;
        }
    
        &:hover {
          color: #343078;
        }
      }
    `

export default StyledMenu