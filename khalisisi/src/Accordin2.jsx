import React, { useContext, useState } from "react";
import RowTableContext from "./store/row-table-context";
import axios from "axios";
import AccordinTable from "./AccordinTable";

const Accordin2 = ({ data, cur_depth, col_values }) => {
  const rowTableCtx = useContext(RowTableContext);
  const depthData = rowTableCtx.depth_data;
  let [curDepth, setCurDepth] = useState(cur_depth);
  const [resData, setResData] = useState([]);
  //   const [colValues, setColValues] = useState([...col_values, data.name]);
  const colValues = [...col_values, data.name];

  const viewMore = async () => {
    try {
      const response = await axios.post("http://localhost:3000/data", {
        ...rowTableCtx.depth_data,
        current_depth: (curDepth += 1),
        col_values: [...colValues],
      });
      setCurDepth((cd) => (cd += 1));

      setResData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3 onClick={viewMore} className={`pl-${curDepth * 2}`}>
        {data.name} <span>({data.count})</span>
      </h3>
      {resData.length > 0 && depthData.max_depth != curDepth && (
        <>
          {resData.map((rd, i) => (
            <Accordin2 data={rd} cur_depth={curDepth} col_values={colValues} />
          ))}
        </>
      )}

      {resData.length > 0 && depthData.max_depth == curDepth && (
        <AccordinTable colData={resData} rowTableCtx={rowTableCtx} />
      )}
    </div>
  );
};

export default Accordin2;
