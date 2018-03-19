export const configurationList = [
  {
    nameAttribute: 'Newest',
    nameHeaders: ['Name', 'Added On'],
    namesAttributes: ['name', 'Added on'],
    changeData: true
  },
  {
    nameAttribute: 'mostDownloaded',
    nameHeaders: ['Name', 'Downloads'],
    namesAttributes: ['name', 'Downloads']
  },
  {
    nameAttribute: 'mostStarred',
    nameHeaders: ['Name', 'Stars'],
    namesAttributes: ['name', 'Stars']
  },
  {
    nameAttribute: 'mostWatched',
    nameHeaders: ['Name', 'Watchers'],
    namesAttributes: ['name', 'Watchers']
  },
  {
    nameAttribute: 'topContributors',
    nameHeaders: ['Name', 'Spin'],
    namesAttributes: ['name', '# Spins'],
    redirectUser: true
  },
  {
    nameAttribute: 'topTags',
    nameHeaders: ['Name', 'Added On'],
    namesAttributes: ['name', '# Spins'],
    redirectTag: true
  }
];
export function getConfigurationList(translations, translationsHeader) {
  if (translations && translations.length && translations.length === 6) {
    return [
      {
        nameAttribute: 'Newest',
        nameHeaders: translationsHeader[0],
        namesAttributes: ['name', 'Added on'],
        changeData: true,
        name: translations[0]
      },
      {
        nameAttribute: 'mostDownloaded',
        nameHeaders: translationsHeader[1],
        namesAttributes: ['name', 'Downloads'],
        name: translations[1]
      },
      {
        nameAttribute: 'mostStarred',
        nameHeaders: translationsHeader[2],
        namesAttributes: ['name', 'Stars'],
        name: translations[2]
      },
      {
        nameAttribute: 'mostWatched',
        nameHeaders: translationsHeader[3],
        namesAttributes: ['name', 'Watchers'],
        name: translations[3]
      },
      {
        nameAttribute: 'topContributors',
        nameHeaders: translationsHeader[4],
        namesAttributes: ['name', '# Spins'],
        redirectUser: true,
        name: translations[4]
      },
      {
        nameAttribute: 'topTags',
        nameHeaders: translationsHeader[5],
        namesAttributes: ['name', '# Spins'],
        redirectTag: true,
        name: translations[5]
      }
    ];
  }
}
