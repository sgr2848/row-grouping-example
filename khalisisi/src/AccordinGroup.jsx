import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Accordin2 from "./Accordin2";
import RowTableContext from "./store/row-table-context";

const AccordinGroup = (props) => {
  const rowTableCtx = useContext(RowTableContext);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/data",
        rowTableCtx.depth_data
      );
      setLoading(false);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="w-full">
      {data.length > 0 &&
        data.map((dt, i) => (
          <Accordin2
            data={dt}
            cur_depth={1}
            col_values={[]}
            depth_data={props.data}
            key={i}
          />
        ))}
    </div>
  );
};

export default AccordinGroup;
