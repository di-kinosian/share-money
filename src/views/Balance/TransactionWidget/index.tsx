import { useState } from 'react';

import { ITransaction } from '../types';
import * as s from './styled';
import * as so from './styled-old';
import dayjs from 'dayjs';
import Field from '../../../components/Field';
import { formatMoney } from '../../../helpers/format';
import DatePicker from '../../../components/DatePicker';
import { BodyText, Flex, H4, HorisontalSeparator } from '../../../components/styled';
import Dropdown from '../../../components/Dropdown';
import { useModalState } from '../../../helpers/hooks';
import { Map } from '../../../firebase/types';
import Button from '../../../components/Button';
import { getAmountError } from './helpers';
import { IUser } from './types';
import Modal from '../../../components/Modal';


const getInitialAmountFromUsers = (users: IUser[]): Record<string, string> =>
  users.reduce((acc, user) => ({ ...acc, [user.id]: formatMoney(0) }), {});

interface IUsersInputGroupProps {
  users: IUser[];
  onChange: (data: Map<string>) => void
  value: Map<string>
  amount: string
}

const UsersInputGroup = ({ users, value, onChange, amount }: IUsersInputGroupProps) => {
  const { isOpen: isOptionsOpen, open: openOptions, close: closeOptions } = useModalState()
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

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

  const changeAmount = (event) => {
    let userId = event.target.dataset.id;
    onChange({
      ...value,
      [userId]: event.target.value
    })
  };

  const handleAmountSelect = (option: string) => () => {
    const id = selectedUserId

    switch (option) {
      case '100%': {
        onChange({
          ...getInitialAmountFromUsers(users),
          [id]: amount
        })
        break;
      }
      case '50%': {
        const computedAmount = parseFloat(amount) / 2;
        if (users.length === 2) {
          onChange(users.reduce((acc, user) => ({
            ...acc,
            [user.id]: formatMoney(computedAmount)
          }), {}))
        }
        break;
      }
      case '0%': {
        onChange({
          ...value,
          [id]: '0.00'
        })
        break;
      }
      case 'Rest': {
        const computedAmount =
          parseFloat(amount) -
          Object.entries(
            value
          ).reduce(
            (acc, [userId, userAmount]) =>
              userId === id ? acc : acc + parseFloat(userAmount),
            0
          );
        onChange({
          ...value,
          [id]: formatMoney(computedAmount)
        })
        break;
      }
      default: {
        break;
      }
    }
    closeOptions()
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
            onChange={changeAmount}
            onBlur={onBlur}
            data-id={user.id}
            onFocus={onFocusMoneyInput}
          />
          <s.Ellipsis onClick={() => { setSelectedUserId(user.id); openOptions() }} />
        </so.UserAmountRow>
      ))}
      <Modal isOpen={isOptionsOpen} onClose={closeOptions}>
        <s.Actions>
          <H4>Please select part of total amount</H4>
          <s.Action onClick={handleAmountSelect('100%')}>
            <BodyText>100%</BodyText>
          </s.Action>
          <HorisontalSeparator />
          <s.Action onClick={handleAmountSelect('50%')}>
            <BodyText>50%</BodyText>
          </s.Action>
          <HorisontalSeparator />
          <s.Action onClick={handleAmountSelect('0%')}>
            <BodyText>0%</BodyText>
          </s.Action>
          <HorisontalSeparator />
          <s.Action onClick={handleAmountSelect('Rest')}>
            <BodyText>Rest</BodyText>
          </s.Action>
        </s.Actions>
      </Modal>
    </div>)

}


const transformStringMapToNumberMap = (stringMap: Record<string, string>): Record<string, number> => {
  const resultMap: Record<string, number> = {};

  for (let key in stringMap) {
    resultMap[key] = parseFloat(stringMap[key]);
  }

  return resultMap;
};



interface IProps {
  onAdd: (transaction: ITransaction) => void;
  users: IUser[];
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

  const isSpentUsersNotEqual = (usersMap: Record<string, string>) => {
    const usersAmountMap = transformStringMapToNumberMap(usersMap)

    const usersAmounts = Object.values(usersAmountMap)

    const maxAmount = Math.max(...usersAmounts)
    const minAmount = Math.min(...usersAmounts)

    return maxAmount !== minAmount
  }

  const isZeroAmount = (amount: string) => Number.isNaN(parseFloat(amount)) || parseFloat(amount) === 0

  const isSpentUsersHasZeroAmount = (usersMap: Record<string, string>) => {
    const usersAmounts = Object.values(usersMap)

    return usersAmounts.some(isZeroAmount)
  }

  const isHalfOptionVisible = Boolean(parseFloat(totalAmount)) && (isSpentUsersNotEqual(spentUsers) || isSpentUsersHasZeroAmount(spentUsers))

  const onHalfSpentClick = () => {
    const computedAmount = parseFloat(totalAmount) / props.users.length;
    onChangeUserAmount('spent')(
      props.users.reduce((acc, user) => ({
        ...acc,
        [user.id]: formatMoney(computedAmount)
      }), {})
    )
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
            <UsersInputGroup value={paidUsers} users={props.users} onChange={onChangeUserAmount('paid')} amount={totalAmount} />
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
      <s.SpentContainer>
        <Field label='Who Spent' error={amountError}>
          <UsersInputGroup
            users={props.users}
            onChange={onChangeUserAmount('spent')}
            value={spentUsers}
            amount={totalAmount}
          />
        </Field>
        {isHalfOptionVisible && <s.HalfSpentButton><s.Link onClick={onHalfSpentClick}>50/50</s.Link></s.HalfSpentButton>}
      </s.SpentContainer>

      <Button variant='primary' onClick={onSubmit} disabled={isSubmitted}>Add</Button>
    </s.Container>
  )
}

export default TransactionWidget;
