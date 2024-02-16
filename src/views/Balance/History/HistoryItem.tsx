import moment from 'moment';
import { formatToLocalDateString } from '../../../helpers/format';
import MoneyValue from '../../../components/MoneyValue';
import * as s from './styled';
import { FC } from 'react';
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
        <NoteText>Shared transaction</NoteText>
        <s.Date>{formatToLocalDateString(moment(props.date).toDate())}</s.Date>
      </s.HistoryItemRow>
    </s.HistoryItem>
  );
};

export default HistoryItem;
