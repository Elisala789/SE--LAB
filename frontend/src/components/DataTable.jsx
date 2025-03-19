import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, MoreHorizontal, Filter, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

const DataTable = ({ columns, data, className }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleSort = (column) => {
    if (!column.sortable) return;
    let direction = 'asc';
    if (sortConfig.key === column.accessor) {
      direction = sortConfig.direction === 'asc' ? 'desc' : null;
    }
    setSortConfig({ key: direction ? column.accessor : null, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      return sortConfig.direction === 'asc' ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1);
    });
  }, [data, sortConfig]);

  const getSortIcon = (column) => {
    if (!column.sortable) return null;
    if (sortConfig.key === column.accessor) {
      return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />;
    }
    return <ChevronDown className="w-4 h-4 ml-1 opacity-20" />;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-between">
        <button className="px-3 py-1.5 text-sm flex items-center gap-2 rounded-md bg-secondary/50 hover:bg-secondary">
          <Filter className="w-4 h-4" /> Filter
        </button>
        <button className="px-3 py-1.5 text-sm flex items-center gap-2 rounded-md bg-secondary/50 hover:bg-secondary">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50">
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                <button className={cn("flex items-center", column.sortable && "cursor-pointer hover:text-foreground")} onClick={() => handleSort(column)}>
                  {column.header} {getSortIcon(column)}
                </button>
              </th>
            ))}
            <th className="px-4 py-3 text-right w-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60 bg-card">
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="group hover:bg-muted/20">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-3 text-sm">
                  {column.cell ? column.cell(row[column.accessor], row) : row[column.accessor]}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <button className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-secondary">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between pt-1">
        <span className="text-sm text-muted-foreground">Showing {data.length} results</span>
        <div className="flex space-x-2">
          <button className="px-2.5 py-1.5 text-sm rounded-md bg-secondary/50 hover:bg-secondary" disabled>
            Previous
          </button>
          <button className="px-2.5 py-1.5 text-sm rounded-md bg-secondary/50 hover:bg-secondary">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
