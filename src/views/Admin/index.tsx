import * as s from './styled';
import { useMemo, useRef, useState } from 'react';
import { useList, useValue } from '../../firebase/hooks';
import { IBalanceDetails, IHistoryItem } from '../../firebase/types';
import { getBalanceDetailsRef, getBalanceHistoryRef } from '../../firebase/refs';
import { Flex, H5 } from '../../components/styled';
import { Button, Input } from '@makhynenko/ui-components';
import { remove, set } from 'firebase/database';

function Admin() {

  const [id, setId] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)

  const balanceDetailsRef = useMemo(() => getBalanceDetailsRef(id), [id])
  const balanceHistoryRef = useMemo(() => getBalanceHistoryRef(id), [id])

  const { value: balance } = useValue<IBalanceDetails>(balanceDetailsRef);
  const { list } = useList<IHistoryItem>(balanceHistoryRef);

  const userIds = balance ? Object.keys(balance.users) : []

  console.log({ balance, list });

  const balance1 = list?.reduce((acc, item) => acc + (item.paidUsers[userIds[0]] - item.spentUsers[userIds[0]]), 0)

  console.log(balance1);

  const onSearch = () => {
    setId(searchRef.current.value)
  }

  const onClearHistory = () => {
    set(balanceDetailsRef, {
      ...balance,
      users: Object.keys(balance.users).reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {})
    })
    remove(balanceHistoryRef)
  }

  return (
    <s.PageContent>
      <Flex gap="4px">
        <Input ref={searchRef} />
        <Button onClick={onSearch}>Search</Button>
      </Flex>

      {balance ? <Flex direction='column' gap="8px">
        <H5>Balance Title</H5>
        <div>{balance.title}</div>
        <H5>Users</H5>
        {Object.keys(balance.users).map((id) => <Flex key={id} justify='space-between'><span>{id}</span><span>{balance.users[id]}</span></Flex>)}
        <H5>History</H5>
        {list?.map((item) => <Flex key={item.id} justify='space-between'><span>{item.title}</span><span>{item.amount}</span></Flex>)}

        <Button onClick={onClearHistory}>Clear History</Button>
      </Flex> : 'no balance'}



    </s.PageContent>
  );
}

export default Admin;
