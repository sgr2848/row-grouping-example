import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Accordin from "./Accordin";
import RowTableContext from "./store/row-table-context";

const AccordinGroup = (props) => {
  const rowTableCtx = useContext(RowTableContext);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  let coulmn_depth = 1;
  let col_depth_1_data = [];
  let col_depth_2_data = [];

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
          <Accordin data={dt} depth_data={props.data} key={i} />
        ))}
    </div>
  );
};

export default AccordinGroup;