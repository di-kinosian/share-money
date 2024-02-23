import currency from 'currency.js';

export function formatMoney(amount, symbol?: string) {
  let number = Number(amount);
  if (isNaN(number)) {
    return '-';
  } else {
    return currency(amount, {
      symbol: symbol || '',
      separator: '',
      precision: 2,
      pattern: '#!',
      negativePattern: '-#!',
    }).format();
  }
}
