import closeIcon from "../../assets/img/close-icon.svg";
import logo from "../../assets/img/logo.png";
import "../../App.css";
import { useState } from "react";

import burgerIcon from "../../assets/img/burger-icon.svg";
import { Sidebar } from "semantic-ui-react";

function HeaderProvider(props) {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const openMenu = () => {
        setIsMenuVisible(true);
    };

    const closeMenu = () => {
        setIsMenuVisible(false);
    };

    return (
        <Sidebar.Pushable>
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
                </div>
            </Sidebar>
            <Sidebar.Pusher dimmed={isMenuVisible}>
                <img alt="" src={logo} className="logo-icon"  />
                <div className="header">
                    Share money{" "}
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
