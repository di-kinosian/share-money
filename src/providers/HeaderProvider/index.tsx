import { FC } from 'react';
import closeIcon from '../../assets/img/close-icon.svg';
import logo from '../../assets/img/logo.png';
import burgerIcon from '../../assets/img/burger-icon.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../modules/auth/duck';
import Sidebar from '../../components/Sidebar';
import * as s from './styled';
import { useAuth } from '../../firebase/auth';
import { useModalState } from '../../helpers/hooks';
import { HorisontalSeparator } from '../../components/styled';

const HeaderProvider: FC = (props) => {
  useAuth();
  const { isOpen, open, close } = useModalState()
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    close();
  };

  return (
    <>
      <s.Header>
        <s.Logo to="/">
          <s.LogoIcon src={logo} />
        </s.Logo>
        Share money
        <s.BurgerIcon src={burgerIcon} onClick={open} alt="" />
      </s.Header>
      <Sidebar
        isOpen={isOpen}
        onClose={close}
        width="260px"
      >
        <s.Menu>
          <s.CloseMenuIcon
            src={closeIcon}
            onClick={close}
            alt=""
          />
          <HorisontalSeparator />
          <s.MenuRow>
            <s.MenuIcon name="user circle" />
            <s.MenuText onClick={close}>
              <Link to="/profile">Profile</Link>
            </s.MenuText>
          </s.MenuRow>
          <s.MenuRow>
            <s.MenuIcon name="dollar" />
            <s.MenuText onClick={close}>
              <Link to="/capital">My Capital</Link>
            </s.MenuText>
          </s.MenuRow>
          <HorisontalSeparator style={{
            marginTop: 'auto'
          }} />
          <s.MenuRow>
            <s.MenuIcon name="log out" />
            <s.MenuText onClick={onLogoutClick}>Log out</s.MenuText>
          </s.MenuRow>
        </s.Menu>
      </Sidebar>
      <s.PageWrapper>{props.children}</s.PageWrapper>
    </>
  );
}

export default HeaderProvider;
