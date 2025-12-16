"use client";

import React, { useState } from "react";
import { Button } from "../../components/dapur/button";
import { calcRequirements, RequirementLine } from "../../lib/po-calculator";
import { sampleMenus } from "../../lib/sample-data";
import { saveJSON, loadJSON } from "../../lib/storage";

type KitchenOrder = {
  id: string;
  menuName: string;
  itemsCount: number;
  note?: string;
};

type PO = {
  id: number;
  poNumber: string;
  menuId?: string | number;
  status: string;
  tanggalDibuat: string;
  itemsCount: number;
  totalNominal?: number;
  lines?: RequirementLine[];
};

type Props = {
  onCreatePO: (po: PO) => void;
};

const sampleOrders: KitchenOrder[] = [
  { id: "o1", menuName: "Nasi + Ayam", itemsCount: 40 },
  { id: "o2", menuName: "Bubur Sayur", itemsCount: 30 },
  { id: "o3", menuName: "Snack", itemsCount: 20 },
];

export default function OrderToPO({ onCreatePO }: Props) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [targetDate, setTargetDate] = useState<string>(() => {
    // default to next Monday
    const d = new Date();
    const day = d.getDay();
    const daysUntilMonday = (8 - day) % 7 || 7;
    d.setDate(d.getDate() + daysUntilMonday);
    return d.toISOString().slice(0, 10);
  });

  function toggle(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }

  function createPO() {
    const chosen = sampleOrders.filter((o) => selected[o.id]);
    if (chosen.length === 0)
      return alert("Pilih setidaknya 1 pesanan dari dapur");

    const id = Date.now();
    const itemsCount = chosen.reduce((s, c) => s + c.itemsCount, 0);
    // Build requirement lines by aggregating each chosen order's menu (if available)
    // For demo we find a menu by name in sampleMenus; otherwise no lines.
    let lines: RequirementLine[] = [];
    for (const order of chosen) {
      const menu = sampleMenus.find((m) => m.name === order.menuName);
      if (menu) {
        // convert itemsCount into a single recipient group
        const recs = [{ id: "r_auto", name: "Umum", count: order.itemsCount }];
        const l = calcRequirements(menu, recs);
        // merge into lines
        for (const li of l) {
          const exist = lines.find((x) => x.ingredientId === li.ingredientId);
          if (exist) {
            exist.totalGram += li.totalGram;
            exist.totalKg = Math.round((exist.totalGram / 1000) * 100) / 100;
          } else {
            lines.push({ ...li });
          }
        }
      }
    }

    // compute nominal using current stock prices (pricePerKg or pricePerGram)
    const currentStock = loadJSON<
      {
        id: string;
        pricePerKg?: number;
        pricePerGram?: number;
      }[]
    >("stock", []);

    // ensure totalKg is set for each line
    for (const li of lines) {
      li.totalKg = Math.round((li.totalGram / 1000) * 100) / 100;
    }

    // validate that every ingredient used has a price defined
    const missingPrices: string[] = [];
    for (const li of lines) {
      const s = currentStock.find((x) => x.id === li.ingredientId);
      const hasPrice = !!(
        s &&
        ((s.pricePerKg ?? 0) > 0 || (s.pricePerGram ?? 0) > 0)
      );
      if (!hasPrice) missingPrices.push(li.ingredientName);
    }
    if (missingPrices.length > 0) {
      alert(
        `Tidak dapat membuat PO. Isi harga untuk bahan berikut di halaman Stock terlebih dahulu:\n- ${missingPrices.join(
          "\n- "
        )}`
      );
      return;
    }

    const totalNominal = lines.reduce((sum, li) => {
      const s = currentStock.find((x) => x.id === li.ingredientId);
      const price =
        s?.pricePerKg ?? (s?.pricePerGram ? s.pricePerGram * 1000 : 0);
      return sum + (li.totalKg || 0) * price;
    }, 0);

    const po: PO = {
      id,
      poNumber: `PO-${new Date().toISOString().slice(0, 10)}-${String(id).slice(
        -4
      )}`,
      menuId: undefined,
      status: "draft",
      tanggalDibuat: new Date().toISOString().slice(0, 10),
      targetDate,
      itemsCount,
      totalNominal: Math.round(totalNominal),
      lines,
    };

    // persist to localStorage
    const existing = loadJSON<PO[]>("purchaseOrders", []);
    saveJSON("purchaseOrders", [po, ...existing]);

    // create bookkeeping entry for PO created (credit / liability)
    if (po.totalNominal && po.totalNominal > 0) {
      const entries = loadJSON<
        { id: number; date: string; description: string; amount: number }[]
      >("bookkeepingEntries", []);
      const entry = {
        id: Date.now() + 1,
        date: new Date().toISOString().slice(0, 10),
        description: `PO dibuat ${po.poNumber}`,
        amount: Math.round(po.totalNominal), // positive = credit (liability)
      };
      saveJSON("bookkeepingEntries", [entry, ...entries]);
    }

    onCreatePO(po);
    setSelected({});
  }

  return (
    <div className="p-4 bg-white border rounded">
      <h3 className="text-lg font-semibold mb-3">Pesanan dari Dapur</h3>
      <div className="mb-3">
        <label className="block text-sm mb-1">
          Tanggal Menu (target menu date)
        </label>
        <input
          type="date"
          className="border p-2 rounded"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />
        <div className="text-xs text-slate-500 mt-1">
          PO akan dijadwalkan berdasarkan tanggal menu ini (PO disarankan
          dikirim 3 hari sebelum)
        </div>
      </div>
      <div className="space-y-2">
        {sampleOrders.map((o) => (
          <div key={o.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{o.menuName}</div>
              <div className="text-sm text-slate-500">
                Jumlah penerima: {o.itemsCount}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Pilih</label>
              <input
                type="checkbox"
                checked={!!selected[o.id]}
                onChange={() => toggle(o.id)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button variant="primary" onClick={createPO}>
          Buat PO dari Pesanan
        </Button>
      </div>
    </div>
  );
}
