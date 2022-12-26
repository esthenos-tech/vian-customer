export const columns = [
  {
    dataField: "id",
    text: "Sr.No",
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return rowIndex + 1;
    },
  },
  {
    dataField: "name",
    text: "BRANCH",
    sort: true,
  },
  {
    dataField: "code",
    text: "CODE",
  },
  {
    dataField: "parent.name",
    text: "CLUSTER",
  },
  {
    dataField: "parent.parent.name",
    text: "AREA",
  },
  {
    dataField: "parent.parent.parent.name",
    text: "STATE",
  },
  {
    dataField: "parent.parent.parent.parent.name",
    text: "ZONE",
  },
];
