"use client";

import React from "react";
import { Button } from "../../components/dapur/button";

export type StockItem = {
  id: string;
  name: string;
  qtyGram: number;
  pricePerKg?: number; // in local currency per kg
  pricePerGram?: number; // in local currency per gram
};

type Props = {
  stock: StockItem[];
  onConfirmReceive: (
    poId: number,
    increases: { ingredientId: string; gram: number }[]
  ) => void;
  onAdjustStock: (item: StockItem) => void;
};

export default function StockManager({
  stock,
  onConfirmReceive,
  onAdjustStock,
}: Props) {
  return (
    <div className="p-4 bg-white border rounded">
      <h3 className="text-lg font-semibold mb-3">Manajemen Stock</h3>
      <div className="overflow-auto border rounded">
        <table className="min-w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2">Bahan</th>
              <th className="p-2">Qty (gram)</th>
              <th className="p-2">Harga / kg</th>
              <th className="p-2">Harga / gram</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.name}</td>
                <td className="p-2">{s.qtyGram}</td>
                <td className="p-2">
                  <input
                    type="number"
                    className="border p-1 rounded w-28"
                    value={s.pricePerKg ?? 0}
                    onChange={(e) => {
                      const price = Number(e.target.value || 0);
                      // keep pricePerGram in sync
                      const gram = price
                        ? Math.round((price / 1000) * 100000) / 100000
                        : undefined;
                      onAdjustStock({
                        ...s,
                        pricePerKg: price,
                        pricePerGram: gram,
                      });
                    }}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    className="border p-1 rounded w-28"
                    value={s.pricePerGram ?? 0}
                    onChange={(e) => {
                      const pg = Number(e.target.value || 0);
                      const pk = pg ? Math.round(pg * 1000) : undefined;
                      onAdjustStock({ ...s, pricePerGram: pg, pricePerKg: pk });
                    }}
                  />
                </td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        onAdjustStock({ ...s, qtyGram: s.qtyGram + 1000 })
                      }
                    >
                      +1kg
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        onAdjustStock({
                          ...s,
                          qtyGram: Math.max(0, s.qtyGram - 1000),
                        })
                      }
                    >
                      -1kg
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {stock.length === 0 && (
              <tr>
                <td className="p-2" colSpan={5}>
                  Stock kosong
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
