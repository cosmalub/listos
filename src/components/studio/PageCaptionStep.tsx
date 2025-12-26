import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Info, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PageCaptionData {
  occasion: string;
  recipient: string;
  sender: string;
}

interface PageCaptionStepProps {
  lyrics: string;
  musicVariant: any;
  designData: any;
  chatMessages?: any[];
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


export const PageCaptionStep: React.FC<PageCaptionStepProps> = ({
  lyrics,
  musicVariant,
  designData,
  chatMessages,
  onComplete
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PageCaptionData>({
    occasion: '',
    recipient: '',
    sender: ''
  });
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);
  const [autoFillStatus, setAutoFillStatus] = useState<'none' | 'partial' | 'full'>('none');

  // Auto-fill form based on chat history
  useEffect(() => {
    const extractMetadata = async () => {
      if (!chatMessages || chatMessages.length === 0) {
        setIsLoadingMetadata(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('extract-page-metadata', {
          body: { chatMessages, lyrics }
        });

        if (error) {
          console.error('Error extracting metadata:', error);
        } else if (data) {
          console.log('Extracted metadata:', data);
          const filledFields = [data.occasion, data.recipient, data.sender].filter(Boolean);
          if (filledFields.length === 3) {
            setAutoFillStatus('full');
          } else if (filledFields.length > 0) {
            setAutoFillStatus('partial');
          }
          setFormData(prev => ({
            occasion: data.occasion || prev.occasion,
            recipient: data.recipient || prev.recipient,
            sender: data.sender || prev.sender
          }));
        }
      } catch (error) {
        console.error('Failed to extract metadata:', error);
      } finally {
        setIsLoadingMetadata(false);
      }
    };

    extractMetadata();
  }, [chatMessages, lyrics]);

  const handleInputChange = (field: keyof PageCaptionData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const handleComplete = () => {
    if (!formData.occasion) {
      alert('Будь ласка, оберіть нагоду');
      return;
    }
    
    // Save all data to sessionStorage for draft page
    const draftData = {
      lyrics,
      musicVariant,
      designData,
      pageInfo: formData,
      timestamp: new Date().toISOString()
    };
    
    sessionStorage.setItem('studio-draft-data', JSON.stringify(draftData));
    
    // Navigate to draft page - only add params if filled
    let url = `/s/draft?occasion=${formData.occasion}`;
    if (formData.recipient) {
      url += `&recipient=${encodeURIComponent(formData.recipient)}`;
    }
    if (formData.sender) {
      url += `&sender=${encodeURIComponent(formData.sender)}`;
    }
    navigate(url);
  };

  const isFormValid = !!formData.occasion;

  // Show loading state while extracting metadata
  if (isLoadingMetadata) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Заповнюємо форму на основі вашої розмови...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {autoFillStatus !== 'none' && (
        <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            {autoFillStatus === 'full' 
              ? "Ми автоматично заповнили форму на основі вашої розмови. Ви можете змінити будь-які поля."
              : "Ми автоматично заповнили деякі поля на основі вашої розмови. Перевірте та за бажанням доповніть решту."
            }
          </AlertDescription>
        </Alert>
      )}
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

          {/* Recipient and Sender - optional */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Кому <span className="text-muted-foreground text-sm">(необов'язково)</span></Label>
              <Input
                id="recipient"
                value={formData.recipient}
                onChange={(e) => handleInputChange('recipient', e.target.value)}
                placeholder="Наприклад: Марії"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sender">Від кого <span className="text-muted-foreground text-sm">(необов'язково)</span></Label>
              <Input
                id="sender"
                value={formData.sender}
                onChange={(e) => handleInputChange('sender', e.target.value)}
                placeholder="Наприклад: Олексія"
              />
            </div>
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