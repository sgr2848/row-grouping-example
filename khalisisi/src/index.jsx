import React from "react";
import ReactDOM from "react-dom";
import "../styles/styles.css";
const App = () => {
  const [filters, setFilter] = {};
  const [tableData, setTableData] = useState();
  const [data, setData] = useState();
  
  React.useEffect(() => {}, []);
  return (
    <div className="bg-gray-200">
      <h1 className="text-3xl font-bold text-center my-8">Hello, world!</h1>
      <table></table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
