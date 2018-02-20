import React from "react";
import { Table, Icon } from "patternfly-react";
import BtnViewGithub from "../../components/BtnViewGithub";

const headerFormat = value => {
  return <Table.Heading>{value}</Table.Heading>;
};
const cellFormat = value => {
  return <Table.Cell>{value}</Table.Cell>;
};
const cellFormatGithub = value => {
  return (
    <div style={{ textAlign: "center" }}>
      <BtnViewGithub />
    </div>
  );
};

export const columnsFormat = [
  {
    header: {
      label: "Author",

      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormat]
    },
    property: "login"
  },
  {
    header: {
      label: "",
      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormatGithub]
    },
    property: "url_profile"
  }
];
