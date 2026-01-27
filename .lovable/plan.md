
# Замінити галерею на /valentine на MomentsGallerySection

## Що зараз
На сторінці `/valentine` використовується `GallerySection` з:
- 6 стокових фото з Unsplash
- Полароїд-стиль з "скотчем"
- Статична сітка 3 колонки

## Що зробимо
Замінимо на `MomentsGallerySection` з головної сторінки:
- Реальні картинки з `/public/gallery/` (ті самі що на головній)
- Анімована прокрутка в два ряди (вліво/вправо)
- Красивий hover-ефект з glow та scale
- Градієнти затухання по краях

---

## Зміни

### Файл: `src/pages/Valentine.tsx`

1. Замінити імпорт `GallerySection` на `MomentsGallerySection`
2. Використати `MomentsGallerySection` замість `GallerySection`

```tsx
// Було:
import { GallerySection } from '../components/valentine/GallerySection';

// Стане:
import { MomentsGallerySection } from '@/components/sections/moments-gallery-section';
```

```tsx
// В JSX замість:
<GallerySection />

// Буде:
<MomentsGallerySection />
```

---

## Результат
- Сторінка `/valentine` матиме таку ж красиву галерею як головна
- Ті самі реальні картинки з проекту
- Анімована безперервна прокрутка
- Консистентний вигляд між сторінками
