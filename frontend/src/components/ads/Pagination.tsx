import { useState } from "react";

function Pagination({
  count,
  callRequest,
}: {
  count: number;
  callRequest: (p: number, limit: number) => void;
}) {
  const [limit, setLimit] = useState(5);
  const counterChoice = [1, 5, 10, 20, 100];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(+e.target.value);
  };

  const handleChangePage = (p: number) => {
    callRequest(p, limit);
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
      <div>
        <div>Nombre d'annonces : {count}</div>
        <div>
          {Array.from(Array(Math.ceil(count / limit)), (_, i) => i + 1).map(
            (p) => {
              return (
                <div
                  style={{ cursor: "pointer" }}
                  key={p}
                  onClick={() => handleChangePage(p)}
                >
                  {p}
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default Pagination;
