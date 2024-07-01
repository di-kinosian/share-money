import { FC, useEffect, useState } from 'react';
import * as s from './styled';
import Modal from '../Modal';
import Button from '../Button';
import { IBalanceDetails } from '../../firebase/types';
import { InputField } from '../InputField';
import { ElementSize, Input } from '@makhynenko/ui-components';
import { CurrencySelector } from '../CurrencySelector';

interface ICreateBalanceModalProps {
  onClose: () => void;
  onSave: (title: string, currencyCode: string) => void;
  isOpen: boolean;
  data?: IBalanceDetails;
}

const CreateBalanceModal: FC<ICreateBalanceModalProps> = ({
  onClose,
  onSave,
  isOpen,
  data,
}) => {
  const [title, setTitle] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  const [titleError, setTitleError] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setCurrencyCode(data.currency);
    }
  }, [data]);

  const changeTitle = (event) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const reset = () => {
    setTitleError('');
    setTitle('');
    setCurrencyCode('');
    setError('');
  };

  const onSubmit = () => {
    if (title && currencyCode) {
      onSave(title, currencyCode);
      reset();
    }
    if (!title) {
      setTitleError('Name is required');
    }
    if (!currencyCode) {
      setError('Currency is required');
    }
  };

  const onCloseModal = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      onClose={onCloseModal}
      isOpen={isOpen}
      header={data ? 'Edit balance' : 'Create new balance'}
    >
      <s.ModalContent>
        <InputField label="Balance name" errorText={titleError}>
          <Input
            placeholder="Enter balance name"
            value={title}
            size={ElementSize.Large}
            onChange={changeTitle}
            invalid={Boolean(titleError)}
          />
        </InputField>
        <InputField label="Currency" errorText={error}>
          <CurrencySelector
            currency={currencyCode}
            error={error}
            onChange={setCurrencyCode}
          />
        </InputField>
        <Button variant="primary" onClick={onSubmit} width="100%">
          {data ? 'Save' : 'Create'}
        </Button>
      </s.ModalContent>
    </Modal>
  );
};

export default CreateBalanceModal;
