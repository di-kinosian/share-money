import closeIcon from '../../assets/img/close-icon.svg';
import logo from '../../assets/img/logo.png';
import '../../App.css';
import { useMemo, useState } from 'react';

import burgerIcon from '../../assets/img/burger-icon.svg';
import { Icon, Sidebar } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import history from '../../config/history';
import AuthModals from '../../components/AuthModals';
import { getUser } from '../../modules/auth/duck';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBalances } from '../../modules/core/duck';

function HeaderProvider(props) {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    useMemo(() => {
        if (user) {
            dispatch(fetchBalances());
        }
    }, [dispatch, user]);

    const openMenu = () => {
        setIsMenuVisible(true);
    };

    const closeMenu = () => {
        setIsMenuVisible(false);
    };

    const onProfileClick = () => {
        closeMenu();
    };

    return (
        <Sidebar.Pushable>
            <AuthModals />
            <Sidebar
                animation="overlay"
                icon="labeled"
                inverted
                onHide={() => setIsMenuVisible(false)}
                vertical
                visible={isMenuVisible}
                width="wide"
                direction="right"
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
                        <div className="menu-text">Log out</div>
                    </div>
                </div>
            </Sidebar>
            <Sidebar.Pusher dimmed={isMenuVisible}>
                <div className="header">
                    <Link to="/" className="logo">
                        <img alt="" src={logo} className="logo-icon" />
                    </Link>
                    Share money{' '}
                    {/* <button
                    onClick={() => {
                        dispatch(toggleLoginModal(true));
                    }}
                /> */}
                    <img
                        src={burgerIcon}
                        className="burger-icon"
                        onClick={openMenu}
                        alt=""
                    />
                </div>
                {props.children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
}

export default HeaderProvider;
