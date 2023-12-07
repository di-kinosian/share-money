import { useState } from 'react';
import * as so from './styled-old';
import { formatMoney } from '../../../helpers/format';
import Field from '../../../components/Field';
import Button from '../../../components/Button';
import * as s from './styled';
import AmountMenu from '../../../components/AmountMenu/AmountMenu';
import { IAmountDetails, IAmountStepProps } from './types';
import { BodyText } from '../../../components/styled';
import { getAmountError } from './helpers';
import { Icon } from 'semantic-ui-react';




function MultipalTransaction(props: IAmountStepProps) {
  const { paidUsers, spentUsers, amount } = props.amountDetails;
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [error, setError] = useState<string>('');

  const onFocusMoneyInput = (e) => {
    e.target.select();
  };

  const onAddTransaction = () => {
    setIsEdit(false);
    const amountError = getAmountError({ amount, paidUsers, spentUsers });
    setError(amountError);

    if (!amountError) {
      props.onSubmit(props.amountDetails);
    }
  };

  const changeAmount = (event) => {
    setIsEdit(true);
    props.onChangeAmountDetails({
      ...props.amountDetails,
      amount: event.target.value,
    })
  };

  const changePaidAmount = (event) => {
    setIsEdit(true);
    let userId = event.target.dataset.id;
    props.onChangeAmountDetails({
      ...props.amountDetails,
      paidUsers: {
        ...props.amountDetails.paidUsers,
        [userId]: event.target.value
      }
    })
  };

  const formatPaidAmount = (event) => {
    let userId = event.target.dataset.id;
    props.onChangeAmountDetails({
      ...props.amountDetails,
      paidUsers: {
        ...props.amountDetails.paidUsers,
        [userId]: formatMoney(paidUsers[userId]),
      }
    })
  };

  const changeSpentAmount = (event) => {
    setIsEdit(true);
    let userId = event.target.dataset.id;
    props.onChangeAmountDetails({
      ...props.amountDetails,
      spentUsers: {
        ...props.amountDetails.spentUsers,
        [userId]: event.target.value
      }
    })
  };

  const formatSpentAmount = (event) => {
    let userId = event.target.dataset.id;
    props.onChangeAmountDetails({
      ...props.amountDetails,
      spentUsers: {
        ...props.amountDetails.spentUsers,
        [userId]: formatMoney(spentUsers[userId]),
      }
    })
  };

  const handleAmountSelect = (id: string, type: string, value: string) => {
    let computedAmount = 0;

    switch (value) {
      case '100%': {
        computedAmount = parseFloat(amount);
        break;
      }
      case '50%': {
        computedAmount = parseFloat(amount) / 2;
        break;
      }
      case '0%': {
        computedAmount = 0;
        break;
      }
      case 'Rest': {
        computedAmount =
          parseFloat(amount) -
          Object.entries(
            type === 'paid' ? paidUsers : spentUsers
          ).reduce(
            (acc, [userId, userAmount]) =>
              userId === id ? acc : acc + parseFloat(userAmount),
            0
          );
        break;
      }
      default: {
        computedAmount = 0;
        break;
      }
    }

    if (type === 'paid') {
      props.onChangeAmountDetails({
        ...props.amountDetails,
        paidUsers: {
          ...props.amountDetails.paidUsers,
          [id]: formatMoney(computedAmount)
        }
      })
    } else {
      props.onChangeAmountDetails({
        ...props.amountDetails,
        spentUsers: {
          ...props.amountDetails.spentUsers,
          [id]: formatMoney(computedAmount)
        }
      })
    }
  };

  return (
    <>
      <Field label="Amount:">
        <so.AmountInput
          value={amount}
          onChange={changeAmount}
          min={0}
          type="number"
          id="amount-input"
          onFocus={onFocusMoneyInput}
        />
      </Field>
      <Field label="Who Paid:">
        {props.users.map((user) => (
          <so.UserAmountRow key={user.id}>
            <BodyText>{user.name}</BodyText>
            <so.PayerInput
              min={0}
              value={paidUsers[user.id]}
              type="number"
              id="amount-input"
              onChange={changePaidAmount}
              onBlur={formatPaidAmount}
              data-id={user.id}
              onFocus={onFocusMoneyInput}
            />
          </so.UserAmountRow>
        ))}
      </Field>
      <Field label="Who Spent:">
        {props.users.map((user) => (
          <so.UserAmountRow key={user.id}>
            <BodyText>{user.name}</BodyText>
            <so.PayerInput
              min={0}
              value={spentUsers[user.id]}
              type="number"
              id="amount-input"
              data-id={user.id}
              onChange={changeSpentAmount}
              onBlur={formatSpentAmount}
              onFocus={onFocusMoneyInput}
            />
            <s.Ellipsis />
          </so.UserAmountRow>
        ))}
      </Field>
      {!isEdit && error && <so.ErrorText>{error}</so.ErrorText>}
      <s.Buttons>
        <Button
          variant="primary"
          onClick={onAddTransaction}
          disabled={!isEdit || !(Number(amount) > 0)}
        >
          Add
        </Button>
      </s.Buttons>
    </>
  );
}

export default MultipalTransaction;
