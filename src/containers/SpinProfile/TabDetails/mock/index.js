import React from 'react';
import { Table, Icon } from "patternfly-react";
const headerFormat = value => {
return <Table.Heading>{value}</Table.Heading>;
};
const cellFormat = value => {
return <Table.Cell>{value}</Table.Cell>;
};
const cellFormatDownload = value => {
  return (
    <div style={{ textAlign: 'center' }}>
      <a href={value}><Icon name="download" /></a>
    </div>
  )
}

export const data = [
  {
    platform: 'EL',
    version: 'precise'
  },
  {
    platform: 'EL',
    version: 'precise'
  },
  {
    platform: 'EL',
    version: 'precise'
  },
  {
    platform: 'EL',
    version: 'precise'
  },
  {
    platform: 'EL',
    version: 'precise'
  },
  {
    platform: 'EL',
    version: 'precise'
  },
  {
    platform: 'EL',
    version: 'precise'
  },
  {
    platform: 'EL',
    version: 'precise'
  },
  {
    platform: 'EL',
    version: 'precise'
  },
  {
    platform: 'EL',
    version: 'precise'
  },
  {
    platform: 'EL',
    version: 'precise'
  },
]
export const mockBootstrapColumns = [
  {
    header: {
      label: 'Version',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormat]
    },
    property: 'tag'
  },
  {
    header: {
      label: 'Release Data',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormat]
    },
    property: 'created'
  },
  {
    header: {
      label: 'Download',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormatDownload]
    },
    property: 'url_download'
  }
];

const headerFormatRightAlign = value => {
  return <Table.Heading align="right">{value}</Table.Heading>;
};
const cellFormatRightAlign = value => {
  return <Table.Cell align="right">{value}</Table.Cell>;
};

export const mockPatternflyColumns = [
  {
    header: {
      label: 'First Name',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormat]
    },
    property: 'first_name'
  },
  {
    header: {
      label: 'Last Name',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormat]
    },
    property: 'last_name'
  },
  {
    header: {
      label: 'Username',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormat]
    },
    property: 'username'
  },
  {
    header: {
      label: 'Commits',
      formatters: [headerFormatRightAlign]
    },
    cell: {
      formatters: [cellFormatRightAlign]
    },
    property: 'commits'
  },
  {
    header: {
      label: 'Additions',
      formatters: [headerFormatRightAlign]
    },
    cell: {
      formatters: [cellFormatRightAlign]
    },
    property: 'additions'
  },
  {
    header: {
      label: 'Location',
      formatters: [
        value => {
          return <Table.Heading align="center">{value}</Table.Heading>;
        }
      ]
    },
    cell: {
      formatters: [
        value => {
          return <Table.Cell align="center">{value}</Table.Cell>;
        }
      ]
    },
    property: 'location'
  },
  {
    header: {
      label: 'Gender',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormat]
    },
    property: 'gender'
  }
];

export const mockBootstrapRows = [
  {
    id: 0,
    first_name: 'Dan',
    last_name: 'Abramov',
    username: 'gaearon',
    commits: 711,
    additions: 272635,
    location: 'London, UK',
    gender: 'male'
  },
  {
    id: 1,
    first_name: 'Sebastian',
    last_name: 'Markbåge',
    username: 'sebmarkbage',
    commits: 476,
    additions: 203610,
    location: 'San Francisco, CA',
    gender: 'male'
  },
  {
    id: 2,
    first_name: 'Sophie',
    last_name: 'Alpert',
    username: 'sophiebits',
    commits: 828,
    additions: 114467,
    location: 'California',
    gender: 'female'
  },
  {
    id: 3,
    first_name: 'Paul',
    last_name: 'O’Shannessy',
    username: 'zpao',
    commits: 820,
    additions: 87324,
    location: 'Seattle, WA',
    gender: 'male'
  },
  {
    id: 4,
    first_name: 'Pete',
    last_name: 'Hunt',
    username: 'petehunt',
    commits: 205,
    additions: 86685,
    location: 'San Francisco, CA',
    gender: 'male'
  },
  {
    id: 5,
    first_name: 'Andrew',
    last_name: 'Clark',
    username: 'acdlite',
    commits: 320,
    additions: 74162,
    location: 'Redwood City, CA',
    gender: 'male'
  },
  {
    id: 6,
    first_name: 'Nathan',
    last_name: 'Hunzaker',
    username: 'nhunzaker',
    commits: 77,
    additions: 34504,
    location: 'Durham, NC',
    gender: 'male'
  }
];
