"use client";

import type React from "react";
import { Button } from "./button";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSave?: () => void;
  saveText?: string;
}

export function Modal({
  isOpen,
  title,
  children,
  onClose,
  onSave,
  saveText = "Simpan",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 sticky bottom-0 bg-white">
          <Button variant="ghost" onClick={onClose}>
            Batal
          </Button>
          {onSave && (
            <Button variant="primary" onClick={onSave}>
              {saveText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
