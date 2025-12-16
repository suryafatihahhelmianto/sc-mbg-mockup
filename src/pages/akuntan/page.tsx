"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/dapur/card";
import { loadJSON, saveJSON } from "../../lib/storage";
import TaskBoard, { Task } from "../../components/akuntan/TaskBoard";
import { RequirementLine } from "../../lib/po-calculator";
import { Button } from "../../components/dapur/button";
import {
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaBoxOpen,
  FaCalendarAlt,
  FaClock,
  FaExclamationCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaShoppingCart,
  FaChartLine,
  FaDollarSign,
  FaWarehouse,
  FaReceipt,
  FaTruck,
  FaBoxes,
} from "react-icons/fa";

type PO = {
  id: number;
  poNumber: string;
  status: "draft" | "sent" | "received" | "rejected";
  tanggalDibuat: string;
  itemsCount: number;
  totalNominal?: number;
  lines?: RequirementLine[];
  targetDate?: string;
  supplier?: string;
  menuSource?: string;
};

export default function AkuntanPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<PO[]>(() =>
    loadJSON<PO[]>("purchaseOrders", [
      {
        id: 1,
        poNumber: "PO-2024-001",
        status: "sent",
        tanggalDibuat: "2024-12-10",
        itemsCount: 5,
        totalNominal: 1250000,
        targetDate: "2024-12-15",
        supplier: "Supplier A",
        menuSource: "Menu MBG Minggu 50",
      },
      {
        id: 2,
        poNumber: "PO-2024-002",
        status: "draft",
        tanggalDibuat: "2024-12-11",
        itemsCount: 3,
        totalNominal: 850000,
        targetDate: "2024-12-16",
        supplier: "Supplier B",
        menuSource: "Menu MBG Minggu 50",
      },
      {
        id: 3,
        poNumber: "PO-2024-003",
        status: "received",
        tanggalDibuat: "2024-12-05",
        itemsCount: 8,
        totalNominal: 2100000,
        targetDate: "2024-12-08",
        supplier: "Supplier C",
        menuSource: "Menu MBG Minggu 49",
      },
    ])
  );

  const [completedTasks, setCompletedTasks] = useState<string[]>(() =>
    loadJSON<string[]>("completedTasks", [])
  );

  useEffect(() => {
    saveJSON("purchaseOrders", purchaseOrders);
  }, [purchaseOrders]);

  useEffect(() => {
    saveJSON("completedTasks", completedTasks);
  }, [completedTasks]);

  // Dashboard summary
  const totalPO = purchaseOrders.length;
  const draftPO = purchaseOrders.filter((p) => p.status === "draft").length;
  const sentPO = purchaseOrders.filter((p) => p.status === "sent").length;
  const receivedPO = purchaseOrders.filter(
    (p) => p.status === "received"
  ).length;
  const rejectedPO = purchaseOrders.filter(
    (p) => p.status === "rejected"
  ).length;

  const totalNominal = purchaseOrders.reduce(
    (sum, po) => sum + (po.totalNominal || 0),
    0
  );
  const pendingNominal = purchaseOrders
    .filter((p) => p.status === "draft" || p.status === "sent")
    .reduce((sum, po) => sum + (po.totalNominal || 0), 0);

  // Status color mapping
  const statusConfig = {
    draft: {
      color: "bg-gray-100 text-gray-800",
      icon: <FaClock className="text-gray-500" />,
    },
    sent: {
      color: "bg-blue-100 text-blue-800",
      icon: <FaTruck className="text-blue-500" />,
    },
    received: {
      color: "bg-green-100 text-green-800",
      icon: <FaCheckCircle className="text-green-500" />,
    },
    rejected: {
      color: "bg-red-100 text-red-800",
      icon: <FaTimesCircle className="text-red-500" />,
    },
  };

  // Quick actions
  const quickActions = [
    {
      icon: <FaFileInvoiceDollar />,
      label: "Buat PO Baru",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      link: "/akuntan/order-to-po",
    },
    {
      icon: <FaMoneyBillWave />,
      label: "Catat Pengeluaran",
      color: "bg-gradient-to-r from-emerald-500 to-green-500",
      link: "/akuntan/catat-pengeluaran",
    },
    {
      icon: <FaClipboardCheck />,
      label: "Konfirmasi PO",
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
      link: "/akuntan/konfirmasi-po",
    },
    {
      icon: <FaBoxOpen />,
      label: "Status Barang",
      color: "bg-gradient-to-r from-purple-500 to-violet-500",
      link: "/akuntan/status-barang",
    },
  ];

  // Recent POs
  const recentPOs = purchaseOrders.slice(0, 4);

  // Upcoming deadlines (within 3 days)
  const today = new Date();
  const upcomingDeadlines = purchaseOrders
    .filter((po) => {
      if (
        !po.targetDate ||
        po.status === "received" ||
        po.status === "rejected"
      )
        return false;
      const targetDate = new Date(po.targetDate);
      const diffDays = Math.ceil(
        (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      return diffDays >= 0 && diffDays <= 3;
    })
    .slice(0, 3);

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dashboard Akuntan MBG
            </h1>
            <p className="text-gray-600 mt-1 flex items-center gap-2 text-sm">
              <FaReceipt className="text-blue-500" />
              Manajemen Purchase Order & Pengeluaran Dapur
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, idx) => (
              <a
                key={idx}
                href={action.link}
                className={`flex items-center gap-2 px-3 py-2 ${action.color} text-white rounded-lg shadow hover:shadow-md transition-all duration-200`}
              >
                {action.icon}
                <span className="text-sm font-medium">{action.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Purchase Order</p>
                <p className="text-2xl font-bold text-gray-900">{totalPO}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaFileInvoiceDollar className="text-2xl text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-gray-500">Pending: {draftPO + sentPO}</span>
              <a
                href="/akuntan/order-to-po"
                className="text-blue-600 hover:text-blue-700"
              >
                Lihat semua →
              </a>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Pengeluaran</p>
                <p className="text-2xl font-bold text-gray-900">
                  Rp {totalNominal.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FaMoneyBillWave className="text-2xl text-emerald-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-gray-500">
                Pending: Rp {pendingNominal.toLocaleString("id-ID")}
              </span>
              <a
                href="/akuntan/catat-pengeluaran"
                className="text-emerald-600 hover:text-emerald-700"
              >
                Catat →
              </a>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">PO Diterima</p>
                <p className="text-2xl font-bold text-gray-900">{receivedPO}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <FaCheckCircle className="text-2xl text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-gray-500">Rejected: {rejectedPO}</span>
              <a
                href="/akuntan/konfirmasi-po"
                className="text-green-600 hover:text-green-700"
              >
                Konfirmasi →
              </a>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Status Barang</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sentPO} on delivery
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FaBoxes className="text-2xl text-purple-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-gray-500">Draft: {draftPO}</span>
              <a
                href="/akuntan/status-barang"
                className="text-purple-600 hover:text-purple-700"
              >
                Cek status →
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent POs */}
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <FaShoppingCart className="text-blue-500" />
                Purchase Order Terbaru
              </h3>
              <a
                href="/akuntan/order-to-po"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Lihat semua →
              </a>
            </div>

            <div className="space-y-3">
              {recentPOs.map((po) => (
                <div
                  key={po.id}
                  className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium text-gray-900">
                        {po.poNumber}
                      </div>
                      <div className="text-xs text-gray-500">
                        {po.supplier || "No supplier"}
                      </div>
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                        statusConfig[po.status].color
                      }`}
                    >
                      {statusConfig[po.status].icon}
                      {po.status === "draft"
                        ? "Draft"
                        : po.status === "sent"
                        ? "Terkirim"
                        : po.status === "received"
                        ? "Diterima"
                        : "Ditolak"}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">{po.itemsCount} item</div>
                    <div className="font-semibold">
                      Rp {po.totalNominal?.toLocaleString("id-ID") || "0"}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>{po.tanggalDibuat}</span>
                    </div>
                    {po.targetDate && (
                      <div className="flex items-center gap-1">
                        <FaClock />
                        <span>Target: {po.targetDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <a
                href="/akuntan/order-to-po"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaFileInvoiceDollar />
                Buat PO Baru dari Pengajuan Menu
              </a>
            </div>
          </div>

          {/* Upcoming Deadlines & Quick Actions */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <div className="glass-card p-4 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <FaClock className="text-amber-500" />
                  Deadline Mendatang
                </h3>
                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                  {upcomingDeadlines.length} deadline
                </span>
              </div>

              {upcomingDeadlines.length > 0 ? (
                <div className="space-y-2">
                  {upcomingDeadlines.map((po) => {
                    const targetDate = new Date(po.targetDate || "");
                    const diffDays = Math.ceil(
                      (targetDate.getTime() - today.getTime()) /
                        (1000 * 60 * 60 * 24)
                    );

                    return (
                      <div
                        key={po.id}
                        className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium">{po.poNumber}</div>
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              diffDays === 0
                                ? "bg-red-100 text-red-700"
                                : diffDays <= 1
                                ? "bg-orange-100 text-orange-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {diffDays === 0
                              ? "Hari ini"
                              : `${diffDays} hari lagi`}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {po.supplier || "No supplier"}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span>Target: {po.targetDate}</span>
                          <span className="font-semibold">
                            Rp {po.totalNominal?.toLocaleString("id-ID") || "0"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <FaCheckCircle className="mx-auto text-green-500 text-2xl mb-2" />
                  <p className="text-sm">Tidak ada deadline mendatang</p>
                </div>
              )}
            </div>

            {/* Quick Actions Panel */}
            <div className="glass-card p-4 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaChartLine className="text-emerald-500" />
                Tindakan Cepat
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="/akuntan/order-to-po?action=create"
                  className="p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex flex-col items-center justify-center text-center"
                >
                  <FaFileInvoiceDollar className="text-blue-600 text-xl mb-2" />
                  <span className="text-sm font-medium">Buat PO</span>
                  <span className="text-xs text-gray-600">
                    Dari pengajuan menu
                  </span>
                </a>

                <a
                  href="/akuntan/catat-pengeluaran"
                  className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors flex flex-col items-center justify-center text-center"
                >
                  <FaMoneyBillWave className="text-emerald-600 text-xl mb-2" />
                  <span className="text-sm font-medium">Catat Pengeluaran</span>
                  <span className="text-xs text-gray-600">Input biaya PO</span>
                </a>

                <a
                  href="/akuntan/konfirmasi-po"
                  className="p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors flex flex-col items-center justify-center text-center"
                >
                  <FaClipboardCheck className="text-amber-600 text-xl mb-2" />
                  <span className="text-sm font-medium">Konfirmasi PO</span>
                  <span className="text-xs text-gray-600">
                    Barang diterima/ditolak
                  </span>
                </a>

                <a
                  href="/akuntan/status-barang"
                  className="p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors flex flex-col items-center justify-center text-center"
                >
                  <FaBoxOpen className="text-purple-600 text-xl mb-2" />
                  <span className="text-sm font-medium">Status Barang</span>
                  <span className="text-xs text-gray-600">
                    Tracking pengiriman
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="glass-card p-4 rounded-xl">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaReceipt className="text-gray-600" />
            Aktivitas Terbaru
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <FaCheckCircle className="text-green-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">PO-2024-003 diterima</p>
                <p className="text-xs text-gray-500">
                  2 jam yang lalu • Rp 2.100.000
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <FaTruck className="text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  PO-2024-001 dikirim ke supplier
                </p>
                <p className="text-xs text-gray-500">
                  1 hari yang lalu • Rp 1.250.000
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <FaFileInvoiceDollar className="text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  PO baru dibuat dari menu MBG Minggu 50
                </p>
                <p className="text-xs text-gray-500">
                  2 hari yang lalu • Rp 850.000
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <FaExclamationCircle className="text-red-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  PO-2024-004 ditolak - barang tidak sesuai
                </p>
                <p className="text-xs text-gray-500">
                  3 hari yang lalu • Rp 450.000
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <FaFileInvoiceDollar className="text-blue-600" />
              Proses PO
            </h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
                Buat PO dari pengajuan menu dapur
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
                Input harga per item sesuai invoice
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
                Kirim PO ke supplier
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4">
            <h4 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
              <FaMoneyBillWave className="text-emerald-600" />
              Pencatatan
            </h4>
            <ul className="space-y-2 text-sm text-emerald-800">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
                Catat pengeluaran ketika PO dibuat
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
                Update saat PO diterima/ditolak
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
                Generate laporan keuangan periodik
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
            <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
              <FaClipboardCheck className="text-amber-600" />
              Konfirmasi
            </h4>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
                Konfirmasi barang sesuai kuantitas
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
                Verifikasi kualitas dan spesifikasi
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
                Update status PO dan stok
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
