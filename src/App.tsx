import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Order from "./pages/Order";
import Studio from "./pages/Studio";
import PublicSongDraft from "./pages/PublicSongDraft";
import OrderSuccess from "./pages/OrderSuccess";
import PublicSong from "./pages/PublicSong";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/order" element={<Order />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/s/draft" element={<PublicSongDraft />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/s/song/:orderId" element={<PublicSong />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
