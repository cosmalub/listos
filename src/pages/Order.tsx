import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Music } from "lucide-react";

export default function Order() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    novaPoshta: "",
    comment: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Order data:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Повернутися
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Замовити музичну листівку
            </h1>
            <p className="text-muted-foreground">
              Заповніть форму та отримайте свою унікальну листівку за 1-2 дні
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              Дані для замовлення
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше ім'я *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Введіть ваше ім'я"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+380 XX XXX XX XX"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Місто *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Ваше місто"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="novaPoshta">Відділення Нової Пошти *</Label>
                  <Input
                    id="novaPoshta"
                    value={formData.novaPoshta}
                    onChange={(e) => handleInputChange("novaPoshta", e.target.value)}
                    placeholder="№ відділення або адреса"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Коментар до замовлення</Label>
                <Textarea
                  id="comment"
                  value={formData.comment}
                  onChange={(e) => handleInputChange("comment", e.target.value)}
                  placeholder="Розкажіть про настрій листівки, тему пісні або інші побажання..."
                  rows={4}
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>До сплати:</span>
                  <span className="text-primary">399 грн</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Безкоштовна доставка Новою Поштою включена
                </p>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-primary hover:shadow-soft transition-all duration-300"
              >
                Оформити замовлення за 399 грн
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}