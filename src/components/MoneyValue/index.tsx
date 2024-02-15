import { getConnatationForNumber } from '../../helpers/format';
import cx from 'classnames';
import * as s from './styled';
import currency from 'currency.js';

interface IProps {
  value: number | string | null;
  symbol?: string;
  className?: string;
}

function MoneyValue({ value, symbol, className }: IProps) {
  return (
    <s.BalanceAmount className={cx(getConnatationForNumber(value), className)}>
      {currency(value, {
        symbol: symbol || '',
        separator: ' ',
        precision: 2,
        pattern: '#!',
      }).format()}
    </s.BalanceAmount>
  );
}

export default MoneyValue;
