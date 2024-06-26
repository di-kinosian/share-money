import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Divider, Icon, Message } from 'semantic-ui-react';
import { externalSignIn, login } from '../../modules/auth/duck';
import * as s from './styled';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';
import { ElementSize, Input, InputType } from '@makhynenko/ui-components';

const LoginModal = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
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
    history.push(ROUTES.SIGNUP + history.location.search);
  };

  const onExternalClick = () => {
    dispatch(externalSignIn());
  };

  return (
    <s.ModalContent>
      <s.Header>Welcome!</s.Header>
      <s.SumbitButton color="teal" onClick={onExternalClick}>
        <Icon name="google" /> Continue with Google
      </s.SumbitButton>
      <Divider horizontal>Or</Divider>
      <s.StyledForm error={Boolean(error)} onSubmit={onSubmit}>
        <Input
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
          size={ElementSize.Large}
        />
        <Input
          type={InputType.Password}
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
          size={ElementSize.Large}
        />
        <Message error content={error} />
        <s.SumbitButton color="teal" type="submit" disabled={isLoginDisabled}>
          Login
        </s.SumbitButton>
      </s.StyledForm>
      <s.ActionText onClick={handleSignupClick}>
        Not a member yet? Sign-up
      </s.ActionText>
    </s.ModalContent>
  );
};

const mapState = (state) => ({
  error: state.auth.error,
  loading: state.auth.loading,
});

const connector = connect(mapState);

export default connector(LoginModal);
