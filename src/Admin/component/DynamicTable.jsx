  import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";

const DynamicTable = ({
  data = [],
  columns = [],
  actions,
  actionsstates,
  customRender,
  actionsviewselect,
  Seen,
  view,
  buttonstatus,
  filteredData = [],
  searchQuery
}) => {


  useEffect(() => {
      setCurrentPage(1);
    }, [searchQuery]);
  
    const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(filteredData.length / 10);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );
  if (!data.length) {
    return (
      <div className="flex flex-col gap-4 mt-5">
  <table className="w-full min-w-[800px] border border-one text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 text-one px-4">S/N</th>
            {columns.map((col) => (
              <th key={col.key} className="py-3 text-one px-4">
                {col.label}
              </th>
            ))}
            {Seen && <th className="py-3 text-one px-4">Seen</th>}
            {view && <th className="py-3 text-one px-4">view</th>}
            {buttonstatus && <th className="py-3 text-one px-4">Status Actions</th>}
            {actions && <th className="py-3 text-one px-4">Actions</th>}
            {actionsstates && (
              <th className="py-3 text-one px-4">Change Status</th>
            )}
            {actionsviewselect && (
              <th className="py-3 text-one px-4">Options</th>
            )}
          </tr>
        </thead>
        </table>
                <div className="mt-6 text-center text-one">No data available</div>

      </div>
    );
  }

  const keys = columns.map((col) => col.key);

  const truncate = (text, max = 20) => {
    if (!text) return "N/A";
    return text.toString().length > max
      ? text.toString().slice(0, max) + "..."
      : text;
  };
 
  return (
    <div className="mt-4 overflow-x-auto w-full">
      <table className="w-full min-w-[800px] border border-one text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 text-one px-4">S/N</th>
            {columns.map((col) => (
              <th key={col.key} className="py-3 text-one px-4">
                {col.label}
              </th>
            ))}
            {Seen && <th className="py-3 text-one px-4">Seen</th>}
            {view && <th className="py-3 text-one px-4">view</th>}
            {buttonstatus && <th className="py-3 text-one px-4">Status Actions</th>}
            {actions && <th className="py-3 text-one px-4">Actions</th>}
            {actionsstates && (
              <th className="py-3 text-one px-4">Change Status</th>
            )}
            {actionsviewselect && (
              <th className="py-3 text-one px-4">Options</th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, i) => (
            <tr
              key={row.id || i}
              className="border-t hover:bg-eight transition"
            >
              <td className="py-3 px-4 font-medium">
                {(currentPage - 1) * 10 + i + 1}
              </td>
              {keys.map((key) => (
                <td key={key} className="py-3 px-4">
                  {customRender && customRender(key, row[key])
                    ? customRender(key, row[key])
                    : truncate(row[key])}
                </td>
              ))}
              {Seen && <td className="py-3 px-4">{Seen(row)}</td>}
              {view && <td className="py-3 px-4">{view(row)}</td>}
                {buttonstatus && (
                  <td className="py-3 px-4">{buttonstatus(row)}</td>
                )}
              {actions && <td className="py-3 px-4">{actions(row)}</td>}
              {actionsstates && (
                <td className="py-3 px-4">{actionsstates(row)}</td>
              )}
              
              {actionsviewselect && (
                <td className="py-3 px-4">{actionsviewselect(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
            <div className="flex justify-center mt-4">
       <Pagination
  count={pageCount}
  page={currentPage}
  onChange={(e, page) => setCurrentPage(page)}
  shape="rounded"
  sx={{
          '& .MuiPaginationItem-root': {
            color: '#091A2E', 
            borderColor: '#091A20',
          },
          '& .Mui-selected': {
            backgroundColor: '#091A2E',
            color: 'white',
            '&:hover': {
              backgroundColor: '#091A2E', 
            },
          },
        
        }}
/>

      </div>
    </div>
  );
};

export default DynamicTable;
