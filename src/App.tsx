import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

import Order from "./pages/Order";
import OrderPending from "./pages/OrderPending";
import Studio from "./pages/Studio";
import PublicSongDraft from "./pages/PublicSongDraft";
import OrderSuccess from "./pages/OrderSuccess";
import PublicSong from "./pages/PublicSong";
import Discount from "./pages/Discount";

import ValentineNew from "./pages/ValentineNew";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Cases from "./pages/Cases";
import PublicOffer from "./pages/PublicOffer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import GuaranteeAndRefund from "./pages/GuaranteeAndRefund";
import PaymentAndDelivery from "./pages/PaymentAndDelivery";
import NotFound from "./pages/NotFound";
import { OrderDialogProvider } from "./components/order/OrderDialogContext";
import { OrderDialog } from "./components/order/OrderDialog";
import { PostHogProvider } from "./providers/PostHogProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PostHogProvider>
          <OrderDialogProvider>
            <OrderDialog />
            <Routes>
              <Route path="/" element={<Index />} />

              <Route path="/order" element={<Order />} />
              <Route path="/order-pending" element={<OrderPending />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/s/draft" element={<PublicSongDraft />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/s/song/:orderId" element={<PublicSong />} />
              <Route path="/discount" element={<Discount />} />
              <Route path="/valentine" element={<ValentineNew />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/offer" element={<PublicOffer />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/guarantee" element={<GuaranteeAndRefund />} />
              <Route path="/delivery" element={<PaymentAndDelivery />} />


              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </OrderDialogProvider>
        </PostHogProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
