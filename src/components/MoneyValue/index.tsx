import { formatMoney, getConnatationForNumber } from '../../helpers/format';
import cx from 'classnames';
import * as s from './styled';

interface IProps {
  value: number | string | null;
  symbol?: string;
  className?: string;
}

function MoneyValue({ value, symbol, className }: IProps) {
  return (
    <s.BalanceAmount className={cx(getConnatationForNumber(value), className)}>
      {formatMoney(value, symbol)}
    </s.BalanceAmount>
  );
}

export default MoneyValue;
