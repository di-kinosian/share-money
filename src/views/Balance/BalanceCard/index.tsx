import { FC } from 'react';
import * as s from './styled';
import { Icon } from 'semantic-ui-react';
import { Icons } from '@makhynenko/ui-components';

interface IProps {
  balance: string;
  title: string;
  openMenu: () => void;
  openBalanceInfo: () => void;
}

const BalanceCard: FC<IProps> = (props) => {
  return (
    <>
      <s.BalanceBlock>
        <s.BalanceRow>
          <s.BalanceInfo>
            <s.BalanceLabel>{props.title}</s.BalanceLabel>
          </s.BalanceInfo>
          <s.IconsContainer>
            <s.IconInfo>
              <Icons
                name="info"
                color="white"
                onClick={props.openBalanceInfo}
              />
            </s.IconInfo>
            <s.IconEllipsis>
              <Icon name="ellipsis vertical" onClick={props.openMenu} />
            </s.IconEllipsis>
          </s.IconsContainer>
        </s.BalanceRow>
        <s.BalanceAmount>{props.balance}</s.BalanceAmount>
      </s.BalanceBlock>
    </>
  );
};

export default BalanceCard;
