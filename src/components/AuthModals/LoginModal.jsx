import { connect, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react';
import { login, toggleLoginModal, toggleSignupModal } from '../../modules/auth/duck';
import Modal from '../../components/Modal';
import * as s from './styled';

const LoginModal = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (props.error) {
      setError(props.error.message);
    }
  }, [props.error]);

  const onChangeEmail = (e) => {
    setEmail(e.currentTarget.value);
    setError(undefined);
  };

  const onChangePassword = (e) => {
    setPassword(e.currentTarget.value);
    setError(undefined);
  };

  const isLoginDisabled = !!(error || !email || !password);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleSignupClick = () => {
    dispatch(toggleSignupModal(true));
  };

  const onClose = () => {
    dispatch(toggleLoginModal(false));
  };

  return (
    <Modal onClose={onClose}>
      <s.ModalContent>
        <s.Header>Welcome!</s.Header>
        <s.StyledForm error={!!error} onSubmit={onSubmit}>
          <s.StyledFormInput
            fluid
            placeholder="Email"
            value={email}
            onChange={onChangeEmail}
          />
          <s.StyledFormInput
            fluid
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
          <Message error content={error} />
          <s.SumbitButton color="teal" type="submit" disabled={isLoginDisabled}>
            Login
          </s.SumbitButton>
        </s.StyledForm>
        <s.ActionText onClick={handleSignupClick}>
          Not on Mapster yet? Sign-up
        </s.ActionText>
      </s.ModalContent>
    </Modal>
  );
};

const mapState = (state) => ({
  error: state.auth.error,
  loading: state.auth.loading,
});

const connector = connect(mapState);

export default connector(LoginModal);
