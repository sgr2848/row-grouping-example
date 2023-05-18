import { createContext, useState } from "react";

const RowTableContext = createContext({
  depth_data: { max_depth: 0, current_depth: 0, columns: [], col_values: [] },
  filters: [],
  tableHeaders: [
    {
      header: "Country",
      data: "country",
    },
    {
      header: "Customer",
      data: "customer",
    },
    {
      header: "Currency",
      data: "payment_currency",
    },
    {
      header: "Amount",
      data: "amount",
    },
    {
      header: "Discount",
      data: "discount_amount",
    },
  ],
  setDepthData: () => {},
  setFilters: () => {},
  setTableHeaders: () => {},
});

export function RowTableContextProvider({ children }) {
  const [data, setData] = useState({
    max_depth: 0,
    current_depth: 0,
    columns: [],
    col_values: [],
  });
  const [filters, setFilter] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([
    {
      header: "Country",
      data: "country",
    },
    {
      header: "Customer",
      data: "customer",
    },
    {
      header: "Currency",
      data: "payment_currency",
    },
    {
      header: "Amount",
      data: "amount",
    },
    {
      header: "Discount",
      data: "discount_amount",
    },
  ]);

  function setDepthDataHandler(data) {
    setData((dt) => data);
  }

  function setFiltersHandler(data) {
    setFilter((dt) => data);
  }

  function setTableHeaderHandler(td) {
    setTableHeaders((dt) => td);
  }

  let context = {
    depth_data: data,
    filters: filters,
    tableHeaders: tableHeaders,
    setDepthData: setDepthDataHandler,
    setFilters: setFiltersHandler,
    setTableHeaders: setTableHeaderHandler,
  };

  return (
    <RowTableContext.Provider value={context}>
      {children}
    </RowTableContext.Provider>
  );
}

export default RowTableContext;
