import { FC, useState } from 'react';
import * as s from './styled';
import Modal from '../../components/Modal';
import Field from '../../components/Field';
import Button from '../../components/Button';

interface ICreateBalanceModalProps {
  onClose: () => void;
  onCreate: (title: string) => void;
  isOpen: boolean
}

const CreateBalanceModal: FC<ICreateBalanceModalProps> = ({ onClose, onCreate, isOpen })=> {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('')

  const changeTitle = (event) => {
    setTitle(event.target.value);
    setTitleError('')
  };

  const reset = () => {
    setTitleError('')
    setTitle('');
  }

  const createNewBalance = () => {
    if (title) {
      onCreate(title);
      reset()
    setTitle('');
    } else {
      setTitleError('Name is required')
    }
  };

  const onCloseModal = () => {
    onClose()
    reset()
  }

  return (
    <Modal onClose={onCloseModal} isOpen={isOpen} header="Create new balance">
      <s.ModalContent>
        <Field label='Balance name' error={titleError}>
          <s.TitleInput
            type="text"
            placeholder="Enter balance name"
            value={title}
            onChange={changeTitle}
            error={Boolean(titleError)}
          />
        </Field>
        <Button variant="primary" onClick={createNewBalance} width="100%">
          Create
        </Button>
      </s.ModalContent>
    </Modal>
  );
}

export default CreateBalanceModal;
