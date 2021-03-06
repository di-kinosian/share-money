import arrowIcon from '../../../assets/img/arrow-icon.svg';
import { useState, useMemo } from 'react';
import HistoryItem from './HistoryItem';
import { Loader } from 'semantic-ui-react';
import { useList } from '../../../firebase/hooks';
import { getBalanceHistoryRef } from '../../../firebase/refs';
import { IHistoryItem, IUserProfile } from '../../../firebase/types';
import * as s from './styled';

interface IProps {
    balanceId: string;
    userId: string;
    users: IUserProfile[];
}

function History(props: IProps) {
    const { list, loading } = useList<IHistoryItem>(
        getBalanceHistoryRef(props.balanceId)
    );

    const [isHistoryVisible, setIsHistoryVisible] = useState(true);

    const toggleHistory = () => {
        setIsHistoryVisible(!isHistoryVisible);
    };

    const sorted = useMemo<IHistoryItem[]>(
        () =>
            list
                ? list.sort(
                      (a, b) =>
                          new Date(b.date).valueOf() -
                          new Date(a.date).valueOf()
                  )
                : [],
        [list]
    );

    return (
        <s.HistoryContainer>
            <s.HistoryHeader>
                <s.ArowIcon
                    alt=""
                    src={arrowIcon}
                    onClick={toggleHistory}
                    style={{
                        transform: isHistoryVisible
                            ? 'rotate(-90deg)'
                            : 'rotate(180deg)',
                    }}
                />
                <s.HistoryTitle>History</s.HistoryTitle>
            </s.HistoryHeader>
            {isHistoryVisible && (
                <s.HistoryContent>
                    {loading ? (
                        <Loader active />
                    ) : (
                        sorted.map((historyItem: IHistoryItem) => {
                            return (
                                <HistoryItem
                                    id={historyItem.id}
                                    title={historyItem.title}
                                    date={historyItem.date}
                                    key={historyItem.id}
                                    data={historyItem}
                                    users={props.users}
                                    userId={props.userId}
                                />
                            );
                        })
                    )}
                </s.HistoryContent>
            )}
        </s.HistoryContainer>
    );
}

export default History;
