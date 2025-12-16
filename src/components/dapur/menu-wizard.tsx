"use client";

import React, { useMemo, useState } from "react";
import {
  FaChevronRight,
  FaStar,
  FaLock,
  FaDrumstickBite,
  FaLeaf,
  FaAppleWhole,
  FaGlassWater,
  FaTriangleExclamation,
  FaSquareCheck,
  FaBowlRice,
} from "react-icons/fa6";

import { createPortal } from "react-dom";

import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Input } from "./input";
import { filterFoodSuggestions } from "../../lib/nutrition-data";
import {
  calculateNutritionFromFoods,
  validateNutrition,
  isNutritionMet,
} from "../../lib/nutrition-calculator";

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const CATEGORIES = [
  { key: "makananPokok", label: "Makanan Pokok (Karbo)", icon: FaBowlRice },
  { key: "protein", label: "Lauk Pauk (Protein)", icon: FaDrumstickBite },
  { key: "sayuran", label: "Sayuran", icon: FaLeaf },
  { key: "buah", label: "Buah-buahan", icon: FaAppleWhole },
  { key: "susu", label: "Susu/Minuman (Opsional)", icon: FaGlassWater },
];

type DayMenu = {
  makananPokok?: string;
  protein?: string;
  sayuran?: string;
  buah?: string;
  susu?: string;
};

type ValidationItem = { status: "good" | "low" | "high"; percentage: number };

type NutritionValidation = {
  calories: ValidationItem;
  protein: ValidationItem;
  carbs: ValidationItem;
  fat: ValidationItem;
  fiber: ValidationItem;
};

type WizardState = {
  currentDay: number;
  menus: Record<string, DayMenu>;
  completedDays: number[];
};

interface MenuWizardProps {
  onComplete: (menus: Record<string, DayMenu>) => void;
  onCancel: () => void;
  menuName: string;
}

