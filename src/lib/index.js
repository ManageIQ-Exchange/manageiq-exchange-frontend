export function filterByAttribute( keywords, list, attributeItem ) {
  if(!list || (list && !list.length)) return[];

  let result =  list.filter(item => {
    let mtch = JSON.stringify(item[attributeItem]).match(new RegExp(keywords));
    return mtch ? true : false;
  });
  return result;
}
export function toQuery(params, delimiter = "&") {
  const keys = Object.keys(params);

  return keys.reduce((str, key, index) => {
    let query = `${str}${key}=${params[key]}`;

    if (index < keys.length - 1) {
      query += delimiter;
    }

    return query;
  }, "");
}
