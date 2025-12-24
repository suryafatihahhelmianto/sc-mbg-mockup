"use client";

import {
  FiHome,
  FiBox,
  FiTruck,
  FiUsers,
  FiBarChart,
  FiSettings,
} from "react-icons/fi";
import { FaUtensils, FaCalculator, FaUserCheck } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({
  isOpen,
  setIsOpen,
  currentPage,
  setCurrentPage,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: FaUtensils, label: "Dapur", id: "dapur", path: "/dapur" },
    { icon: FaCalculator, label: "Akuntan", id: "akuntan", path: "/akuntan" },
    { icon: FiTruck, label: "Aslap", id: "aslap", path: "/aslap" },
    {
      icon: FaUserCheck,
      label: "Penerima Manfaat",
      id: "penerima-manfaat",
      path: "/penerima-manfaat",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 bg-gradient-to-b from-white/90 to-cyan-50/90 backdrop-blur-xl border-r border-white/60 flex flex-col p-4 overflow-y-auto shadow-sm`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center mb-8 h-12">
        <div
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          onClick={() => {
            navigate("/");
            setCurrentPage("dashboard");
          }}
        >
          M
        </div>
        {isOpen && (
          <span
            className="ml-3 font-bold text-slate-800 text-lg cursor-pointer"
            onClick={() => {
              navigate("/");
              setCurrentPage("dashboard");
            }}
          >
            MBG
          </span>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              navigate(item.path);
              setCurrentPage(item.id);
            }}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
              isActive(item.path)
                ? "bg-gradient-to-r from-cyan-400/30 to-teal-400/30 text-teal-700 border border-teal-200/50"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            <item.icon
              className={`w-5 h-5 flex-shrink-0 transition-colors ${
                isActive(item.path)
                  ? "text-teal-600"
                  : "group-hover:text-teal-600"
              }`}
            />
            {isOpen && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Settings */}
      <button
        onClick={() => navigate("/pengaturan")}
        className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-slate-600 hover:text-slate-900 transition-all duration-200 hover:bg-white/60 group mt-auto"
      >
        <FiSettings className="w-5 h-5 flex-shrink-0 group-hover:text-teal-600 transition-colors" />
        {isOpen && <span className="text-sm font-medium">Pengaturan</span>}
      </button>
    </div>
  );
}
