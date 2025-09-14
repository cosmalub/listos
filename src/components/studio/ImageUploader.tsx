import React, { useCallback, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isUploading: boolean;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
}

export function ImageUploader({ 
  onImageUpload, 
  isUploading,
  maxSize = 10,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    setError(null);

    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      setError('Підтримуються тільки файли JPG, PNG та WebP');
      return false;
    }

    // Check file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`Розмір файлу не повинен перевищувати ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const handleFile = useCallback((file: File) => {
    if (!validateFile(file)) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Call upload handler
    onImageUpload(file);
  }, [onImageUpload, maxSize, acceptedTypes]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card 
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          dragActive ? 'border-primary bg-primary/5' : 'border-border',
          isUploading && 'opacity-50 cursor-not-allowed'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <label className="block p-8 text-center cursor-pointer">
          <input
            type="file"
            className="sr-only"
            accept={acceptedTypes.join(',')}
            onChange={handleInputChange}
            disabled={isUploading}
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            
            <div>
              <p className="text-lg font-medium">
                {isUploading ? 'Завантаження...' : 'Завантажити зображення'}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Перетягніть файл сюди або клікніть для вибору
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, PNG, WebP до {maxSize}MB
              </p>
            </div>
            
            {!isUploading && (
              <Button type="button" variant="outline">
                <Image className="w-4 h-4 mr-2" />
                Обрати файл
              </Button>
            )}
          </div>
        </label>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-lg border border-border"
              />
              <button
                onClick={clearPreview}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <p className="font-medium">Зображення завантажено</p>
              <p className="text-sm text-muted-foreground">
                Готово до використання у дизайні листівки
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}