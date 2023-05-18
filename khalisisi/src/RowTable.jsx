import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AccordinGroup from "./AccordinGroup";
import RowTableContext from "./store/row-table-context";

let countr=0

const RowTable = () => {
  const rowTableCtx = useContext(RowTableContext);
  const depthData = rowTableCtx.depth_data;
  const filters = rowTableCtx.filters;
  const tableInfo = rowTableCtx.tableHeaders;
  const [isLoading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  countr+=1
  console.log("Counter",countr)

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/data",
        depthData
      );
      console.log(response.data);
      setLoading(false);
      setTableData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [rowTableCtx.filters]);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  const addToFilter = (ti) => {
    rowTableCtx.setFilters([...rowTableCtx.filters, ti]);
    rowTableCtx.setTableHeaders([...tableInfo].filter((data) => data != ti));

    rowTableCtx.setDepthData({
      ...depthData,
      max_depth: depthData.max_depth == 0 ? 2 : (depthData.max_depth += 1),
      current_depth: 1,
      columns: [...depthData.columns, ti.data],
    });
  };

  return (
    <div className="p-5">
      <p className="mb-4">
        Filters:{" "}
        {filters.map((fd, i) => (
          <span className="rounded-lg p-2 bg-white text-black" key={i}>
            {fd.header}
          </span>
        ))}
      </p>
      {tableData.length > 0 && (
        <div className="flex flex-wrap w-full">
          {depthData.max_depth >= 2 && <div className="w-1/5">Groups</div>}
          {console.log(tableInfo)}
          {tableInfo.map((ti, i) => (
            <div key={i} onClick={() => addToFilter(ti)} className={"w-1/5"}>
              {ti.header}
            </div>
          ))}

          {depthData.max_depth != depthData.current_depth && (
            <AccordinGroup data={depthData} />
          )}

          {depthData.max_depth == depthData.current_depth &&
            tableData.map((item, i) => (
              <div key={i} className="w-full flex flex-wrap">
                {tableInfo.map((ti, i) => (
                  <div key={i} className="w-1/5">
                    {item[ti.data]}
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default RowTable;
