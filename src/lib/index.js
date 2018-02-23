import moment from 'moment';

import {
  messageColorOk,
  messageColorError,
  messageColorWarning
} from '../constant/color';
import { messageOk, messageError, messageWarning } from '../constant/';

export function filterByAttribute(keywords, list, attributeItem) {
  if (!list || (list && !list.length)) return [];

  let result = list.filter(item => {
    let mtch = JSON.stringify(item[attributeItem]).match(new RegExp(keywords));
    return !!mtch;
  });
  return result;
}
export function toQuery(params, delimiter = '&') {
  const keys = Object.keys(params);

  return keys.reduce((str, key, index) => {
    let query = `${str}${key}=${params[key]}`;

    if (index < keys.length - 1) {
      query += delimiter;
    }

    return query;
  }, '');
}

export function formatDate(date) {
  return moment(date).format('YYYY-MM-DD');
}

export function getFullNameMinimumVersion(key) {
  const keyFormat = key.toLowerCase();
  const opctions = {
    f: 'Fine',
    g: 'Gaprindashvili',
    h: 'Hammer',
    e: 'Euwe'
  };
  return opctions[keyFormat];
}
export function getColorLog(log) {

  if (log.includes(messageOk)) return messageColorOk;
  else if (log.includes(messageError)) return messageColorError;
  else if (log.includes(messageWarning)) return messageColorWarning;
  return null;
}
