// Утилита для извлечения доминантных цветов из изображения

interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Конвертирует RGB в HEX формат
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Вычисляет расстояние между двумя цветами в RGB пространстве
 */
function colorDistance(c1: RGB, c2: RGB): number {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
}

/**
 * Проверяет, является ли цвет слишком темным или светлым
 */
function isColorValid(rgb: RGB): boolean {
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  // Исключаем слишком темные (< 30) и слишком светлые (> 240) цвета
  return brightness > 30 && brightness < 240;
}

/**
 * Извлекает доминантные цвета из изображения
 * @param imageUrl URL изображения
 * @param colorCount Количество цветов для извлечения (по умолчанию 3)
 * @returns Promise с массивом цветов в HEX формате
 */
export async function extractDominantColors(
  imageUrl: string,
  colorCount: number = 3
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      try {
        // Создаем canvas для анализа изображения
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          throw new Error('Failed to get canvas context');
        }

        // Уменьшаем размер для быстрого анализа
        const maxSize = 100;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        // Рисуем изображение на canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Получаем данные пикселей
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Собираем все цвета с их частотой
        const colorMap = new Map<string, { rgb: RGB; count: number }>();

        for (let i = 0; i < pixels.length; i += 4) {
          const rgb: RGB = {
            r: pixels[i],
            g: pixels[i + 1],
            b: pixels[i + 2]
          };

          // Пропускаем невалидные цвета
          if (!isColorValid(rgb)) continue;

          // Округляем цвета для группировки похожих оттенков
          const roundedRgb: RGB = {
            r: Math.round(rgb.r / 10) * 10,
            g: Math.round(rgb.g / 10) * 10,
            b: Math.round(rgb.b / 10) * 10
          };

          const key = `${roundedRgb.r},${roundedRgb.g},${roundedRgb.b}`;
          
          if (colorMap.has(key)) {
            colorMap.get(key)!.count++;
          } else {
            colorMap.set(key, { rgb: roundedRgb, count: 1 });
          }
        }

        // Сортируем цвета по частоте
        const sortedColors = Array.from(colorMap.values())
          .sort((a, b) => b.count - a.count);

        // Выбираем наиболее различающиеся цвета
        const dominantColors: RGB[] = [];
        const minDistance = 50; // Минимальное расстояние между цветами

        for (const colorData of sortedColors) {
          if (dominantColors.length >= colorCount) break;

          // Проверяем, достаточно ли этот цвет отличается от уже выбранных
          const isSimilar = dominantColors.some(
            existingColor => colorDistance(colorData.rgb, existingColor) < minDistance
          );

          if (!isSimilar) {
            dominantColors.push(colorData.rgb);
          }
        }

        // Если не нашли достаточно цветов, добавляем fallback
        while (dominantColors.length < colorCount) {
          dominantColors.push({ r: 106, g: 90, b: 205 }); // #6A5ACD
        }

        // Конвертируем в HEX
        const hexColors = dominantColors.map(rgb => rgbToHex(rgb.r, rgb.g, rgb.b));
        
        resolve(hexColors);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Для data URLs и blob URLs не нужен crossOrigin
    if (imageUrl.startsWith('data:') || imageUrl.startsWith('blob:')) {
      img.crossOrigin = '';
    }

    img.src = imageUrl;
  });
}

/**
 * Fallback цвета на случай ошибки
 */
export const FALLBACK_COLORS = ['#6A5ACD', '#E6E6FA', '#DDA0DD'];
