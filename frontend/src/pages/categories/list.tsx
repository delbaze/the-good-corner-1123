import { useState } from "react";

function ListCategories() {
  //   let maVariable = "toto";
  const [maVariable, setMaVariable] = useState<string>("toto"); //hook puisqu'il commence par use

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // maVariable = "tata";
    setMaVariable("tata");
  };
  return (
    <div>
      <h1>Demo</h1>
      {maVariable}
      {/* <button onClick={(e) => handleClick(e)}>Click</button> */}
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

export default ListCategories;
