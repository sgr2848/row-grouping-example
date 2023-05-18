import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import RowTableContext from "./store/row-table-context";

const Accordin = ({ data }) => {
  const rowTableCtx = useContext(RowTableContext);
  const depthData = rowTableCtx.depth_data;
  const [isLoading, setLoading] = useState(false);
  const divRef = useRef(null);
  const [resData, setResponseData] = React.useState([]);
  const [currentDepth, setCurrentDepth] = useState(1);
  const [colData, setColData] = useState([]);
  const [colValues, setColValues] = useState([]);

  const viewMore = async (name) => {
    try {
      setLoading(true);
      let cd = currentDepth;
      cd += 1;
      setCurrentDepth(cd);
      const response = await axios.post("http://localhost:3000/data", {
        ...rowTableCtx.depth_data,
        current_depth: cd,
        col_values: [...colValues, name],
      });
      setColValues((cv) => [...cv, name]);
      setLoading(false);
      let columnData = {
        depth: cd,
        data: response.data.data,
        show: true,
      };
      setColData((cd) => [...cd, columnData]);
      setResponseData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  function getTable(i) {
    return (
      <div className="w-full flex flex-wrap">
        {console.log("In table", i)}
        {colData[i].data.map((dta, i) => (
          <div className="w-full flex flex-wrap justify-end" key={i}>
            {rowTableCtx.tableHeaders.map((dt, i) => (
              <div key={i} className="w-1/5">
                {dta[dt.data]}
                {console.log(dta[dt.data])}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full" ref={divRef}>
      <div className="w-full">
        <div className="w-1/5">
          <h3 onClick={() => viewMore(data.name)}>
            {data.name} <span>({data.count})</span>
          </h3>
        </div>
      </div>
      {colData.map((cd, i) => {
        return i == currentDepth - 2 && depthData.max_depth == currentDepth ? (
          getTable(i)
        ) : (
          <>

            {cd.data.map((col_data, i) => (
              <div className="w-full" key={i}>
                <div className="w-1/ pl-5">
                  <h3 onClick={() => viewMore(col_data.name)}>
                    {col_data.name} <span>({col_data.count})</span>
                  </h3>
                </div>
              </div>
            ))}
          </>
        );
      })}

      {/* {depthData.max_depth == currentDepth && colData.length == 1 && getTable()} */}
    </div>
  );
};

export default Accordin;
