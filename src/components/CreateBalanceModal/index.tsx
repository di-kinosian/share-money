import { FC, useEffect, useState } from 'react';
import * as s from './styled';
import Modal from '../Modal';
import Button from '../Button';
import currencies from '../../constants/currencies.json';
import { useModalState } from '../../helpers/hooks';
import { BodyText, BodyTextHighlight, HorisontalSeparator } from '../styled';
import { IBalanceDetails } from '../../firebase/types';
import { InputField } from '../InputField';
import { ElementSize, Input } from '@makhynenko/ui-components';

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
          <InputField label="Balance name" errorText={titleError}>
            <Input
              placeholder="Enter balance name"
              value={title}
              size={ElementSize.Large}
              onChange={changeTitle}
              invalid={Boolean(titleError)}
            />
          </InputField>
          <InputField label="Currency" errorText={currencyError}>
            <s.CurrencySelector onClick={openOptions} invalid={Boolean(currencyError)}>
              {currencyCode ? (
                <s.SelectorValue>
                  <BodyText>{currencies[currencyCode].name}</BodyText>
                  <BodyTextHighlight>
                    {currencies[currencyCode].symbol}
                  </BodyTextHighlight>
                </s.SelectorValue>
              ) : (
                <s.CurrencyPlaceholder>Select currency</s.CurrencyPlaceholder>
              )}
            </s.CurrencySelector>
          </InputField>
          <Button variant="primary" onClick={onSubmit} width="100%">
            {data ? 'Save' : 'Create'}
          </Button>
        </s.ModalContent>
      </Modal>
      <Modal isOpen={open} onClose={closeOptions} header="Select currency">
        <s.Actions>
          {Object.values(currencies).map(({ code, name, symbol }) => (
            <s.ActionWrapper key={code}>
              <s.Action onClick={selectCurrency(code)}>
                <BodyText>{name}</BodyText>
                <BodyTextHighlight>{symbol}</BodyTextHighlight>
              </s.Action>
              <HorisontalSeparator />
            </s.ActionWrapper>
          ))}
        </s.Actions>
      </Modal>
    </>
  );
};

export default CreateBalanceModal;
