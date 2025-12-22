import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const OCCASIONS = [
  { value: "birthday", label: "День народження 🎂" },
  { value: "love", label: "Кохання ❤️" },
  { value: "thanks", label: "Подяка 🙏" },
  { value: "apology", label: "Вибачення 💙" },
  { value: "congratulations", label: "Вітання 🎉" },
  { value: "friendship", label: "Дружба 🤝" },
  { value: "holiday", label: "Свято 🎄" },
  { value: "other", label: "Інше ✨" },
];

export default function TestFrame() {
  const [occasion, setOccasion] = useState("birthday");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFrame, setGeneratedFrame] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const generateFrame = async () => {
    setIsGenerating(true);
    setGeneratedFrame(null);
    setMessage(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-frame", {
        body: { occasion },
      });

      if (error) {
        throw error;
      }

      if (data.success && data.imageUrl) {
        setGeneratedFrame(data.imageUrl);
        setMessage(data.message);
        toast.success("Рамку згенеровано!");
      } else {
        throw new Error(data.error || "Failed to generate frame");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Помилка генерації");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadFrame = () => {
    if (!generatedFrame) return;
    
    const link = document.createElement("a");
    link.href = generatedFrame;
    link.download = `frame-${occasion}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Рамку завантажено!");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">🖼️ Тест генерації рамок</h1>
          <p className="text-muted-foreground">
            Генерація мінімалістичних рамок для листівок через Lovable AI
          </p>
        </div>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Подія</label>
              <Select value={occasion} onValueChange={setOccasion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OCCASIONS.map((occ) => (
                    <SelectItem key={occ.value} value={occ.value}>
                      {occ.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={generateFrame}
              disabled={isGenerating}
              className="min-w-[200px]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Генерація...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Згенерувати рамку
                </>
              )}
            </Button>
          </div>
        </Card>

        {generatedFrame && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Результат: {OCCASIONS.find(o => o.value === occasion)?.label}
                </h2>
                <Button variant="outline" onClick={downloadFrame}>
                  <Download className="mr-2 h-4 w-4" />
                  Завантажити
                </Button>
              </div>

              {message && (
                <p className="text-sm text-muted-foreground">{message}</p>
              )}

              {/* Frame preview with checkered background to show transparency */}
              <div 
                className="relative rounded-lg overflow-hidden border"
                style={{
                  background: `
                    linear-gradient(45deg, #e0e0e0 25%, transparent 25%),
                    linear-gradient(-45deg, #e0e0e0 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #e0e0e0 75%),
                    linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)
                  `,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                }}
              >
                <img
                  src={generatedFrame}
                  alt={`Frame for ${occasion}`}
                  className="w-full max-w-md mx-auto"
                />
              </div>

              {/* Preview with sample photo */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Превью з фото:</h3>
                <div className="relative w-full max-w-md mx-auto aspect-[2/3] rounded-lg overflow-hidden border">
                  {/* Sample background photo */}
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600"
                    alt="Sample photo"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Frame overlay */}
                  <img
                    src={generatedFrame}
                    alt="Frame overlay"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Якщо рамка виглядає добре, її можна зберегти в{" "}
            <code className="bg-muted px-1 rounded">public/frames/{occasion}-frame.png</code>
          </p>
        </div>
      </div>
    </div>
  );
}
