import React from "react";
import { getPromiseInstance } from "./PromiseLibrary";

function PromiseBasic() {
  React.useEffect(() => {
    getPromiseInstance(3000).catch((err) => {
      console.error(err);
    });

    getPromiseInstance(1000, true).then((res) => {
      console.log(res);
    });
  }, []);
  return <h3>Basic implementation</h3>;
}

export default PromiseBasic;
