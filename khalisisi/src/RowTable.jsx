import React, { useEffect } from "react";

const RowTable = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const data = {
          max_depth: 0,
          current_depth: 0,
          columns: [],
          col_values: [],
        };
        const response = await fetch("http://localhost:3000/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const resData = await response.json();
        console.log(resData);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return <div>RowTable</div>;
};

export default RowTable;
