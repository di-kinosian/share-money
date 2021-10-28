import closeIcon from '../../assets/img/close-icon.svg';
import logo from '../../assets/img/logo.png';
import '../../App.css';
import { useState } from 'react';

import burgerIcon from '../../assets/img/burger-icon.svg';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../modules/auth/duck';
import Sidebar from '../../components/Sidebar';
import * as s from './styled';
import { useAuth } from '../../firebase/auth';

function HeaderProvider(props) {
    useAuth()
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
                <Link to="/" className="logo">
                    <img alt="" src={logo} className="logo-icon" />
                </Link>
                Share money
                <img
                    src={burgerIcon}
                    className="burger-icon"
                    onClick={openMenu}
                    alt=""
                />
            </s.Header>
            <Sidebar
                isOpen={isMenuVisible}
                onClose={() => {
                    setIsMenuVisible(false);
                }}
                width="260px"
            >
                <div className="menu">
                    <img
                        src={closeIcon}
                        className="close-menu-icon"
                        onClick={closeMenu}
                        alt=""
                    />
                    <div className="menu-row">
                        <Icon name="user circle" className="menu-icon" />
                        <div className="menu-text" onClick={onProfileClick}>
                            <Link to="/profile">Profile</Link>
                        </div>
                    </div>
                    <div className="menu-row">
                        <Icon name="log out" className="menu-icon"></Icon>
                        <div className="menu-text" onClick={onLogoutClick}>
                            Log out
                        </div>
                    </div>
                </div>
            </Sidebar>
            <s.PageWrapper>{props.children}</s.PageWrapper>
        </>
    );
}

export default HeaderProvider;
