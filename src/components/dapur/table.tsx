import type React from "react";

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className = "" }: TableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

interface TableHeaderProps {
  children: React.ReactNode;
}

export function TableHeader({ children }: TableHeaderProps) {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">{children}</thead>
  );
}

interface TableBodyProps {
  children: React.ReactNode;
}

export function TableBody({ children }: TableBodyProps) {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
}

interface TableRowProps {
  children: React.ReactNode;
}

export function TableRow({ children }: TableRowProps) {
  return <tr className="hover:bg-gray-50 transition-colors">{children}</tr>;
}

interface TableCellProps {
  children: React.ReactNode;
  header?: boolean;
}

export function TableCell({ children, header = false }: TableCellProps) {
  if (header) {
    return (
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
        {children}
      </th>
    );
  }
  return <td className="px-4 py-3 text-sm text-gray-700">{children}</td>;
}
