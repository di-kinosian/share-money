import { BodyText, BodyTextHighlight, HorisontalSeparator } from '../styled';
import currencies from '../../constants/currencies.json';
import * as s from './styled';
import Modal from '../Modal';
import { useModalState } from '../../helpers/hooks';
import { ReactNode, useMemo, useState } from 'react';
import { SearchInput } from '../SearchInput';
import { Currencies } from '../../firebase/types';

type CurrencySelectorProps = {
  currency?: string;
  currencyError?: string;
  onChange: (currency: string) => void;
  renderControl?: (currency?: string) => ReactNode;
};

export const CurrencySelector = ({
  currency,
  currencyError,
  onChange,
  renderControl,
}: CurrencySelectorProps) => {
  const { close, open, isOpen } = useModalState();
  const handleSelectCurrency = (code: string) => {
    onChange(code);
    close();
  };

  const [searchValue, setSearchValue] = useState<string>('');

  const renderDefaultControl = () => {
    return (
      <s.CurrencySelector invalid={Boolean(currencyError)}>
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
    );
  };

  const filteredList = useMemo(
    () =>
      searchValue
        ? Object.values(currencies).filter(
            (curr) =>
              curr.code.toUpperCase().includes(searchValue.toUpperCase()) ||
              curr.name.toUpperCase().includes(searchValue.toUpperCase())
          )
        : Object.values(currencies),
    [searchValue]
  );

  const renderCurrenciesList = (list: Currencies | {}) => {
    return (
      <>
        {Object.values(list).map(({ code, name, symbol }) => (
          <s.ActionWrapper key={code}>
            <s.Action onClick={() => handleSelectCurrency(code)}>
              <BodyText>{name}</BodyText>
              <BodyTextHighlight>{symbol}</BodyTextHighlight>
            </s.Action>
            <HorisontalSeparator />
          </s.ActionWrapper>
        ))}
      </>
    );
  };

  return (
    <>
      <div onClick={open}>
        {typeof renderControl === 'function'
          ? renderControl(currency)
          : renderDefaultControl()}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={close}
        header="Select currency"
        searchInput={
          <SearchInput
            isTop={true}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          />
        }
      >
        <s.Actions>
          {renderCurrenciesList(filteredList)}
        </s.Actions>
      </Modal>
    </>
  );
};
