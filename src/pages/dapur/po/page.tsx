"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../../../components/dapur/card";
import { Button } from "../../../components/dapur/button";
import { Input } from "../../../components/dapur/input";
import { Modal } from "../../../components/dapur/modal";
import { Badge } from "../../../components/dapur/badge";

export default function POPage() {
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: 1,
      poNumber: "PO-20250106-5432",
      menuId: 1,
      status: "draft" as const,
      tanggalDibuat: "2025-01-06",
      itemsCount: 15,
      totalNominal: 0,
    },
  ]);

  const [showGenerator, setShowGenerator] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPOs = purchaseOrders.filter(
    (po) =>
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.menuId.toString().includes(searchTerm)
  );

  const handleDeletePO = (id: number) => {
    setPurchaseOrders(purchaseOrders.filter((po) => po.id !== id));
  };

  const getStatusBadgeVariant = (
    status: string
  ): "default" | "success" | "warning" | "danger" | "info" => {
    const map: Record<
      string,
      "default" | "success" | "warning" | "danger" | "info"
    > = {
      submitted: "info",
      approved: "success",
      completed: "default",
      draft: "warning",
    };
    return map[status] || "default";
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      draft: "Draft",
      submitted: "Diajukan",
      approved: "Disetujui",
      completed: "Selesai",
    };
    return labels[status] || status;
  };

  const getTotalNominal = () =>
    purchaseOrders.reduce((sum, po) => sum + (po.totalNominal || 0), 0);

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link
                to="/dapur"
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ←
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Purchase Order
              </h1>
            </div>
            <p className="text-gray-600">
              Kelola purchase order untuk stock bahan baku
            </p>
          </div>
          <Button variant="primary" onClick={() => setShowGenerator(true)}>
            + Generate PO Baru
          </Button>
        </div>

        {/* Info Box */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <p className="text-green-900 font-bold mb-2">Cara Kerja PO</p>
          <ul className="space-y-1 text-sm text-green-800">
            <li>• Pilih menu dan menu khusus yang ingin di-PO</li>
            <li>
              • Sistem otomatis menghitung kebutuhan bahan dari recipe database
            </li>
            <li>
              • Setiap item dapat disesuaikan secara manual jika diperlukan
            </li>
            <li>• PO siap diajukan ke supplier setelah verifikasi</li>
          </ul>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-600 text-sm font-medium mb-2">Total PO</p>
              <p className="text-3xl font-bold text-gray-900">
                {purchaseOrders.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-600 text-sm font-medium mb-2">Draft</p>
              <p className="text-3xl font-bold text-yellow-600">
                {purchaseOrders.filter((po) => po.status === "draft").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-600 text-sm font-medium mb-2">
                Nominal Total
              </p>
              <p className="text-3xl font-bold text-gray-900">
                Rp {getTotalNominal().toLocaleString("id-ID")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Input
          type="text"
          placeholder="Cari PO atau Menu ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* PO List */}
        <div className="space-y-4">
          {filteredPOs.length > 0 ? (
            filteredPOs.map((po) => (
              <Card key={po.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {po.poNumber}
                        </h3>
                        <Badge variant={getStatusBadgeVariant(po.status)}>
                          {getStatusLabel(po.status)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Menu ID:</span>{" "}
                          {po.menuId}
                        </div>
                        <div>
                          <span className="font-medium">Items:</span>{" "}
                          {po.itemsCount}
                        </div>
                        <div>
                          <span className="font-medium">Tanggal:</span>{" "}
                          {new Date(po.tanggalDibuat).toLocaleDateString(
                            "id-ID"
                          )}
                        </div>
                      </div>
                      {po.totalNominal > 0 && (
                        <div className="mt-3 text-lg font-bold text-gray-900">
                          Rp {po.totalNominal.toLocaleString("id-ID")}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Detail
                      </Button>
                      <Button variant="ghost" size="sm">
                        Export
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeletePO(po.id)}
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500 mb-4">Belum ada purchase order</p>
              <Button variant="primary" onClick={() => setShowGenerator(true)}>
                Generate PO Pertama
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Generator Modal */}
      <Modal
        isOpen={showGenerator}
        title="Generate PO Baru"
        onClose={() => setShowGenerator(false)}
        onSave={() => {}}
      >
        <p className="text-gray-600">
          Form generator PO akan ditampilkan di sini
        </p>
      </Modal>
    </div>
  );
}
