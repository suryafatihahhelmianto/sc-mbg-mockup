"use client";

import React from "react";
import { loadJSON } from "../../lib/storage";

type POView = {
  id: number;
  poNumber: string;
  tanggalDibuat?: string;
  status?: string;
  totalNominal?: number;
};

export default function Bookkeeping() {
  // Load purchaseOrders and derive expense entries from received POs only
  const purchaseOrders = loadJSON<any[]>("purchaseOrders", []);
  const receivedPOs: POView[] = purchaseOrders
    .filter((p) => p && p.status === "received" && (p.totalNominal || 0) > 0)
    .map((p) => ({
      id: p.id,
      poNumber: p.poNumber,
      tanggalDibuat: p.tanggalDibuat,
      status: p.status,
      totalNominal: p.totalNominal,
    }));

  const totalExpense = receivedPOs.reduce(
    (s, p) => s + (p.totalNominal || 0),
    0
  );

  return (
    <div className="p-4 bg-white border rounded">
      <h3 className="text-lg font-semibold mb-3">
        Keuangan (Pengeluaran dari PO)
      </h3>
      <div className="mb-3">
        Total Pengeluaran (PO diterima):{" "}
        <strong>Rp {totalExpense.toLocaleString("id-ID")}</strong>
      </div>

      <div className="overflow-auto border rounded">
        <table className="min-w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2">PO Number</th>
              <th className="p-2">Tanggal PO</th>
              <th className="p-2">Status</th>
              <th className="p-2">Jumlah (Rp)</th>
            </tr>
          </thead>
          <tbody>
            {receivedPOs.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.poNumber}</td>
                <td className="p-2">{p.tanggalDibuat}</td>
                <td className="p-2">{p.status}</td>
                <td className="p-2">
                  {(p.totalNominal || 0).toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
            {receivedPOs.length === 0 && (
              <tr>
                <td className="p-2" colSpan={4}>
                  Belum ada pengeluaran dari PO yang diterima.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
