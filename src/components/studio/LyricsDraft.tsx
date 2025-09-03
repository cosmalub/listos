import React, { useState, useEffect } from 'react';
import { FileText, Edit, Trash2, CheckCircle, MessageCircle, ArrowRight, Save } from 'lucide-react';
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
      'Щось не так з піснею, підправ її';
    onRequestEdit(text);
    setSelectedText('');
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
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Чернетка пісні</h3>
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

            {/* Simplified action buttons */}
            <div className="mt-6 space-y-3">
              {/* Info block */}
              <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
                <p className="text-sm text-muted-foreground">
                  {selectedText ? (
                    <>Обрано текст: "<em>{selectedText.slice(0, 50)}{selectedText.length > 50 ? '...' : ''}</em>"</>
                  ) : (
                    <>Виділіть частину тексту для точного редагування або використайте загальні кнопки</>
                  )}
                </p>
              </div>

              {/* Two main action buttons */}
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleRequestEdit}
                  size="lg"
                  className="h-14 justify-start text-left"
                >
                  <MessageCircle className="h-5 w-5 mr-3 shrink-0" />
                  <div>
                    <div className="font-medium">Попросити підправити</div>
                    <div className="text-xs text-muted-foreground">
                      {selectedText ? 'Підправить обрану частину' : 'Спитає що не подобається'}
                    </div>
                  </div>
                </Button>
                
                <Button 
                  onClick={handleConfirmLyrics}
                  disabled={!editableLyrics.trim()}
                  size="lg"
                  className="h-14 justify-start text-left"
                >
                  <CheckCircle className="h-5 w-5 mr-3 shrink-0" />
                  <div>
                    <div className="font-medium">Підтвердити і далі</div>
                    <div className="text-xs opacity-80">
                      Переходити до створення пісні
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 ml-auto shrink-0" />
                </Button>
              </div>

              {/* Advanced editing options */}
              <details className="group">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Додаткові опції редагування
                </summary>
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={!editableLyrics}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    {isEditing ? 'Перегляд' : 'Редагувати'}
                  </Button>
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={handleSaveEdit}>
                      <Save className="h-4 w-4 mr-1" />
                      Зберегти
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={handleClearDraft}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Очистити
                  </Button>
                </div>
              </details>
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
                <p className="text-sm font-medium mb-2">💡 Як це працює:</p>
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