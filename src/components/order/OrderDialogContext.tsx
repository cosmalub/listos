import React, { createContext, useContext, useState, useCallback } from "react";
import { posthog } from "@/providers/PostHogProvider";

interface OrderDialogContextType {
  isOpen: boolean;
  source: string | null;
  openOrderDialog: (source: string, label?: string) => void;
  closeOrderDialog: () => void;
}

const OrderDialogContext = createContext<OrderDialogContextType | undefined>(undefined);

export function OrderDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | null>(null);

  const openOrderDialog = useCallback((src: string, label?: string) => {
    setSource(src);
    posthog.capture('order_dialog_opened', {
      source: src,
      button_label: label
    });
    setIsOpen(true);
  }, []);

  const closeOrderDialog = useCallback(() => {
    setIsOpen(false);
    setSource(null);
  }, []);

  return (
    <OrderDialogContext.Provider value={{ isOpen, source, openOrderDialog, closeOrderDialog }}>
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
