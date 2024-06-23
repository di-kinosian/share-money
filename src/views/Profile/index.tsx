import { useState } from 'react';
import * as s from './styled';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import { InputField } from '../../components/InputField';
import { ElementSize, Input } from '@makhynenko/ui-components';

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
      <InputField label="Name">
        <Input
          size={ElementSize.Large}
          value={nameState}
          placeholder="Enter name"
          onChange={handleNameChange}
        />
      </InputField>
      <InputField label="Email">
        <Input
          size={ElementSize.Large}
          value={emailState}
          placeholder="Enter email"
          onChange={handleEmailChange}
        />
      </InputField>
      <s.ButtonsContainer>
        <Button
          variant="primary"
          onClick={saveButtonClick}
          disabled={!(isEdit && nameState && emailState)}
          width="80px"
        >
          Save
        </Button>
      </s.ButtonsContainer>
    </s.ContainerProfile>
  );
}

export default Profile;