export default function MenuWizard({
  onComplete,
  onCancel,
  menuName,
}: MenuWizardProps) {
  const [state, setState] = useState<WizardState>({
    currentDay: 0,
    menus: DAYS.reduce((acc, day) => ({ ...acc, [day]: {} }), {}),
    completedDays: [],
  });

  const [suggestions, setSuggestions] = useState<
    Record<string, { name: string; calories: number; protein: number }[]>
  >({});
  const [searchQuery, setSearchQuery] = useState<Record<string, string>>({});

  const currentDay = DAYS[state.currentDay];
  const currentMenu = state.menus[currentDay];

  // --- Search Handler ---
  const handleFoodSearch = (category: string, query: string) => {
    setSearchQuery((prev) => ({ ...prev, [category]: query }));
    if (!query.length) return setSuggestions((p) => ({ ...p, [category]: [] }));

    const filtered = filterFoodSuggestions(query, category as any);
    const mapped = filtered.map((f: any) => {
      const nut = calculateNutritionFromFoods({ [category]: f.name });
      return {
        name: f.name,
        calories: Math.round(nut.calories),
        protein: Math.round(nut.protein),
      };
    });

    setSuggestions((prev) => ({ ...prev, [category]: mapped }));
  };

  const handleSelectFood = (category: string, foodName: string) => {
    setState((prev) => ({
      ...prev,
      menus: {
        ...prev.menus,
        [currentDay]: {
          ...prev.menus[currentDay],
          [category]: foodName,
        },
      },
    }));
    setSearchQuery((prev) => ({ ...prev, [category]: "" }));
    setSuggestions((prev) => ({ ...prev, [category]: [] }));
  };

  const nutrition = useMemo(
    () => calculateNutritionFromFoods(currentMenu),
    [currentMenu]
  );
  const validation: NutritionValidation = useMemo(
    () => validateNutrition(nutrition) as any,
    [nutrition]
  );
  const isMet = isNutritionMet(validation);

  const handleNext = () => {
    if (state.currentDay < DAYS.length - 1) {
      setState((prev) => ({
        ...prev,
        currentDay: prev.currentDay + 1,
      }));
    }
  };

  const handleFinish = () => {
    if (state.completedDays.length === DAYS.length && isMet) {
      onComplete(state.menus);
    }
  };

  const valClass = (v: ValidationItem) =>
    v.status === "good"
      ? "bg-emerald-50 text-emerald-700"
      : v.status === "low"
      ? "bg-orange-50 text-orange-700"
      : "bg-red-50 text-red-700";

  const progressPercentage =
    ((state.completedDays.length + 1) / DAYS.length) * 100;

  // ############################################################
  // #####################   RENDER START  ######################
  // ############################################################
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* MODAL CONTAINER */}
      <div
        className="
          relative
          max-w-5xl w-full 
          max-h-[90vh]
          overflow-hidden
          rounded-2xl 
          shadow-[0_20px_60px_rgba(0,0,0,0.4)]
          bg-white/80 
          backdrop-blur-xl
          border border-white/20
          flex flex-col
          animate-fadeIn
        "
      >
        {/* HEADER */}
        <div
          className="
            px-6 py-5 
            bg-gradient-to-r from-teal-600 to-cyan-500
            text-white 
            flex items-center justify-between
            sticky top-0 z-20
          "
        >
          <div>
            <h2 className="text-2xl font-semibold">{menuName}</h2>
            <p className="text-sm text-teal-100/90">
              Buat menu mingguan — validasi gizi otomatis
            </p>
          </div>

          <button
            onClick={onCancel}
            className="px-3 py-1 rounded-md bg-white/20 hover:bg-white/30 transition"
          >
            Tutup
          </button>
        </div>

        {/* BODY */}
        <div
          className="
            flex-1 
            overflow-y-auto 
            px-6 py-6
            bg-gradient-to-b from-white/30 to-white/10
          "
        >
          {/* =========================================================
              TWO COLUMN BODY (LEFT MAIN + RIGHT STICKY PANEL)
          ========================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              {/* PROGRESS */}
              <div>
                <div className="text-sm text-slate-900 font-medium mb-2">
                  Progress
                </div>
                <div className="w-full bg-slate-500 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 via-emerald-400 to-green-500 transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="text-xs text-slate-900 mt-2">
                  {Math.round(progressPercentage)}% selesai
                </div>
              </div>

              {/* DAY SELECTOR PILLS */}
              <div className="flex gap-2 overflow-x-auto">
                {DAYS.map((day, idx) => {
                  const isCurr = idx === state.currentDay;
                  const done = state.completedDays.includes(idx);
                  return (
                    <button
                      key={day}
                      onClick={() =>
                        setState((p) => ({ ...p, currentDay: idx }))
                      }
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition
                        ${
                          isCurr
                            ? "bg-teal-600 text-white scale-105 shadow-lg"
                            : done
                            ? "bg-emerald-50 text-emerald-700"
                            : idx <= state.currentDay
                            ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            : "bg-slate-50 text-slate-400 cursor-not-allowed"
                        }
                      `}
                    >
                      {done ? (
                        <FaSquareCheck className="inline mr-1" />
                      ) : idx > state.currentDay ? (
                        <FaLock className="inline mr-1" />
                      ) : null}
                      {day}
                    </button>
                  );
                })}
              </div>

              <h3 className="text-lg font-bold text-slate-800 mt-4">
                Menu: <span className="text-teal-900">{currentDay}</span>
              </h3>

              {/* CATEGORY CARDS */}
              <div className="space-y-4">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const key = cat.key;

                  return (
                    <Card
                      key={key}
                      className="relative z-50 border border-teal-200/60 bg-white/80 backdrop-blur-lg rounded-xl"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <label className="flex items-center gap-3">
                              <span className="p-2 rounded-md bg-teal-50 text-teal-600">
                                <Icon />
                              </span>
                              <div>
                                <div className="font-semibold text-slate-800">
                                  {cat.label}
                                </div>
                                <div className="text-xs text-slate-500">
                                  Masukkan satu bahan utama
                                </div>
                              </div>
                            </label>

                            {/* Input */}
                            <div className="relative mt-3">
                              <Input
                                type="text"
                                placeholder={`Cari ${cat.label.toLowerCase()}...`}
                                value={
                                  searchQuery[key] ??
                                  currentMenu[key as keyof DayMenu] ??
                                  ""
                                }
                                onChange={(e) =>
                                  handleFoodSearch(key, e.target.value)
                                }
                                className="bg-white/80 border-teal-500/40 focus:border-teal-500"
                              />

                              {/* Dropdown */}
                              {suggestions[key] &&
                                suggestions[key].length > 0 && (
                                  <div
                                    className="absolute top-full left-0 right-0 mt-2
                                              bg-slate-50 
                                             border border-teal-300 rounded-lg
                                             shadow-xl z-[9999]
                                             max-h-56 overflow-y-auto"
                                  >
                                    {suggestions[key].map((s) => (
                                      <button
                                        key={s.name}
                                        onClick={() =>
                                          handleSelectFood(key, s.name)
                                        }
                                        className="w-full px-4 py-2 flex justify-between text-slate-700 hover:bg-teal-100"
                                      >
                                        <div className="text-sm text-slate-800">
                                          {s.name}
                                        </div>
                                        <div className="text-xs text-teal-700 font-semibold">
                                          {s.calories} kcal • {s.protein}g
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                )}
                            </div>

                            {currentMenu[key as keyof DayMenu] && (
                              <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 bg-teal-50 text-teal-800 rounded-lg">
                                <FaSquareCheck />
                                {currentMenu[key as keyof DayMenu]}
                              </div>
                            )}
                          </div>

                          {/* RIGHT PREVIEW */}
                          <div className="ml-2 hidden md:block w-40">
                            <div className="text-xs text-slate-500 mb-2">
                              Nilai Gizi
                            </div>
                            {(() => {
                              const sel =
                                currentMenu[key as keyof DayMenu] ?? null;
                              if (!sel)
                                return (
                                  <p className="text-xs text-slate-400">
                                    Belum dipilih
                                  </p>
                                );

                              const nut = calculateNutritionFromFoods({
                                [key]: sel,
                              });

                              return (
                                <div className="rounded-lg p-2 bg-teal-50 border border-teal-200">
                                  <div className="text-xs font-semibold text-teal-900">
                                    {sel}
                                  </div>
                                  <div className="text-sm mt-1 text-teal-800">
                                    {Math.round(nut.calories)} kcal
                                  </div>
                                  <div className="text-xs text-teal-700">
                                    Protein {Math.round(nut.protein)}g • Karbo{" "}
                                    {Math.round(nut.carbs)}g
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* RIGHT STICKY NUTRITION PANEL */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <Card className="p-4 bg-white/90 backdrop-blur-lg border border-teal-400 shadow-xl rounded-xl">
                  <h4 className="font-semibold text-slate-800">
                    Status Gizi Hari Ini
                  </h4>

                  <div className="text-xs text-slate-500 mt-1">Estimasi</div>

                  {/* Score */}
                  <div className="text-3xl font-bold text-emerald-600 mt-2">
                    {Math.round(
                      Math.min(
                        100,
                        (validation.calories.percentage +
                          validation.protein.percentage +
                          validation.carbs.percentage) /
                          3
                      )
                    )}
                  </div>

                  {/* Nutrient Grid */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {[
                      { label: "Kalori", key: "calories", unit: "kcal" },
                      { label: "Protein", key: "protein", unit: "g" },
                      { label: "Karbo", key: "carbs", unit: "g" },
                      { label: "Lemak", key: "fat", unit: "g" },
                    ].map((it) => {
                      const v = validation[it.key as keyof NutritionValidation];
                      return (
                        <div
                          key={it.key}
                          className={`p-3 rounded-lg ${valClass(v)}`}
                        >
                          <div className="text-xs">{it.label}</div>
                          <div className="text-lg font-semibold">
                            {Math.round(
                              nutrition[it.key as keyof typeof nutrition] ?? 0
                            )}
                          </div>
                          <div className="text-xs">{it.unit}</div>
                          <div className="text-xs mt-1">
                            ({Math.round(v.percentage)}%)
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Status Message */}
                  {!isMet ? (
                    <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg text-yellow-800 text-sm flex gap-2">
                      <FaTriangleExclamation className="mt-1" />
                      Perbaiki menu — belum memenuhi standar gizi.
                    </div>
                  ) : (
                    <div className="mt-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-lg text-sm flex gap-2">
                      <FaSquareCheck />
                      Menu hari ini sudah sesuai standar!
                    </div>
                  )}

                  {/* NAV BUTTONS */}
                  <div className="mt-6 flex gap-2">
                    <Button
                      onClick={() =>
                        setState((p) => ({
                          ...p,
                          currentDay: Math.max(0, p.currentDay - 1),
                        }))
                      }
                    >
                      ← Sebelumnya
                    </Button>

                    {state.currentDay < DAYS.length - 1 ? (
                      <Button disabled={!isMet} onClick={handleNext}>
                        Lanjut
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        disabled={!isMet}
                        onClick={handleFinish}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      >
                        Selesai <FaStar />
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-white/20 backdrop-blur-lg px-6 py-4 border-t border-white/20 text-sm text-slate-600 flex justify-between">
          <span>Pilih bahan lokal untuk nutrisi terbaik.</span>
          <span>© MBG Dapur</span>
        </div>
      </div>
    </div>
  );
}
