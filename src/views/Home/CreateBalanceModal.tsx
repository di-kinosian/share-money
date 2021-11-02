import { useState } from 'react';
import * as s from './styled';
import Modal from '../../components/Modal';
import Field from '../../components/Field';
import Button from '../../components/Button';

interface ICreateBalanceModalProps {
    onClose: () => void;
    onCreate: (title: string) => void;
}

function CreateBalanceModal({ onClose, onCreate }: ICreateBalanceModalProps) {
    const [title, setTitle] = useState('');

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    const createNewBalance = () => {
        onCreate(title);
    };

    return (
        <Modal onClose={onClose}>
            <s.ModalContent>
                <s.Header>Create new balance</s.Header>
                <Field label="Title">
                    <s.TitleInput
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={changeTitle}
                    />
                </Field>

                <s.ModalButton>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="primary" onClick={createNewBalance}>
                        Create
                    </Button>
                </s.ModalButton>
            </s.ModalContent>
        </Modal>
    );
}

export default CreateBalanceModal;
