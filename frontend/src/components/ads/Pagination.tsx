import { useState } from "react";

function Pagination({ count }: { count: number }) {
  const [limit, setLimit] = useState("5");
  const counterChoice = [5, 10, 20, 100];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(e.target.value);
  };
  return (
    <div>
      <select onChange={handleChange} value={limit}>
        {counterChoice.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <div>Nombre d'annonces : {count}</div>
    </div>
  );
}

export default Pagination;
