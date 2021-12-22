import { FC } from 'react';
import { getConnatationForNumber } from '../../../helpers/format';
import * as s from './styled';
import { Icon } from 'semantic-ui-react';

interface IProps {
    balance: string;
}

const BalanceCard: FC<IProps> = (props) => {
    return (
        <s.BalanceBlock>
            <s.BalanceRow>
                <s.BalanceInfo>
                    <s.BalanceLabel>Balance name</s.BalanceLabel>
                </s.BalanceInfo>
                <Icon name="ellipsis vertical" />
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
