import React from 'react';
import { Table, Icon } from 'patternfly-react';

const headerFormat = value => {
  return <Table.Heading>{value}</Table.Heading>;
};
const cellFormat = value => {
  return <Table.Cell>{value}</Table.Cell>;
};
const cellFormatDownload = value => {
  return (
    <div style={{ textAlign: 'center' }}>
      <a href={value}>
        <Icon name="download" />
      </a>
    </div>
  );
};

export function getColumns(traductions) {
  if (traductions && traductions.length && traductions.length === 3) {
    return [
      {
        header: {
          label: traductions[0],
          formatters: [headerFormat]
        },
        cell: {
          formatters: [cellFormat]
        },
        property: 'tag'
      },
      {
        header: {
          label: traductions[1],
          formatters: [headerFormat]
        },
        cell: {
          formatters: [cellFormat]
        },
        property: 'created'
      },
      {
        header: {
          label: traductions[2],
          formatters: [headerFormat]
        },
        cell: {
          formatters: [cellFormatDownload]
        },
        property: 'url_download'
      }
    ];
  } else return {};
}
