export const configurationList = [
  {
    nameAttribute: "Newest",
    nameHeaders: ["Name", "Added On"],
    namesAttributes: ["name", "Added on"],
    changeData: true,
    redirectUser: true
  },
  {
    nameAttribute: "mostDownloaded",
    nameHeaders: ["Name", "Downloads"],
    namesAttributes: ["name", "Downloads"]
  },
  {
    nameAttribute: "mostStarred",
    nameHeaders: ["Name", "Stars"],
    namesAttributes: ["name", "Stars"]
  },
  {
    nameAttribute: "mostWatched",
    nameHeaders: ["Name", "Watchers"],
    namesAttributes: ["name", "Watchers"]
  },
  {
    nameAttribute: "topContributors",
    nameHeaders: ["Name", "Spin"],
    namesAttributes: ["name", "# Spins"],
    redirectUser: true
  },
  {
    nameAttribute: "topTags",
    nameHeaders: ["Name", "Added On"],
    namesAttributes: ["name", "# Spins"],
    redirectTag: true
  }
];
