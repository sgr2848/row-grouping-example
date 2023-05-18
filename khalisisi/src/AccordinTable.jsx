import React from "react";

const AccordinTable = ({ rowTableCtx, colData }) => {
  return (
    <div className="w-full flex flex-wrap">
      {colData.map((dta, i) => (
        <div className="w-full flex flex-wrap justify-end" key={i}>
          {rowTableCtx.tableHeaders.map((dt, i) => (
            <div key={i} className="w-1/5">
              {dta[dt.data]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AccordinTable;
