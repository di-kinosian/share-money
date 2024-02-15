import { FC, useState } from 'react';
import * as s from './styled';
import Modal from '../../components/Modal';
import Field from '../../components/Field';
import Button from '../../components/Button';
import customData from '../../constants/currencies.json';
import { useModalState } from '../../helpers/hooks';
import {
  BodyText,
  BodyTextHighlight,
  HorisontalSeparator,
} from '../../components/styled';

interface ICreateBalanceModalProps {
  onClose: () => void;
  onCreate: (title: string, currencyCode: string) => void;
  isOpen: boolean;
}

const CreateBalanceModal: FC<ICreateBalanceModalProps> = ({
  onClose,
  onCreate,
  isOpen,
}) => {
  const [title, setTitle] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  const [titleError, setTitleError] = useState('');
  const [currencyError, setCurrencyError] = useState('');

  const changeTitle = (event) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const selectCurrency = (code: string) => () => {
    setCurrencyCode(code);
    closeOptions();
  };

  const reset = () => {
    setTitleError('');
    setTitle('');
    setCurrencyCode('');
    setCurrencyError('');
  };

  const createNewBalance = () => {
    if (title && currencyCode) {
      onCreate(title, currencyCode);
      reset();
    }
    if (!title) {
      setTitleError('Name is required');
    }
    if (!currencyCode) {
      setCurrencyError('Currency is required');
    }
  };

  const onCloseModal = () => {
    onClose();
    reset();
  };

  const {
    isOpen: open,
    open: openOptions,
    close: closeOptions,
  } = useModalState();

  return (
    <>
      <Modal onClose={onCloseModal} isOpen={isOpen} header="Create new balance">
        <s.ModalContent>
          <Field label="Balance name" error={titleError}>
            <s.TitleInput
              type="text"
              placeholder="Enter balance name"
              value={title}
              onChange={changeTitle}
              error={Boolean(titleError)}
            />
          </Field>
          <Field label="Currency" error={currencyError}>
            <s.CurrencySelector onClick={openOptions}>
              {currencyCode ? (
                <BodyText>{currencyCode}</BodyText>
              ) : (
                <s.CurrencyPlaceholder>Select currency</s.CurrencyPlaceholder>
              )}
            </s.CurrencySelector>
          </Field>
          <Button variant="primary" onClick={createNewBalance} width="100%">
            Create
          </Button>
        </s.ModalContent>
      </Modal>
      <Modal isOpen={open} onClose={closeOptions} header="Select currency">
        <s.Actions>
          {Object.values(customData).map(({ code, name, symbol }) => (
            <>
              <s.Action key={code} onClick={selectCurrency(code)}>
                <BodyText>{name}</BodyText>
                <BodyTextHighlight>{symbol}</BodyTextHighlight>
              </s.Action>
              <HorisontalSeparator />
            </>
          ))}
        </s.Actions>
      </Modal>
    </>
  );
};

export default CreateBalanceModal;
