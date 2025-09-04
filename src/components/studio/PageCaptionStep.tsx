import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, FileText, Sparkles, Info, ArrowRight, ExternalLink } from 'lucide-react';

interface PageCaptionData {
  occasion: string;
  recipient: string;
  sender: string;
  tone: string;
  customMessage: string;
}

interface PageCaptionStepProps {
  lyrics: string;
  musicVariant: any;
  onComplete: (data: PageCaptionData) => void;
}

const occasions = [
  { value: 'birthday', label: 'День народження' },
  { value: 'congratulations', label: 'Вітання' },
  { value: 'thanks', label: 'Подяка' },
  { value: 'apology', label: 'Вибачення' },
  { value: 'love', label: 'Кохання' },
  { value: 'friendship', label: 'Дружба' },
  { value: 'holiday', label: 'Свято' },
  { value: 'other', label: 'Інше' }
];

const tones = [
  { value: 'formal', label: 'Офіційний' },
  { value: 'friendly', label: 'Дружній' },
  { value: 'romantic', label: 'Романтичний' },
  { value: 'playful', label: 'Грайливий' },
  { value: 'heartfelt', label: 'Щирий' },
  { value: 'humorous', label: 'Гумористичний' }
];

export const PageCaptionStep: React.FC<PageCaptionStepProps> = ({
  lyrics,
  musicVariant,
  onComplete
}) => {
  const [formData, setFormData] = useState<PageCaptionData>({
    occasion: '',
    recipient: '',
    sender: '',
    tone: '',
    customMessage: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: keyof PageCaptionData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateTestMessage = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const occasionLabel = occasions.find(o => o.value === formData.occasion)?.label || formData.occasion;
      const toneLabel = tones.find(t => t.value === formData.tone)?.label || formData.tone;
      
      const demoMessage = `Дорог${formData.recipient.endsWith('ї') || formData.recipient.endsWith('і') ? 'а' : 'ий'} ${formData.recipient}! Ця пісня написана спеціально для тебе з нагоди ${occasionLabel.toLowerCase()}. Нехай вона принесе тобі радість та натхнення. З любов'ю, ${formData.sender} 💫`;
      
      setFormData(prev => ({ ...prev, customMessage: demoMessage }));
      setIsGenerating(false);
    }, 1500);
  };

  const handleComplete = () => {
    if (!formData.occasion || !formData.recipient || !formData.sender || !formData.customMessage) {
      alert('Будь ласка, заповніть всі поля');
      return;
    }
    onComplete(formData);
  };

  const isFormValid = formData.occasion && formData.recipient && formData.sender && formData.customMessage;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Сторінка з піснею та побажанням</h2>
        </div>
        <p className="text-muted-foreground">
          Створимо персональну сторінку, на яку буде вести QR-код з листівки
        </p>
      </div>

      {/* Info Alert */}
      <Alert className="border-primary/20 bg-primary/5">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Ця сторінка буде містити вашу пісню та особисте повідомлення. Кожна людина, яка відскануватиме QR-код з листівки, побачить цю сторінку.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Інформація про сторінку</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Occasion */}
          <div className="space-y-2">
            <Label htmlFor="occasion">Нагода *</Label>
            <Select value={formData.occasion} onValueChange={(value) => handleInputChange('occasion', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Оберіть нагоду" />
              </SelectTrigger>
              <SelectContent>
                {occasions.map((occasion) => (
                  <SelectItem key={occasion.value} value={occasion.value}>
                    {occasion.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recipient and Sender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Кому *</Label>
              <Input
                id="recipient"
                value={formData.recipient}
                onChange={(e) => handleInputChange('recipient', e.target.value)}
                placeholder="Наприклад: Марії"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sender">Від кого *</Label>
              <Input
                id="sender"
                value={formData.sender}
                onChange={(e) => handleInputChange('sender', e.target.value)}
                placeholder="Наприклад: Олексія"
              />
            </div>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <Label htmlFor="tone">Тон повідомлення</Label>
            <Select value={formData.tone} onValueChange={(value) => handleInputChange('tone', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Оберіть тон" />
              </SelectTrigger>
              <SelectContent>
                {tones.map((tone) => (
                  <SelectItem key={tone.value} value={tone.value}>
                    {tone.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Generate Message Button */}
          <Button
            onClick={generateTestMessage}
            disabled={isGenerating || !formData.occasion || !formData.recipient || !formData.sender}
            className="w-full"
            variant="outline"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Генеруємо повідомлення...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Згенерувати повідомлення ШІ
              </>
            )}
          </Button>

          {/* Custom Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Особисте повідомлення *</Label>
            <Textarea
              id="message"
              value={formData.customMessage}
              onChange={(e) => handleInputChange('customMessage', e.target.value)}
              placeholder="Введіть або згенеруйте особисте повідомлення..."
              className="min-h-[100px]"
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground">
              {formData.customMessage.length}/200 символів
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="outline"
          size="lg"
          asChild
          className="min-w-[200px]"
        >
          <a href="/s/test" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Дивитися приклад сторінки
          </a>
        </Button>
        <Button
          onClick={handleComplete}
          disabled={!isFormValid}
          size="lg"
          className="min-w-[200px]"
        >
          Створити сторінку
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};