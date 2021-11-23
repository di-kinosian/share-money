import { FC } from 'react';
import closeIcon from '../../assets/img/close-icon.svg';
import logo from '../../assets/img/logo.png';
import { useState } from 'react';
import burgerIcon from '../../assets/img/burger-icon.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../modules/auth/duck';
import Sidebar from '../../components/Sidebar';
import * as s from './styled';
import { useAuth } from '../../firebase/auth';

const HeaderProvider: FC = (props) => {
    useAuth();
    
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const dispatch = useDispatch();

    const openMenu = () => {
        setIsMenuVisible(true);
    };

    const closeMenu = () => {
        setIsMenuVisible(false);
    };

    const onProfileClick = () => {
        closeMenu();
    };

    const onLogoutClick = () => {
        dispatch(logout());
        closeMenu();
    };

    return (
        <>
            <s.Header>
                <s.Logo to="/">
                    <s.LogoIcon src={logo} />
                </s.Logo>
                Share money
                <s.BurgerIcon src={burgerIcon} onClick={openMenu} alt="" />
            </s.Header>
            <Sidebar
                isOpen={isMenuVisible}
                onClose={() => {
                    setIsMenuVisible(false);
                }}
                width="260px"
            >
                <s.Menu>
                    <s.CloseMenuIcon
                        src={closeIcon}
                        onClick={closeMenu}
                        alt=""
                    />
                    <s.MenuRow>
                        <s.MenuIcon name="user circle" />
                        <s.MenuText onClick={onProfileClick}>
                            <Link to="/profile">Profile</Link>
                        </s.MenuText>
                    </s.MenuRow>
                    <s.MenuRow>
                        <s.MenuIcon name="log out"></s.MenuIcon>
                        <s.MenuText onClick={onLogoutClick}>Log out</s.MenuText>
                    </s.MenuRow>
                </s.Menu>
            </Sidebar>
            <s.PageWrapper>{props.children}</s.PageWrapper>
        </>
    );
}

export default HeaderProvider;
