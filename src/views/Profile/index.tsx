import { useState } from 'react';
import * as s from './styled';
import { useSelector } from 'react-redux';
import Field from '../../components/Field';

function Profile() {
    const [nameState, setNameState] = useState('');
    const [emailState, setEmailState] = useState('');

    const email = useSelector((state: any) => {
        return state.auth.user.email;
    });
    const name = useSelector((state: any) => {
        return state.auth.user.displayName;
    });

    const saveButtonClick = () => {};

    const handleNameChange = (event) => {
        setNameState(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmailState(event.target.value);
    };

    return (
        <s.ContainerProfile>
            <s.Title>Profile settings</s.Title>
            <Field label="Name">
                <s.ProfileInput
                    type="text"
                    value={name}
                    placeholder="Enter name"
                    onChange={handleNameChange}
                />
            </Field>
            <Field label="Email">
                <s.ProfileInput
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={handleEmailChange}
                />
            </Field>
            <s.SaveButton onClick={saveButtonClick}>Save</s.SaveButton>
        </s.ContainerProfile>
    );
}

export default Profile;
