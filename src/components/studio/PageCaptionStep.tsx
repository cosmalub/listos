import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, FileText, Sparkles, Info, ArrowRight } from 'lucide-react';

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
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleInputChange = (field: keyof PageCaptionData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateMessage = async () => {
    if (!apiKey.trim()) {
      alert('Будь ласка, введіть API ключ');
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = `Створи красиве особисте повідомлення для листівки з піснею. 
      Контекст:
      - Нагода: ${occasions.find(o => o.value === formData.occasion)?.label || formData.occasion}
      - Від кого: ${formData.sender}
      - Кому: ${formData.recipient}
      - Тон: ${tones.find(t => t.value === formData.tone)?.label || formData.tone}
      - Пісня: ${lyrics.substring(0, 200)}...
      
      Створи тепле, персональне повідомлення українською мовою (максимум 200 символів), яке буде відображено на сторінці з піснею.`;

      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 300
        }),
      });

      if (!response.ok) {
        throw new Error('Помилка генерації повідомлення');
      }

      const data = await response.json();
      const message = data.choices[0]?.message?.content || '';
      setGeneratedMessage(message);
      setFormData(prev => ({ ...prev, customMessage: message }));
    } catch (error) {
      console.error('Error generating message:', error);
      alert('Помилка при генерації повідомлення. Спробуйте ще раз.');
    } finally {
      setIsGenerating(false);
    }
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

          {/* API Key Input */}
          <div className="space-y-2">
            <Label htmlFor="apiKey">Perplexity API ключ (тимчасово)</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Введіть ваш Perplexity API ключ"
            />
            <p className="text-xs text-muted-foreground">
              Потрібен для генерації повідомлення ШІ. Отримайте на perplexity.ai
            </p>
          </div>

          {/* Generate Message Button */}
          <Button
            onClick={generateMessage}
            disabled={isGenerating || !formData.occasion || !formData.recipient || !formData.sender || !apiKey}
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

      {/* Next Button */}
      <div className="flex justify-center">
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