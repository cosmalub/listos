import React, { useState, useEffect } from 'react';
import { FileText, Edit, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface LyricsDraftProps {
  lyrics: string;
  onConfirm: (lyrics: string) => void;
  onRequestEdit: (selectedText?: string) => void;
}

export const LyricsDraft: React.FC<LyricsDraftProps> = ({ lyrics, onConfirm, onRequestEdit }) => {
  const [editableLyrics, setEditableLyrics] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    setEditableLyrics(lyrics);
  }, [lyrics]);

  const handleSaveEdit = () => {
    setIsEditing(false);
    // Save to localStorage for persistence
    localStorage.setItem('studio-lyrics-draft', editableLyrics);
  };

  const handleClearDraft = () => {
    setEditableLyrics('');
    localStorage.removeItem('studio-lyrics-draft');
  };

  const handleConfirmLyrics = () => {
    if (editableLyrics.trim()) {
      onConfirm(editableLyrics);
    }
  };

  const handleRequestEdit = () => {
    const text = selectedText ? 
      `Підправ цю частину: "${selectedText}"` : 
      'Щось не так з текстом пісні, підправ його';
    onRequestEdit(text);
    setSelectedText('');
  };

  const handleSendFeedback = () => {
    if (feedbackText.trim()) {
      onRequestEdit(feedbackText);
      setFeedbackText('');
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection()?.toString();
    if (selection && selection.length > 0) {
      setSelectedText(selection);
    }
  };

  const updateFromChat = () => {
    setEditableLyrics(lyrics);
    setIsEditing(false);
  };

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('studio-lyrics-draft');
    if (savedDraft && !editableLyrics) {
      setEditableLyrics(savedDraft);
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
        <div>
          <h3 className="font-semibold">Чернетка тексту пісні</h3>
        </div>
        <div className="flex gap-2">
          {lyrics && lyrics !== editableLyrics && (
            <Button variant="outline" size="sm" onClick={updateFromChat}>
              Оновити з чату
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            disabled={!editableLyrics}
          >
            <Edit className="h-4 w-4 mr-1" />
            {isEditing ? 'Перегляд' : 'Редагувати'}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {editableLyrics ? (
          <>
            {isEditing ? (
              <Textarea
                value={editableLyrics}
                onChange={(e) => setEditableLyrics(e.target.value)}
                className="flex-1 resize-none font-mono text-sm"
                placeholder="Введіть текст пісні..."
              />
            ) : (
              <Card className="flex-1 p-4 overflow-y-auto">
                <pre 
                  className="text-sm whitespace-pre-wrap font-sans leading-relaxed"
                  onMouseUp={handleTextSelection}
                >
                  {editableLyrics}
                </pre>
              </Card>
            )}

            {/* How do you like it prompt */}
            <div className="mt-6 space-y-4">
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <h4 className="font-medium text-foreground mb-2">Як вам текст пісні?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Якщо все підходить - підтверджуйте і згенеруємо музику. Якщо треба підправити - напишіть що змінити.
                </p>
                
                {/* Mini feedback composer */}
                <div className="space-y-3">
                  <Textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Наприклад: 'Зроби більш весело' або 'Додай рим до другого куплету'"
                    className="min-h-[60px] text-sm"
                  />
                  
                  {/* Two main action buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleSendFeedback}
                      disabled={!feedbackText.trim()}
                      className="justify-center"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Надіслати в чат
                    </Button>
                    
                    <Button 
                      onClick={handleConfirmLyrics}
                      disabled={!editableLyrics.trim()}
                      className="justify-center"
                    >
                      Підтвердити і згенерувати музику
                    </Button>
                  </div>
                </div>
              </div>

              {/* Text selection hint */}
              {selectedText && (
                <div className="bg-accent/30 rounded-lg p-3 border border-accent/30">
                  <p className="text-sm text-muted-foreground">
                    Обрано текст: "<em className="text-accent-foreground">{selectedText.slice(0, 50)}{selectedText.length > 50 ? '...' : ''}</em>"
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleRequestEdit}
                    className="mt-2"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Підправити цю частину
                  </Button>
                </div>
              )}
            </div>

          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground max-w-md">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Чернетка порожня</p>
              <p className="text-sm mb-4">
                Слова пісні з'являться тут після спілкування з Лістосиком
              </p>
              <div className="bg-muted/50 rounded-lg p-4 text-left">
                <p className="text-sm font-medium mb-2">Як це працює:</p>
                <ul className="text-xs space-y-1">
                  <li>• Створіть слова пісні в чаті з Лістосиком</li>
                  <li>• Підправте їх тут або попросіть ШІ</li>
                  <li>• Підтвердьте і переходьте далі</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};