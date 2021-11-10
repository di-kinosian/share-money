import { FC } from 'react';
import { formatDate, getConnatationForNumber } from '../../../helpers/format';
import * as s from './styled';

interface IProps {
    balance: string;
    onAddClick: () => void;
}

const BalanceCard: FC<IProps> = (props) => {
    return (
        <s.BalanceBlock>
            <s.BalanceRow>
                <s.BalanceInfo>
                    <s.BalanceLabel>Balance</s.BalanceLabel>
                    <s.BalanceDate>{formatDate(new Date())}</s.BalanceDate>
                </s.BalanceInfo>
                <s.AddButton onClick={props.onAddClick}>+ Add</s.AddButton>
            </s.BalanceRow>
            <s.BalanceAmount
                className={`${getConnatationForNumber(props.balance)}`}
            >
                {props.balance}
            </s.BalanceAmount>
        </s.BalanceBlock>
    );
};

export default BalanceCard;
