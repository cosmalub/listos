import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Info, ArrowRight } from 'lucide-react';

interface PageCaptionData {
  occasion: string;
  recipient: string;
  sender: string;
  tone: string;
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PageCaptionData>({
    occasion: '',
    recipient: '',
    sender: '',
    tone: ''
  });

  const handleInputChange = (field: keyof PageCaptionData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const handleComplete = () => {
    if (!formData.occasion || !formData.recipient || !formData.sender) {
      alert('Будь ласка, заповніть всі поля');
      return;
    }
    // Navigate to draft page for editing
    navigate(`/s/draft?occasion=${formData.occasion}&recipient=${encodeURIComponent(formData.recipient)}&sender=${encodeURIComponent(formData.sender)}&tone=${formData.tone}`);
  };

  const isFormValid = formData.occasion && formData.recipient && formData.sender;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
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

        </CardContent>
      </Card>

      {/* Action Buttons */}
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