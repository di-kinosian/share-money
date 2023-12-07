import { useState } from 'react';

import { ITransaction } from '../types';
import * as s from './styled';
import * as so from './styled-old';
import dayjs from 'dayjs';
import Field from '../../../components/Field';
import { formatMoney } from '../../../helpers/format';
import DatePicker from '../../../components/DatePicker';
import { BodyText, Flex } from '../../../components/styled';
import Dropdown from '../../../components/Dropdown';
import { useModalState } from '../../../helpers/hooks';
import { Map } from '../../../firebase/types';
import Button from '../../../components/Button';
import { getAmountError } from './helpers';
import { IUser } from './types';

interface IUsersInputGroupProps {
  users: IUser[];
  onChange: (data: Map<string>) => void
  value: Map<string>
}

const UsersInputGroup = ({ users, value, onChange }: IUsersInputGroupProps) => {
  const onFocusMoneyInput = (e) => {
    e.target.select();
  };

  const onBlur = (event) => {
    let userId = event.target.dataset.id;
    onChange({
      ...value,
      [userId]: formatMoney(value[userId]),
    })
  };

  const changePaidAmount = (event) => {
    let userId = event.target.dataset.id;
    onChange({
      ...value,
      [userId]: event.target.value
    })
  };


  return (
    <div>
      {users.map((user) => (
        <so.UserAmountRow key={user.id}>
          <BodyText>{user.name}</BodyText>
          <so.PayerInput
            min={0}
            value={value[user.id]}
            type="number"
            id="amount-input"
            onChange={changePaidAmount}
            onBlur={onBlur}
            data-id={user.id}
            onFocus={onFocusMoneyInput}
          />
        </so.UserAmountRow>
      ))}
    </div>)

}


const transformStringMapToNumberMap = (stringMap: Record<string, string>): Record<string, number> => {
  const resultMap: Record<string, number> = {};

  for (let key in stringMap) {
    resultMap[key] = parseFloat(stringMap[key]);
  }

  return resultMap;
};

const getInitialAmountFromUsers = (users: IUser[]): Record<string, string> =>
  users.reduce((acc, user) => ({ ...acc, [user.id]: formatMoney(0) }), {});

interface IProps {
  onAdd: (transaction: ITransaction) => void;
  users: IUser[];
  isOpen: boolean
  userId: string
}

const DATE_FORMAT = "DD-MMM-YYYY HH:mm";
const INITIAL_DATE = dayjs().format(DATE_FORMAT);

const getPaidUserAmount = (paidUsers: Map<string>, paidUserId: string, users: IUser[], totalAmount: string, isConfigurable: boolean) => isConfigurable ? paidUsers : {
  ...getInitialAmountFromUsers(users),
  [paidUserId]: totalAmount,
}

function TransactionWidget(props: IProps) {
  const { isOpen: isConfigurable, open: openConfigurable, close: closeConfigurable } = useModalState()
  const [date, setDate] = useState<string>(INITIAL_DATE);
  const [title, setTitle] = useState<string>('');
  const [errors, setErrors] = useState([]);
  const [amountError, setAmountError] = useState('')
  const [paidUsers, setPaidUsers] = useState(getInitialAmountFromUsers(props.users))
  const [spentUsers, setSpentUsers] = useState(getInitialAmountFromUsers(props.users))
  const [totalAmount, setTotalAmount] = useState('0.00')
  const [paidUserId, setPaidUserId] = useState(props.userId)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const removeError = (err: 'title' | 'totalAmount') => {
    if (errors.includes(err)) {
      setErrors(errors.filter(e => e !== err))
    }
  }

  const changeTitle = (event) => {
    setTitle(event.target.value);
    removeError('title')
  };

  const changeDate = (value: Date) => {
    setDate(dayjs(value).format(DATE_FORMAT));
  };

  const onSubmit = () => {
    if (isSubmitted) return
    const errors = []
    if (!title) {
      errors.push('title')
    }
    if (!parseFloat(totalAmount)) {
      errors.push('totalAmount')
    }
    const err = getAmountError({
      amount: totalAmount,
      paidUsers: getPaidUserAmount(paidUsers, paidUserId, props.users, totalAmount, isConfigurable),
      spentUsers
    });
    if (err) {
      setAmountError(err)
    }

    if (errors.length) {
      setErrors(errors)
    }

    if (!errors.length && !err) {
      setIsSubmitted(true)
      props.onAdd({
        title,
        date,
        amount: totalAmount,
        spentUsers: transformStringMapToNumberMap(spentUsers),
        paidUsers: transformStringMapToNumberMap(
          getPaidUserAmount(paidUsers, paidUserId, props.users, totalAmount, isConfigurable)
        )
      })
    }
  }

  const onChangeTotalAmount = (e) => {
    setTotalAmount(e.target.value)
    removeError('totalAmount')
  }

  const onFocusMoneyInput = (e) => {
    e.target.select();
  };

  const onChangeUserAmount = (type: 'spent' | 'paid') => (data: Map<string>) => {
    if (type === 'spent') {
      setSpentUsers(data)
    } else {
      setPaidUsers(data)
    }
    setAmountError('')
  }

  const onTotalAmountBlur = () => {
    setTotalAmount(formatMoney(totalAmount))
  }

  return (
    <s.Container>
      <Field label="Name">
        <so.TracsactionInput
          placeholder="Enter title"
          value={title}
          onChange={changeTitle}
          error={errors.includes('title')}
        />
      </Field>
      <Field label="Date">
        <DatePicker
          onChange={changeDate}
          value={new Date(date)}
        />
      </Field>
      <Field label="Total amount">
        <so.AmountInput
          value={totalAmount}
          onChange={onChangeTotalAmount}
          min={0}
          type="number"
          id="amount-input"
          onFocus={onFocusMoneyInput}
          onBlur={onTotalAmountBlur}
          error={errors.includes('totalAmount')}
        />
      </Field>

      <div>
        <Flex margin="0 0 4px" justify="space-between">
          <BodyText>Who Paid</BodyText>
          <s.Link onClick={isConfigurable ? closeConfigurable : openConfigurable}>{isConfigurable ? 'Standard' : 'Configurable'}</s.Link>
        </Flex>
        {
          isConfigurable ? (
            <UsersInputGroup value={paidUsers} users={props.users} onChange={onChangeUserAmount('paid')} />
          ) : (
            <Dropdown
              value={paidUserId}
              options={props.users.map((u) => ({
                label: u.name,
                value: u.id,
              }))}
              onSelect={setPaidUserId}
            />
          )
        }
      </div>
      <Field label='Who Spent' error={amountError}>
        <UsersInputGroup
          users={props.users}
          onChange={onChangeUserAmount('spent')}
          value={spentUsers}
        />
      </Field>
      <Button variant='primary' onClick={onSubmit} disabled={isSubmitted}>Add</Button>
    </s.Container>
  )
}

export default TransactionWidget;
