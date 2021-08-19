import { connect, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react';
import { signup, toggleLoginModal, toggleSignupModal } from '../../modules/auth/duck';
import Modal from '../../components/Modal';
import * as s from './styled';

const SignupModal = (props) => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signup());
  };

  const handleLoginClick = () => {
    dispatch(toggleLoginModal(true));
  };

  const onClose = () => {
    dispatch(toggleSignupModal(false));
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
            Sign up
          </s.SumbitButton>
        </s.StyledForm>
        <s.ActionText onClick={handleLoginClick}>
          Already a member? Log in
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

export default connector(SignupModal);
