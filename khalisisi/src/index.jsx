import React from "react";
import ReactDOM from "react-dom";
import "../styles/styles.css";
import RowTable from "./RowTable";
import { RowTableContextProvider } from "./store/row-table-context";
const App = () => {

  React.useEffect(() => {}, []);
  return (
    <div className="w-full">
      <RowTableContextProvider>
        <RowTable />
      </RowTableContextProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
