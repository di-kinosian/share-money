import { BodyText, BodyTextHighlight, HorisontalSeparator } from '../styled';
import currencies from '../../constants/currencies.json';
import * as s from './styled';
import Modal from '../Modal';
import { useModalState } from '../../helpers/hooks';
import { ReactNode } from 'react';

type CurrencySelectorProps = {
  currency?: string;
  onChange: (currency: string) => void;
  renderControl?: (currency?: string) => ReactNode
}

export const CurrencySelector = ({ currency, onChange, renderControl }: CurrencySelectorProps) => {
  const { close, open, isOpen } = useModalState()
  const handleSelectCurrency = (code: string) => {
    onChange(code)
    close();
  }

  const renderDefaultControl = () => {
    return <s.CurrencySelector>
      {currency ? (
        <s.SelectorValue>
          <BodyText>{currencies[currency]?.name}</BodyText>
          <BodyTextHighlight>
            {currencies[currency]?.symbol}
          </BodyTextHighlight>
        </s.SelectorValue>
      ) : (
        <s.CurrencyPlaceholder>Select currency</s.CurrencyPlaceholder>
      )}
    </s.CurrencySelector>
  }

  return (
    <>
      <div onClick={open}>
        {
          typeof renderControl === 'function' ? renderControl(currency) : renderDefaultControl()
        }
      </div>
      <Modal
        isOpen={isOpen}
        onClose={close}
        header="Select currency"
      >
        <s.Actions>
          {Object.values(currencies).map(({ code, name, symbol }) => (
            <s.ActionWrapper key={code}>
              <s.Action onClick={() => handleSelectCurrency(code)}>
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
