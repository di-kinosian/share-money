import * as s from './styled';
import Field from '../../components/Field';
import Button from '../../components/Button';
import { useState } from 'react';
import { useList, useValue } from '../../firebase/hooks';
import { IBalanceDetails, IHistoryItem } from '../../firebase/types';
import { getBalanceDetailsRef, getBalanceHistoryRef } from '../../firebase/refs';

function Admin() {

  const [id, setId] = useState('-NknDyp6rgL-UEGUZLeE')

  const { value: balance } = useValue<IBalanceDetails>(
    getBalanceDetailsRef(id)
  );

  const { list } = useList<IHistoryItem>(
    getBalanceHistoryRef(id)
  );

  const userIds = balance ? Object.keys(balance.users) : []

  console.log({ balance, list });

  const balance1 = list?.reduce((acc, item) => acc + (item.paidUsers[userIds[0]] - item.spentUsers[userIds[0]]), 0)

  console.log(balance1);
  

  return (
    <s.PageContent>
      <s.Input value={id} onChange={(e)=>{ setId(e.target.value)}} />
      
    </s.PageContent>
  );
}

export default Admin;
