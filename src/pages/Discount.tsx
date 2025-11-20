import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Gift, ArrowRight } from "lucide-react";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";

const Discount = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("ref");
  const promoCode = "NEXT25";

  const copyPromoCode = () => {
    navigator.clipboard.writeText(promoCode);
    toast.success("Промокод скопійовано!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Gift className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Дякуємо за замовлення! 🎉
            </h1>
            <p className="text-xl text-muted-foreground">
              Ось ваша персональна знижка на наступне замовлення
            </p>
          </div>

          {/* Promo Code Card */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="space-y-4">
              <div className="text-6xl font-bold text-primary">
                25%
              </div>
              <p className="text-lg text-foreground">
                Знижка на наступну листівку
              </p>
              
              <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 space-y-4">
                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                  Ваш промокод
                </p>
                <div className="flex items-center justify-center gap-4">
                  <code className="text-3xl font-mono font-bold text-foreground tracking-wider">
                    {promoCode}
                  </code>
                  <Button
                    onClick={copyPromoCode}
                    variant="outline"
                    size="icon"
                    className="h-12 w-12"
                  >
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Instructions */}
          <Card className="p-6 text-left">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              Як скористатися знижкою:
            </h2>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-semibold text-primary">1.</span>
                <span>Оберіть новий дизайн листівки на головній сторінці</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">2.</span>
                <span>При оформленні замовлення введіть промокод <code className="bg-muted px-2 py-1 rounded text-foreground font-mono">{promoCode}</code></span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">3.</span>
                <span>Отримайте знижку 25% на всю листівку</span>
              </li>
            </ol>
          </Card>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg"
              onClick={() => window.location.href = `/?promo=${promoCode}`}
            >
              Створити нову листівку
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {orderId && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.location.href = `/s/song/${orderId}`}
              >
                Переглянути мою пісню
              </Button>
            )}
          </div>

          {/* Social Sharing Suggestion */}
          <Card className="p-6 bg-accent/50">
            <p className="text-sm text-muted-foreground">
              💡 <strong className="text-foreground">Порадьте друзям!</strong> Поділіться своєю унікальною листівкою з близькими
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discount;
