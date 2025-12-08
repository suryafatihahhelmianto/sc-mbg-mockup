"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

function cloneDate(d: Date) {
  return new Date(d.getTime());
}

// get Monday for a date's week (Monday as day 1). If date is Sunday -> Monday of previous week.
function getMonday(date: Date) {
  const d = cloneDate(date);
  const day = d.getDay(); // 0..6 (Sun..Sat)
  const diff = (day === 0 ? -6 : 1) - day; // shift to Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

// get Monday and Saturday for a week that includes 'date'
function getWeekRangeFromDate(date: Date) {
  const monday = getMonday(date);
  const saturday = cloneDate(monday);
  saturday.setDate(monday.getDate() + 5);
  return { start: monday, end: saturday };
}

// returns array of weeks for the month: each is { week: number(1..n), start: Date, end: Date }
// Weeks are defined as Monday..Saturday blocks that cover the month; first week is the block that contains day 1.
function getWeeksInMonth(year: number, monthZeroBased: number) {
  // monthZeroBased: 0..11
  const weeks: { week: number; start: Date; end: Date }[] = [];

  // start from the month's 1st date
  const firstOfMonth = new Date(year, monthZeroBased, 1);
  // find the Monday that contains day 1's week (may be previous month)
  const firstWeekMonday = getMonday(firstOfMonth);

  // iterate week by week until we pass the month
  let curMonday = cloneDate(firstWeekMonday);
  let weekIdx = 1;
  while (true) {
    const curSaturday = cloneDate(curMonday);
    curSaturday.setDate(curMonday.getDate() + 5);

    weeks.push({
      week: weekIdx,
      start: cloneDate(curMonday),
      end: cloneDate(curSaturday),
    });

    // stop when the Monday is after the month (i.e., first day of next month is <= curMonday)
    const nextMonday = cloneDate(curMonday);
    nextMonday.setDate(curMonday.getDate() + 7);

    // If nextMonday's month is beyond the target month and current week's start is already beyond month end, break.
    if (
      nextMonday.getMonth() > monthZeroBased &&
      nextMonday.getFullYear() >= year
    ) {
      // but ensure we've covered weeks that still include days of the month
      // We'll break after pushing the week that contains the last day of the month.
      const lastOfMonth = new Date(year, monthZeroBased + 1, 0);
      if (curMonday > lastOfMonth) break;
    }

    // Safety stop: if more than 6 weeks, break (shouldn't happen)
    if (weekIdx > 6) break;

    curMonday = nextMonday;
    weekIdx++;
  }

  return weeks;
}

// format date ISO -> dd MMM yyyy (id-ID)
function formatDateLocalYMD(date: Date) {
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatISO(date: Date) {
  return date.toISOString().split("T")[0];
}

/* ---------------------------- Component ---------------------------- */

interface MenuFormProps {
  onSubmit: (data: {
    namaMenu: string;
    mingguKe: number;
    tahun: number;
    tanggalMulai: string;
    tanggalSelesai: string;
  }) => void;
  onCancel: () => void;
  initial?: Partial<{
    namaMenu: string;
    mingguKe: number;
    tahun: number;
    tanggalMulai: string;
    tanggalSelesai: string;
  }>;
}

export default function MenuFormGlass({
  onSubmit,
  onCancel,
  initial,
}: MenuFormProps) {
  const today = new Date();
  const defaultYear = today.getFullYear();
  const defaultMonth = today.getMonth(); // 0..11

  // UI month/year state (controls week list)
  const [viewYear, setViewYear] = useState<number>(
    initial?.tahun ?? defaultYear
  );
  const [viewMonth, setViewMonth] = useState<number>(
    initial?.tanggalMulai
      ? new Date(initial.tanggalMulai).getMonth()
      : defaultMonth
  );

  // compute weeks for the current view month
  const weeks = useMemo(
    () => getWeeksInMonth(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  // default week = week containing today (if same month viewed) or 1
  const todayWeekNum = (() => {
    if (viewYear === today.getFullYear() && viewMonth === today.getMonth()) {
      // find week index that contains today
      const w = weeks.find((w) => {
        const start = w.start;
        const end = w.end;
        return today >= start && today <= end;
      });
      return w ? w.week : 1;
    }
    return 1;
  })();

  // initial form data
  const [form, setForm] = useState({
    namaMenu:
      initial?.namaMenu ??
      `Menu Minggu ${initial?.mingguKe ?? todayWeekNum} - ${new Date(
        viewYear,
        viewMonth
      ).toLocaleString("id-ID", { month: "long" })} ${viewYear}`,
    mingguKe: initial?.mingguKe ?? todayWeekNum,
    tahun: initial?.tahun ?? viewYear,
    tanggalMulai:
      initial?.tanggalMulai ??
      formatISO(
        weeks.find((w) => w.week === (initial?.mingguKe ?? todayWeekNum))
          ?.start ?? getWeekRangeFromDate(today).start
      ),
    tanggalSelesai:
      initial?.tanggalSelesai ??
      formatISO(
        weeks.find((w) => w.week === (initial?.mingguKe ?? todayWeekNum))
          ?.end ?? getWeekRangeFromDate(today).end
      ),
  });

  // when view month or week changes, sync dates & autogenerated name (unless user edited name — we keep simple: always update name)
  useEffect(() => {
    const selectedWeek =
      weeks.find((w) => w.week === form.mingguKe) ?? weeks[0];
    if (selectedWeek) {
      setForm((prev) => ({
        ...prev,
        mingguKe: selectedWeek.week,
        tahun: viewYear,
        tanggalMulai: formatISO(selectedWeek.start),
        tanggalSelesai: formatISO(selectedWeek.end),
        namaMenu: `Menu Minggu ${selectedWeek.week} - ${new Date(
          viewYear,
          viewMonth
        ).toLocaleString("id-ID", { month: "long" })} ${viewYear}`,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMonth, viewYear, weeks]);

  // when user explicitly changes mingguKe (picker), update dates & name
  useEffect(() => {
    const selected = weeks.find((w) => w.week === form.mingguKe);
    if (selected) {
      setForm((prev) => ({
        ...prev,
        tanggalMulai: formatISO(selected.start),
        tanggalSelesai: formatISO(selected.end),
        namaMenu: `Menu Minggu ${selected.week} - ${new Date(
          viewYear,
          viewMonth
        ).toLocaleString("id-ID", { month: "long" })} ${viewYear}`,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.mingguKe]);

  // month navigation
  const goPrevMonth = () => {
    const d = new Date(viewYear, viewMonth - 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };
  const goNextMonth = () => {
    const d = new Date(viewYear, viewMonth + 1, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  // submit handler
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSubmit({
      namaMenu: form.namaMenu,
      mingguKe: form.mingguKe,
      tahun: form.tahun,
      tanggalMulai: form.tanggalMulai,
      tanggalSelesai: form.tanggalSelesai,
    });
  };

  // UI helpers
  const monthLabel = new Date(viewYear, viewMonth).toLocaleString("id-ID", {
    month: "long",
    year: "numeric",
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="
    max-w-xl mx-auto
    rounded-3xl p-8 space-y-6
    backdrop-blur-2xl
    bg-gradient-to-br from-teal-200/40 via-cyan-200/30 to-blue-200/20
    border border-white/30
    shadow-[0_8px_40px_rgba(16,185,129,0.25)]
    animate-fadeIn
  "
    >
      {/* Title */}
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-teal-900 tracking-tight">
          Buat Menu Mingguan
        </h2>
        <p className="text-teal-700/80 text-sm mt-1">
          Sistem otomatis menentukan minggu & tanggal
        </p>
      </div>

      {/* Nama Menu */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">
          Nama Menu
        </label>
        <Input
          type="text"
          placeholder="Contoh: Menu Minggu 1 - Januari 2025"
          value={form.namaMenu}
          onChange={(e) => setForm({ ...form, namaMenu: e.target.value })}
          className="
            bg-gradient-to-r from-white/40 to-white/20 
            border border-teal-300/40 
            focus:border-teal-500 focus:ring-2 focus:ring-teal-300 
            backdrop-blur-xl
          "
          required
        />
      </div>

      {/* Week Selector */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">
          Minggu Ke
        </label>
        <select
          value={form.mingguKe}
          onChange={(e) =>
            setForm((p) => ({ ...p, mingguKe: Number(e.target.value) }))
          }
          className="
            w-full px-3 py-2 rounded-lg text-sm
            bg-teal-600/30 text-teal-900
            backdrop-blur-xl
            border border-teal-400/40
            focus:border-teal-500 focus:ring-2 focus:ring-teal-300
            appearance-none
          "
        >
          {weeks.map((w) => (
            <option
              key={w.week}
              value={w.week}
              className="bg-teal-600 text-white"
            >
              Minggu {w.week} — {formatDateLocalYMD(w.start)} →{" "}
              {formatDateLocalYMD(w.end)}
            </option>
          ))}
        </select>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700">
            Tanggal Mulai
          </label>
          <Input
            type="date"
            value={form.tanggalMulai}
            onChange={(e) =>
              setForm((p) => ({ ...p, tanggalMulai: e.target.value }))
            }
            className="bg-white/50 border-white/40"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-slate-700">
            Tanggal Selesai
          </label>
          <Input
            type="date"
            value={form.tanggalSelesai}
            onChange={(e) =>
              setForm((p) => ({ ...p, tanggalSelesai: e.target.value }))
            }
            className="bg-white/50 border-white/40"
            required
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <Button
          variant="ghost"
          onClick={onCancel}
          className="backdrop-blur bg-white/40 hover:bg-white/60 text-slate-700"
        >
          Batal
        </Button>

        <Button
          variant="primary"
          type="submit"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-300/40"
        >
          Lanjut
        </Button>
      </div>
    </form>
  );
}
