import { useState } from 'react';
import * as s from './styled';
import { useSelector } from 'react-redux';
import Field from '../../components/Field';
import Button from '../../components/Button';

function Profile() {
    const email = useSelector((state: any) => {
        return state.auth.user.email;
    });
    const name = useSelector((state: any) => {
        return state.auth.user.displayName;
    });

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [nameState, setNameState] = useState(name);
    const [emailState, setEmailState] = useState(email);

    const saveButtonClick = () => {
        setIsEdit(false);
    };

    const handleNameChange = (event) => {
        setIsEdit(true);
        setNameState(event.target.value);
    };

    const handleEmailChange = (event) => {
        setIsEdit(true);
        setEmailState(event.target.value);
    };

    return (
        <s.ContainerProfile>
            <s.Title>Profile settings</s.Title>
            <Field label="Name">
                <s.ProfileInput
                    type="text"
                    value={nameState}
                    placeholder="Enter name"
                    onChange={handleNameChange}
                />
            </Field>
            <Field label="Email">
                <s.ProfileInput
                    type="email"
                    value={emailState}
                    placeholder="Enter email"
                    onChange={handleEmailChange}
                />
            </Field>
            <s.ButtonsContainer>
                <Button
                    variant="primary"
                    onClick={saveButtonClick}
                    disabled={!(isEdit && nameState && emailState)}
                    width={80}
                >
                    Save
                </Button>
            </s.ButtonsContainer>
        </s.ContainerProfile>
    );
}

export default Profile;
