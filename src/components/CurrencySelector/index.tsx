import { BodyText, BodyTextHighlight } from '../styled';
import currencies from '../../constants/currencies.json';
import * as s from './styled';

type CurrencySelectorProps = {
  openCurrencySelector: () => void;
  currency?: string;
}

export const CurrencySelector = ({openCurrencySelector, currency}: CurrencySelectorProps) => {
  return (
    <s.CurrencySelector onClick={openCurrencySelector}>
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
