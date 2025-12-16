"use client";

import React, { useState } from "react";
import StockManager, {
  StockItem,
} from "../../../components/akuntan/StockManager";
import { Card, CardContent } from "../../../components/dapur/card";
import { loadJSON, saveJSON } from "../../../lib/storage";

export default function StockPage() {
  const [stock, setStock] = useState<StockItem[]>(() =>
    loadJSON<StockItem[]>("stock", [
      { id: "beras", name: "Beras", qtyGram: 50000 },
      { id: "ayam", name: "Ayam Fillet", qtyGram: 10000 },
    ])
  );

  function handleAdjustStock(item: StockItem) {
    const updated = stock.map((s) =>
      s.id === item.id
        ? {
            ...s,
            qtyGram: item.qtyGram,
            pricePerKg: item.pricePerKg ?? s.pricePerKg,
            pricePerGram: item.pricePerGram ?? s.pricePerGram,
          }
        : s
    );
    setStock(updated);
    saveJSON("stock", updated);
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl">
        <Card>
          <CardContent>
            <StockManager
              stock={stock}
              onConfirmReceive={(poId, increases) => {}}
              onAdjustStock={handleAdjustStock}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
