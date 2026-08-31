import React, { createContext, useContext, useState, useCallback } from "react";
import { posthog } from "@/providers/PostHogProvider";
import type { ProductFormat } from "@/lib/product-format";

interface OrderDialogContextType {
  isOpen: boolean;
  source: string | null;
  productFormat: ProductFormat;
  openOrderDialog: (source: string, label?: string, productFormat?: ProductFormat) => void;
  closeOrderDialog: () => void;
}

const OrderDialogContext = createContext<OrderDialogContextType | undefined>(undefined);

export function OrderDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [productFormat, setProductFormat] = useState<ProductFormat>('qr');

  const openOrderDialog = useCallback((src: string, label?: string, format: ProductFormat = 'qr') => {
    setSource(src);
    setProductFormat(format);
    posthog.capture('order_dialog_opened', {
      source: src,
      button_label: label,
      product_format: format,
    });
    setIsOpen(true);
  }, []);

  const closeOrderDialog = useCallback(() => {
    setIsOpen(false);
    setSource(null);
    setProductFormat('qr');
  }, []);

  return (
    <OrderDialogContext.Provider value={{ isOpen, source, productFormat, openOrderDialog, closeOrderDialog }}>
      {children}
    </OrderDialogContext.Provider>
  );
}

export function useOrderDialog() {
  const context = useContext(OrderDialogContext);
  if (!context) {
    throw new Error("useOrderDialog must be used within an OrderDialogProvider");
  }
  return context;
}
