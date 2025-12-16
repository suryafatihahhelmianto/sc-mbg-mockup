"use client";

import React from "react";
import { RequirementLine } from "../../lib/po-calculator";

type Props = {
  lines: RequirementLine[];
};

export default function RequirementTable({ lines }: Props) {
  function exportCsv() {
    const headers = ["ingredientId", "ingredientName", "totalGram", "totalKg"];
    const rows = lines.map((l) => [
      l.ingredientId,
      l.ingredientName,
      String(l.totalGram),
      String(l.totalKg),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "po-requirements.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Daftar Kebutuhan</h3>
        <button
          onClick={exportCsv}
          className="px-3 py-1 bg-sky-600 text-white rounded"
        >
          Export CSV
        </button>
      </div>
      <div className="overflow-auto border rounded">
        <table className="min-w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2">Bahan</th>
              <th className="p-2">Total (gram)</th>
              <th className="p-2">Total (kg)</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l) => (
              <tr key={l.ingredientId} className="border-t">
                <td className="p-2">{l.ingredientName}</td>
                <td className="p-2">{l.totalGram}</td>
                <td className="p-2">{l.totalKg}</td>
              </tr>
            ))}
            {lines.length === 0 && (
              <tr>
                <td className="p-2" colSpan={3}>
                  Tidak ada kebutuhan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
