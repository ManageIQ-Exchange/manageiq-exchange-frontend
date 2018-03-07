const countSortFileds = 5;

function getSortField(traductions) {
  if (
    traductions &&
    traductions.length &&
    traductions.length === countSortFileds
  ) {
    return [
      {
        id: 'user_login',
        title: traductions[0],
        isNumeric: false
      },
      {
        id: 'name',
        title: traductions[1],
        isNumeric: false
      },
      {
        id: 'stargazers_count',
        title: traductions[2],
        isNumeric: false
      },
      {
        id: 'watchers_count',
        title: traductions[3],
        isNumeric: false
      },
      {
        id: 'downloads_count',
        title: traductions[4],
        isNumeric: false
      }
    ];
  } else return [];
}

export default getSortField;
