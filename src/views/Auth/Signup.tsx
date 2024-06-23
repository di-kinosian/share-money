import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { Divider, Icon } from 'semantic-ui-react';
import { externalSignIn } from '../../modules/auth/duck';
import * as s from './styled';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';
import { Input, InputType } from '@makhynenko/ui-components';

const errorMessageMap = {
  'auth/weak-password': 'The password is weak',
  'auth/invalid-email': 'Email is invalid',
};

const Signup = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
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

  const onChangeName = (e) => {
    setName(e.currentTarget.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.currentTarget.value);
    setError(undefined);
  };

  const onExternalClick = () => {
    dispatch(externalSignIn());
  };

  const isLoginDisabled = !!(error || !email || !password);

  const onSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorMessageMap[errorCode] || errorCode);
      });
  };

  const handleLoginClick = () => {
    history.push(ROUTES.LOGIN + history.location.search);
  };

  return (
    <s.ModalContent>
      <s.Header>Welcome!</s.Header>
      <s.SumbitButton color="teal" onClick={onExternalClick}>
        <Icon name="google" /> Sign up with Google
      </s.SumbitButton>
      <Divider horizontal>Or</Divider>
      <s.StyledForm error={!!error} onSubmit={onSubmit}>
        <Input placeholder="Name" value={name} onChange={onChangeName} />
        <Input placeholder="Email" value={email} onChange={onChangeEmail} />
        <Input
          type={InputType.Password}
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
        />
        {error && <s.ErrorMessage>{error}</s.ErrorMessage>}
        <s.SumbitButton color="teal" type="submit" disabled={isLoginDisabled}>
          Sign up
        </s.SumbitButton>
      </s.StyledForm>

      <s.ActionText onClick={handleLoginClick}>
        Already a member? Log in
      </s.ActionText>
    </s.ModalContent>
  );
};

const mapState = (state) => ({
  error: state.auth.error,
  loading: state.auth.loading,
});

const connector = connect(mapState);

export default connector(Signup);
