import React from "react";

const BulkDiscountTable = ({ title, data }) => {
  return (
    <div className="my-6 w-full">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b">Discount Group</th>
              <th className="p-3 border-b">From Adult</th>
              <th className="p-3 border-b">To Adult</th>
              <th className="p-3 border-b">Value</th>
            </tr>
          </thead>
         <tbody>
  {data.map((row, index) => (
    <tr key={index} className="border-b hover:bg-gray-50">
      <td className="p-3">{index + 1}</td>
      <td className="p-3">{`Group ${row.minPeople} ${row.targetGroup}`}</td>
      <td className="p-3">{row.minPeople}</td>
      <td className="p-3">{row.maxPeople ?? "----------"}</td>
      <td className="p-3">
        {row.type === "percent" ? `${row.value}%` : `$${row.value}`}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default BulkDiscountTable;
