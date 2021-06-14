import '../../App.css';
import { useState } from 'react';

function Profile() {
    const [nameState, setNameState] = useState('');
    const [emailState, setEmailState] = useState('');

    const saveButtonClick = () => {
        console.log('here');
    };

    const handleNameChange = (event) => {
        setNameState(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmailState(event.target.value);
    }

    return (
        <div className="container-profile">
            <div className="profile">
                Profile settings
                <div className="row-name">
                    <div className="text">Name</div>
                    <input
                        type="text"
                        id="input-name"
                        value={nameState}
                        placeholder="Enter name"
                        onChange={handleNameChange}
                    />
                </div>
                <div className="row-email">
                    <div className="text">Email</div>
                    <input
                        type="email"
                        id="input-email"
                        value={emailState}
                        placeholder="Enter email"
                        onChange={handleEmailChange}
                    />
                </div>
                <button className="save-button" onClick={saveButtonClick}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default Profile;
