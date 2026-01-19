import React, { createContext, useContext, useState, useCallback } from "react";
import { posthog } from "@/providers/PostHogProvider";

interface OrderDialogContextType {
  isOpen: boolean;
  openOrderDialog: (source: string, label?: string) => void;
  closeOrderDialog: () => void;
}

const OrderDialogContext = createContext<OrderDialogContextType | undefined>(undefined);

export function OrderDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openOrderDialog = useCallback((source: string, label?: string) => {
    posthog.capture('order_dialog_opened', {
      source,
      button_label: label
    });
    setIsOpen(true);
  }, []);

  const closeOrderDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <OrderDialogContext.Provider value={{ isOpen, openOrderDialog, closeOrderDialog }}>
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
