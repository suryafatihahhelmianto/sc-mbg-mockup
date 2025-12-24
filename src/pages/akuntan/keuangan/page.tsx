"use client";

import React from "react";
import Bookkeeping from "../../../components/akuntan/Bookkeeping";
import { Card, CardContent } from "../../../components/dapur/card";

export default function KeuanganPage() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl">
        <Card>
          <CardContent>
            <Bookkeeping />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
