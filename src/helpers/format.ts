import currency from 'currency.js';
import moment from 'moment';

function formatMoney(amount, symbol?: string) {
  let number = Number(amount);
  if (isNaN(number)) {
    return '-';
  } else {
    return currency(amount, {
      symbol: symbol || '',
      separator: ' ',
      precision: 2,
      pattern: '#!',
      negativePattern: '-#!',
    }).format();
  }
}

function formatDateForDatepicker(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function getConnatationForNumber(num) {
  return num >= 0 ? 'positive' : 'negative';
}

function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return day + '/' + month + '/' + year;
}

function formatTime(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (second < 10) {
    second = '0' + second;
  }
  return hour + ':' + minute + ':' + second;
}

function formatDateTime(date) {
  return `${formatDate(date)} (${formatTime(date)})`;
}

const formatToLocalDateString = (date: Date, locale: string = 'en-GB') => {
  return date.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });
};

const formatTransactionDate = (date: string) =>
  moment(date).format('dddd, DD MMM YYYY').replace(` ${moment().year()}`, '');

export {
  formatDate,
  formatMoney,
  getConnatationForNumber,
  formatDateForDatepicker,
  formatTime,
  formatDateTime,
  formatToLocalDateString,
  formatTransactionDate,
};
