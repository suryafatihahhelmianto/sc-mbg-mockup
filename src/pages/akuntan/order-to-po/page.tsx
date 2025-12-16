"use client";

import React from "react";
import OrderToPO from "../../../components/akuntan/OrderToPO";
import { Card, CardContent } from "../../../components/dapur/card";

export default function OrderToPOPage() {
  function handleCreatePO(po: any) {
    // navigation handled by router; OrderToPO already persists to localStorage
    console.log("PO created", po);
    alert("PO dibuat. Cek daftar PO di dashboard atau halaman PO.");
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl">
        <Card>
          <CardContent>
            <OrderToPO onCreatePO={handleCreatePO} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
