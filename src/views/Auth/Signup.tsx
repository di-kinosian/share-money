import { connect, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { Divider, Icon } from 'semantic-ui-react';
import { externalSignIn } from '../../modules/auth/duck';
import * as s from './styled';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';

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
                const user = userCredential.user;
                console.log(user);
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
                <s.StyledFormInput
                    fluid
                    placeholder="Name"
                    value={name}
                    onChange={onChangeName}
                />
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
                {error && <s.ErrorMessage>{error}</s.ErrorMessage>}
                <s.SumbitButton
                    color="teal"
                    type="submit"
                    disabled={isLoginDisabled}
                >
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
