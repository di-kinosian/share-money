import styled from 'styled-components';

export const Header = styled.header`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    font-weight: 700;
    font-size: 20px;
    text-transform: uppercase;
    flex-shrink: 0;
    background-color: #fff;
    box-shadow: 0px 3px 5px rgba(34, 60, 80, 0.2);
`;

export const PageWrapper = styled.main`
    display: flex;
    flex-direction: column;
    padding-top: 50px;
`;
