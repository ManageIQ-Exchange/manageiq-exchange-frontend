const countFilterFields = 3;

function getFilterField(traductions) {
  if (
    traductions &&
    traductions.length &&
    traductions.length === countFilterFields
  ) {
    return [
      {
        id: 'author',
        title: traductions[0],
        placeholder: 'Filter by Author',
        filterType: 'text'
      },
      {
        id: 'name',
        title: traductions[1],
        placeholder: 'Filter by name',
        filterType: 'text'
      },
      {
        id: 'tag',
        title: traductions[2],
        placeholder: 'Filter by Tag',
        filterType: 'text'
      }
    ];
  } else return [];
}

export default getFilterField;
