import React from "react";
import ReactDOM from "react-dom";
import "../styles/styles.css";
import RowTable from "./RowTable";
const App = () => {
  return (
    <div className="bg-gray-200">
      <h1 className="text-3xl font-bold text-center my-8">Hello, world!</h1>

      <RowTable/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
