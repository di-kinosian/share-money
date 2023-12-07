import { formatMoney, getConnatationForNumber } from '../../helpers/format';
import cx from 'classnames'
import * as s from './styled';

interface IProps {
	value: number | string | null;
	className?: string;
}

function MoneyValue(props: IProps) {
	return (
		<s.BalanceAmount
			className={cx(getConnatationForNumber(props.value), props.className)}
		>
			{formatMoney(props.value)}
		</s.BalanceAmount>
	);
}

export default MoneyValue;
