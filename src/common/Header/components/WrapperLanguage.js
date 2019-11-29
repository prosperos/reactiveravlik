import styled from "styled-components";

const WrapperLanguage = styled.div`
    left : ${({ open }) => open ? '25px' : '322px'};
        @media (max-width: 576px) {
            left : ${({ open }) => open ? '25px' : '0'};
        }
`
export default WrapperLanguage