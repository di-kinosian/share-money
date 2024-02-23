import { FC, useMemo } from 'react';
import MoneyValue from '../../../components/MoneyValue';
import * as s from './styled';
import { IHistoryItem, IUserProfile } from '../../../firebase/types';
import { BodyTextHighlight, NoteText } from '../../../components/styled';

interface IProps {
  id: string;
  date: string;
  title: string;
  data: IHistoryItem;
  userId: string;
  users: IUserProfile[];
  symbol: string;
  onSelect: (data: IHistoryItem) => void;
}

const HistoryItem: FC<IProps> = (props) => {
  const paidUser = useMemo(() => {
    return props.users?.find((u) =>
      props.data?.paidUsers[u.id] === Number(props.data.amount) ? u : null
    );
  }, [props.data.amount, props.data.paidUsers, props.users]);

  const showHistoryInfo = () => {
    props.onSelect(props.data);
  };

  const total =
    props.data.paidUsers[props.userId] - props.data.spentUsers[props.userId];

  return (
    <s.HistoryItem onClick={showHistoryInfo}>
      <s.HistoryItemRow>
        <BodyTextHighlight>{props.title}</BodyTextHighlight>
        <MoneyValue value={total} symbol={props.symbol} />
      </s.HistoryItemRow>
      <s.HistoryItemRow>
        <NoteText>
          {paidUser ? paidUser.displayName || paidUser.email : 'Shared payment'}
        </NoteText>
        <NoteText>{props.data.amount}</NoteText>
      </s.HistoryItemRow>
    </s.HistoryItem>
  );
};

export default HistoryItem;
