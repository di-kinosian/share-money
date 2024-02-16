import { FC, useEffect, useState } from 'react';
import * as s from './styled';
import Modal from '../Modal';
import Field from '../Field';
import Button from '../Button';
import currencies from '../../constants/currencies.json';
import { useModalState } from '../../helpers/hooks';
import {
  BodyText,
  BodyTextHighlight,
  HorisontalSeparator,
} from '../styled';
import { IBalanceDetails } from '../../firebase/types';

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
  const [currencyError, setCurrencyError] = useState('');

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

  const onSubmit = () => {
    if (title && currencyCode) {
      onSave(title, currencyCode);
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
      <Modal
        onClose={onCloseModal}
        isOpen={isOpen}
        header={data ? 'Edit balance' : 'Create new balance'}
      >
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
                <s.SelectorValue>
                  <BodyText>{currencies[currencyCode].name}</BodyText>
                  <BodyText>{currencies[currencyCode].symbol}</BodyText>
                </s.SelectorValue>
              ) : (
                <s.CurrencyPlaceholder>Select currency</s.CurrencyPlaceholder>
              )}
            </s.CurrencySelector>
          </Field>
          <Button variant="primary" onClick={onSubmit} width="100%">
            {data ? 'Save' : 'Create'}
          </Button>
        </s.ModalContent>
      </Modal>
      <Modal isOpen={open} onClose={closeOptions} header="Select currency">
        <s.Actions>
          {Object.values(currencies).map(({ code, name, symbol }) => (
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
