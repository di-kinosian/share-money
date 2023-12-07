import { Map } from "../../../firebase/types";

export const getAmountError = (
  amountDetails: {
    amount: string,
    spentUsers: Map<string>
    paidUsers: Map<string>
  },
): string => {
  const { spentUsers, paidUsers, amount } = amountDetails
  let errorKey = '';
  const spentAmount = Object.values(spentUsers).reduce(
    (acc, cur) => acc + parseFloat(cur),
    0
  );
  const paidAmount = Object.values(paidUsers).reduce(
    (acc, cur) => acc + parseFloat(cur),
    0
  );

  const preparedAmount = parseFloat(amount);

  if (preparedAmount !== spentAmount || preparedAmount !== paidAmount) {
    errorKey = 'not_equal';
  }
  if (paidAmount > spentAmount) {
    errorKey = 'paid_more_then_spent';
  }
  if (paidAmount < spentAmount) {
    errorKey = 'paid_less_then_spent';
  }

  switch (errorKey) {
    case 'not_equal': {
      return 'Total amount are not equal to spent amount or paid amount. Please check amount fields';
    }
    case 'paid_more_then_spent': {
      return 'Paid amount more then spent amount. Please check spent amount fields';
    }
    case 'paid_less_then_spent': {
      return 'Paid amount less then spent amount. Please check spent amount fields';
    }
    default: {
      return '';
    }
  }
};
