import { FC } from 'react';
import * as s from './styled';
import { Icon } from 'semantic-ui-react';

interface IProps {
  balance: string;
  title: string;
  openMenu: () => void;
}

const BalanceCard: FC<IProps> = (props) => {
  return (
    <s.BalanceBlock>
      <s.BalanceRow>
        <s.BalanceInfo>
          <s.BalanceLabel>{props.title}</s.BalanceLabel>
        </s.BalanceInfo>
        <Icon name="ellipsis vertical" onClick={props.openMenu} />
      </s.BalanceRow>
      <s.BalanceAmount>{props.balance}</s.BalanceAmount>
    </s.BalanceBlock>
  );
};

export default BalanceCard;
