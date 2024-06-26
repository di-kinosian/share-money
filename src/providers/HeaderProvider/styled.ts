import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

export const Header = styled.header`
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 64px;
    font-weight: 700;
    font-size: 20px;
    text-transform: uppercase;
    flex-shrink: 0;
    background-color: #fff;
    border-bottom: 1px solid #d8d8d8;
`;

export const PageWrapper = styled.main`
    display: flex;
    flex-direction: column;
    padding-top: 64px;
    max-width: 450px;
    margin: 0 auto;
`;

export const LogoIcon = styled.img`
    width: 32px;
    height: 32px;
`;

export const BurgerIcon = styled.img`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 20px;
    right: 16px;
    cursor: pointer;
`;

export const Logo = styled(Link)`
    position: absolute;
    top: 16px;
    left: 16px;
`;

export const Menu = styled.div`
    width: 100%;
    height: 100%;
    background: rgb(255, 255, 255);
    box-shadow: 0 20px rgba(34, 36, 38, 0.15);
    padding-top: 63px;
    display: flex;
    flex-direction: column;
`;

export const CloseMenuIcon = styled.img`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
    height: 24px;
    cursor: pointer;
`;

export const MenuRow = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    /* border-top: 1px solid #d8d8d8; */
`;

export const MenuIcon = styled(Icon)`
    &.icon {
        font-size: 25px;
        line-height: 25px;
        padding-left: 9px;
    }
`;

export const MenuText = styled.div`
    font-size: 16px;
    color: black;
    font-weight: 500;
    padding-left: 10px;
`;
