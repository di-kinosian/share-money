import '../../App.css';
import { useState } from 'react';
import * as s from './styled';

function Profile() {
    const [nameState, setNameState] = useState('');
    const [emailState, setEmailState] = useState('');

    const saveButtonClick = () => {
    };

    const handleNameChange = (event) => {
        setNameState(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmailState(event.target.value);
    }

    return (
        <s.ContainerProfile>
            <s.Profile>
                Profile settings
                <s.RowName>
                    <s.Text>Name</s.Text>
                    <input
                        type="text"
                        id="input-name"
                        value={nameState}
                        placeholder="Enter name"
                        onChange={handleNameChange}
                    />
                </s.RowName>
                <s.RowEmail>
                    <s.Text>Email</s.Text>
                    <input
                        type="email"
                        id="input-email"
                        value={emailState}
                        placeholder="Enter email"
                        onChange={handleEmailChange}
                    />
                </s.RowEmail>
                <s.SaveButton onClick={saveButtonClick}>
                    Save
                </s.SaveButton>
            </s.Profile>
        </s.ContainerProfile>
    );
}

export default Profile;
