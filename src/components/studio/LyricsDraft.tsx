import React, { useState, useEffect } from 'react';
import { FileText, Edit, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface LyricsDraftProps {
  lyrics: string;
  onConfirm: (lyrics: string) => void;
}

export const LyricsDraft: React.FC<LyricsDraftProps> = ({ lyrics, onConfirm }) => {
  const [editableLyrics, setEditableLyrics] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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
                <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed">
                  {editableLyrics}
                </pre>
              </Card>
            )}

            <div className="flex gap-2 mt-4">
              {isEditing && (
                <Button variant="outline" onClick={handleSaveEdit}>
                  Зберегти зміни
                </Button>
              )}
              <Button variant="outline" onClick={handleClearDraft}>
                <Trash2 className="h-4 w-4 mr-1" />
                Очистити
              </Button>
              <Button 
                onClick={handleConfirmLyrics}
                disabled={!editableLyrics.trim()}
                className="ml-auto"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Підтвердити слова
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Чернетка порожня</p>
              <p className="text-sm">
                Слова пісні з'являться тут після спілкування з Лістосиком
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};