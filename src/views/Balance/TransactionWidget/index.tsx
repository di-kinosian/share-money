import { useEffect, useMemo, useState } from 'react';
import { ITransaction } from '../types';
import * as s from './styled';
import * as so from './styled-old';
import dayjs from 'dayjs';
import Field from '../../../components/Field';
import DatePicker from '../../../components/DatePicker';
import {
  BodyText,
  Flex,
  H4,
  HorisontalSeparator,
} from '../../../components/styled';
import Dropdown from '../../../components/Dropdown';
import { useModalState } from '../../../helpers/hooks';
import { IHistoryItem, Map } from '../../../firebase/types';
import Button from '../../../components/Button';
import { getAmountError } from './helpers';
import { IUser } from './types';
import Modal from '../../../components/Modal';
import { formatMoney } from '../../../helpers/money';
import { Icons } from '@makhynenko/ui-components';

const getInitialAmountFromUsers = (users: IUser[]): Record<string, string> =>
  users.reduce((acc, user) => ({ ...acc, [user.id]: formatMoney(0) }), {});

interface IUsersInputGroupProps {
  users: IUser[];
  onChange: (data: Map<string>) => void;
  value: Map<string>;
  amount: string;
}

const UsersInputGroup = ({
  users,
  value,
  onChange,
  amount,
}: IUsersInputGroupProps) => {
  const {
    isOpen: isOptionsOpen,
    open: openOptions,
    close: closeOptions,
  } = useModalState();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const onFocusMoneyInput = (e) => {
    e.target.select();
  };

  const onBlur = (event) => {
    let userId = event.target.dataset.id;
    onChange({
      ...value,
      [userId]: formatMoney(value[userId]),
    });
  };

  const changeAmount = (event) => {
    let userId = event.target.dataset.id;
    onChange({
      ...value,
      [userId]: event.target.value,
    });
  };

  const handleAmountSelect = (option: string) => () => {
    const id = selectedUserId;

    switch (option) {
      case '100%': {
        onChange({
          ...getInitialAmountFromUsers(users),
          [id]: amount,
        });
        break;
      }
      case '50%': {
        const computedAmount = parseFloat(amount) / 2;
        if (users.length === 2) {
          onChange(
            users.reduce(
              (acc, user) => ({
                ...acc,
                [user.id]: formatMoney(computedAmount),
              }),
              {}
            )
          );
        }
        break;
      }
      case '0%': {
        onChange({
          ...value,
          [id]: '0.00',
        });
        break;
      }
      case 'Rest': {
        const computedAmount =
          parseFloat(amount) -
          Object.entries(value).reduce(
            (acc, [userId, userAmount]) =>
              userId === id ? acc : acc + parseFloat(userAmount),
            0
          );
        onChange({
          ...value,
          [id]: formatMoney(computedAmount),
        });
        break;
      }
      default: {
        break;
      }
    }
    closeOptions();
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
          <s.Ellipsis
            onClick={() => {
              setSelectedUserId(user.id);
              openOptions();
            }}
          />
        </so.UserAmountRow>
      ))}
      <Modal isOpen={isOptionsOpen} onClose={closeOptions} zIndex={8}>
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
    </div>
  );
};

const transformStringMapToNumberMap = (
  stringMap: Record<string, string>
): Record<string, number> => {
  const resultMap: Record<string, number> = {};

  for (let key in stringMap) {
    resultMap[key] = parseFloat(stringMap[key]);
  }

  return resultMap;
};

const transformNumberMapStringMap = (
  numberMap: Record<string, number>
): Record<string, string> => {
  const resultMap: Record<string, string> = {};

  for (let key in numberMap) {
    resultMap[key] = String(numberMap[key]);
  }

  return resultMap;
};

interface IProps {
  onSubmit: (transaction: ITransaction) => void;
  users: IUser[];
  userId: string;
  data?: IHistoryItem;
}

const DATE_FORMAT = 'DD-MMM-YYYY HH:mm';
const INITIAL_DATE = dayjs().format(DATE_FORMAT);

const getPaidUserAmount = (
  paidUsers: Map<string>,
  paidUserId: string,
  users: IUser[],
  totalAmount: string,
  isConfigurable: boolean
) =>
  isConfigurable
    ? paidUsers
    : {
        ...getInitialAmountFromUsers(users),
        [paidUserId]: totalAmount,
      };

