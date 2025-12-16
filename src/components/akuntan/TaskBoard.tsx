"use client";

import React from "react";
import { Button } from "../../components/dapur/button";

export type Task = {
  id: string | number;
  type: "send_po" | "verify_stock";
  poId?: number;
  title: string;
  dueDate: string; // yyyy-mm-dd
  status: "pending" | "done";
};

type Props = {
  tasks: Task[];
  onMarkDone: (taskId: string | number) => void;
};

export default function TaskBoard({ tasks, onMarkDone }: Props) {
  // group by dueDate
  const byDate: Record<string, Task[]> = {};
  tasks.forEach((t) => {
    byDate[t.dueDate] = byDate[t.dueDate] || [];
    byDate[t.dueDate].push(t);
  });

  const dates = Object.keys(byDate).sort();

  return (
    <div className="p-4 bg-white border rounded">
      <h3 className="text-lg font-semibold mb-3">Task Board (Mission-based)</h3>
      {dates.length === 0 && (
        <div className="text-sm text-slate-500">Tidak ada tugas terjadwal</div>
      )}
      <div className="space-y-4">
        {dates.map((date) => (
          <div key={date} className="border rounded p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">
                {new Date(date).toLocaleDateString("id-ID")}
              </div>
              <div className="text-sm text-slate-500">
                {byDate[date].length} tugas
              </div>
            </div>
            <div className="space-y-2">
              {byDate[date].map((t) => (
                <div key={t.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-sm text-slate-500">Tipe: {t.type}</div>
                  </div>
                  <div>
                    {t.status === "pending" ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onMarkDone(t.id)}
                      >
                        Tandai Selesai
                      </Button>
                    ) : (
                      <span className="text-sm text-green-600 font-semibold">
                        Selesai
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
