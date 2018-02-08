export function filterByAttribute( keywords, list, attributeItem ) {
  if(!list || (list && !list.length)) return[];

  let result =  list.filter(item => {
    let mtch = JSON.stringify(item[attributeItem]).match(new RegExp(keywords));
    return mtch ? true : false;
  });
  return result;
}