function TransactionWidget(props: IProps) {
  const {
    isOpen: isConfigurable,
    open: openConfigurable,
    close: closeConfigurable,
  } = useModalState();

  const paidUser = useMemo(() => {
    return props.users?.find((u) =>
      props.data?.paidUsers[u.id] === Number(props.data?.amount) ? u : null
    );
  }, [props.data?.amount, props.data?.paidUsers, props?.users]);

  const [date, setDate] = useState<string>(
    props.data ? props.data.date : INITIAL_DATE
  );
  const [title, setTitle] = useState<string>(
    props.data ? props.data.title : ''
  );
  const [errors, setErrors] = useState([]);
  const [amountError, setAmountError] = useState('');
  const [paidUsers, setPaidUsers] = useState(
    props.data
      ? transformNumberMapStringMap(props.data.paidUsers)
      : getInitialAmountFromUsers(props.users)
  );
  const [spentUsers, setSpentUsers] = useState(
    props.data
      ? transformNumberMapStringMap(props.data.spentUsers)
      : getInitialAmountFromUsers(props.users)
  );
  const [totalAmount, setTotalAmount] = useState(
    props.data ? String(props.data.amount) : '0.00'
  );

  const [paidUserId, setPaidUserId] = useState(
    props.data ? paidUser?.id : props.userId
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isEdit = Boolean(props.data);

  useEffect(() => {
    if (isEdit && !paidUser) {
      openConfigurable();
    }
  }, [isEdit, openConfigurable, paidUser]);

  const removeError = (err: 'title' | 'totalAmount') => {
    if (errors.includes(err)) {
      setErrors(errors.filter((e) => e !== err));
    }
  };

  const changeTitle = (event) => {
    setTitle(event.target.value);
    removeError('title');
  };

  const changeDate = (value: Date) => {
    setDate(dayjs(value).format(DATE_FORMAT));
  };

  const onSubmit = () => {
    if (isSubmitted) return;
    const errors = [];
    if (!title) {
      errors.push('title');
    }
    if (!parseFloat(totalAmount)) {
      errors.push('totalAmount');
    }
    const err = getAmountError({
      amount: totalAmount,
      paidUsers: getPaidUserAmount(
        paidUsers,
        paidUserId,
        props.users,
        totalAmount,
        isConfigurable
      ),
      spentUsers,
    });
    if (err) {
      setAmountError(err);
    }

    if (errors.length) {
      setErrors(errors);
    }

    if (!errors.length && !err) {
      setIsSubmitted(true);
      props.onSubmit({
        title,
        date,
        amount: totalAmount,
        spentUsers: transformStringMapToNumberMap(spentUsers),
        paidUsers: transformStringMapToNumberMap(
          getPaidUserAmount(
            paidUsers,
            paidUserId,
            props.users,
            totalAmount,
            isConfigurable
          )
        ),
      });
    }
  };

  const onChangeTotalAmount = (e) => {
    setTotalAmount(e.target.value);
    removeError('totalAmount');
  };

  const onFocusMoneyInput = (e) => {
    e.target.select();
  };

  const onChangeUserAmount =
    (type: 'spent' | 'paid') => (data: Map<string>) => {
      if (type === 'spent') {
        setSpentUsers(data);
      } else {
        setPaidUsers(data);
      }
      setAmountError('');
    };

  const onTotalAmountBlur = () => {
    setTotalAmount(formatMoney(totalAmount));
  };

  const isSpentUsersNotEqual = (usersMap: Record<string, string>) => {
    const usersAmountMap = transformStringMapToNumberMap(usersMap);

    const usersAmounts = Object.values(usersAmountMap);

    const maxAmount = Math.max(...usersAmounts);
    const minAmount = Math.min(...usersAmounts);

    return maxAmount !== minAmount;
  };

  const isZeroAmount = (amount: string) =>
    Number.isNaN(parseFloat(amount)) || parseFloat(amount) === 0;

  const isSpentUsersHasZeroAmount = (usersMap: Record<string, string>) => {
    const usersAmounts = Object.values(usersMap);

    return usersAmounts.some(isZeroAmount);
  };

  const isHalfOptionVisible =
    Boolean(parseFloat(totalAmount)) &&
    (isSpentUsersNotEqual(spentUsers) || isSpentUsersHasZeroAmount(spentUsers));

  const onHalfSpentClick = () => {
    const computedAmount = parseFloat(totalAmount) / props.users.length;
    onChangeUserAmount('spent')(
      props.users.reduce(
        (acc, user) => ({
          ...acc,
          [user.id]: formatMoney(computedAmount),
        }),
        {}
      )
    );
  };

  const onSwichUser = () => {
    const currentIndex = props.users.findIndex((u) => u.id === paidUserId);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % props.users.length;
      const nextUserId = props.users[nextIndex].id;
      setPaidUserId(nextUserId);
    } else if (props.users.length > 0) {
      setPaidUserId(props.users[0].id);
    }
  };

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
        <DatePicker onChange={changeDate} value={new Date(date)} />
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
          <s.Link
            onClick={isConfigurable ? closeConfigurable : openConfigurable}
          >
            {isConfigurable ? 'Standard' : 'Configurable'}
          </s.Link>
        </Flex>
        {isConfigurable ? (
          <UsersInputGroup
            value={paidUsers}
            users={props.users}
            onChange={onChangeUserAmount('paid')}
            amount={totalAmount}
          />
        ) : (
          <s.DropdownWrapper>
            <Dropdown
              value={paidUserId}
              options={props.users.map((u) => ({
                label: u.name,
                value: u.id,
              }))}
              onSelect={setPaidUserId}
            />
            <Icons name="refresh" onClick={onSwichUser} />
          </s.DropdownWrapper>
        )}
      </div>
      <s.SpentContainer>
        <Field label="Who Spent" error={amountError}>
          <UsersInputGroup
            users={props.users}
            onChange={onChangeUserAmount('spent')}
            value={spentUsers}
            amount={totalAmount}
          />
        </Field>
        {isHalfOptionVisible && (
          <s.HalfSpentButton>
            <s.Link onClick={onHalfSpentClick}>50/50</s.Link>
          </s.HalfSpentButton>
        )}
      </s.SpentContainer>

      <Button variant="primary" onClick={onSubmit} disabled={isSubmitted}>
        {isEdit ? 'Edit' : 'Add'}
      </Button>
    </s.Container>
  );
}

export default TransactionWidget;
