import { formatMoney, getConnatationForNumber } from '../../helpers/format';
import * as s from './styled';

interface IProps {
    value: number | string | null; 
}

function MoneyValue(props: IProps) {
	return (
		<s.BalanceAmount
			className={`${getConnatationForNumber(props.value)}`}
		>
			{formatMoney(props.value)}
		</s.BalanceAmount>
	);
}

export default MoneyValue;
