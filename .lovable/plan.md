

# Убрать белую полосу вокруг сердца

## Проблема
Есть **два SVG-сердца**:
1. Розовый контур — 850x850px (`stroke="#fecdd3"`)
2. Белый контур — 800x800px (`stroke="rgba(255,255,255,0.4)"`)

Белый контур меньшего размера смещён и создаёт белую полосу с одной стороны.

## Решение
**Удалить второй SVG** (glass overlay) полностью. Оставить только одно сердце с розовым контуром.

## Изменения в `src/components/valentine-new/HeroSection.tsx`

Удалить строки 59-72:

```tsx
{/* Glass Overlay for Texture */}
<motion.svg
  viewBox="0 0 512 512"
  className="absolute w-[800px] h-[800px]"
  animate={{ y: [0, -15, 0] }}
  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
>
  <path
    fill="none"
    stroke="rgba(255,255,255,0.4)"
    strokeWidth="2"
    d="M462.3 62.6C407.5..."
  />
</motion.svg>
```

## Результат
- Только один розовый контур сердца (`#fecdd3`)
- Никаких белых полос
- Чистый минималистичный дизайн

