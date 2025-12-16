import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisRequest {
  lyrics: string;
  feedback?: string;
}

interface AnalysisResponse {
  recommendedStyles: string[]; // IDs з music-styles.ts
  title: string;
  vocalGender?: 'male' | 'female';
  styleWeight?: number;
  weirdnessConstraint?: number;
  audioWeight?: number;
  negativeTags?: string[];
  reasoning?: string; // Пояснення чому обрані ці стилі
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lyrics, feedback }: AnalysisRequest = await req.json();
    
    if (!lyrics) {
      throw new Error('Lyrics are required');
    }

    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY is not configured');
    }

    console.log('Analyzing lyrics for music generation...');

    const feedbackSection = feedback ? `

## ФІДБЕК КОРИСТУВАЧА - НАЙВИЩИЙ ПРІОРИТЕТ!
Користувач хоче змінити попередню версію:
"${feedback}"

**КРИТИЧНО ВАЖЛИВО**: Фідбек користувача має АБСОЛЮТНИЙ пріоритет над аналізом тексту!

### Якщо користувач називає КОНКРЕТНИЙ ЖАНР/СТИЛЬ:

**РОК І МЕТАЛ**:
- "метал", "металл", "heavy metal" → **power-metal** (епічний) або **thrash-metal** (агресивний)
- "хард рок", "hard rock", "жорсткий рок" → **classic-rock**
- "дум метал", "doom metal", "повільний метал" → **doom-metal**
- "альтернативний рок", "alternative" → **alternative-rock**
- "гранж", "grunge" → **grunge**
- "панк", "punk" → **punk-rock**
- "психоделічний рок", "psychedelic" → **psychedelic-rock**
- "блюз рок", "blues rock" → **blues-rock**
- "поп-рок", "pop rock" → **pop-rock-groovy** або **pop-rock-danceable**

**ЕЛЕКТРОННА МУЗИКА**:
- "EDM", "електроніка", "танцювальна" → **edm-party** або **edm-melodic**
- "диско", "disco" → **disco-groovy**

**АКУСТИКА І ФОЛК**:
- "акустика", "acoustic", "фолк" → **acoustic-folk** або **indie-folk-intimate**
- "кантрі", "country" → **country-americana** або **country-storytelling**

**RNB І СОУЛ**:
- "RnB", "соул", "soul" → **soul-emotional**, **rnb-neo-soul**, або **rnb-dark-cinematic**
- "фанк", "funk" → **funk-dance-pop** або **soul-funk-joyful**

**РОМАНТИЧНІ**:
- "романтика", "балада", "ballad" → **romantic-ballad** або **acoustic-folk**

**ХІП-ХОП**:
- "хіп-хоп", "hip-hop", "rap", "trap" → **hip-hop-trap**

**ДЖАЗ**:
- "джаз", "jazz" → **pop-latin-jazz**

### Якщо користувач просить ЗМІНИ ХАРАКТЕРИСТИК:
- "Більш енергійно" → вибери стилі з енергією 4-5
- "Більш романтично" → вибери стилі з романтикою 4-5
- "Жіночий/Чоловічий вокал" → вибери стилі з відповідним vocalGender
- "Повільніше", "спокійніше" → вибери стилі з енергією 1-3
- "Більш акустично" → вибери acoustic-folk, indie-folk-intimate, country

**ПРІОРИТЕТ**: Якщо в фідбеку є конкретна назва жанру - обов'язково включи відповідні стилі в recommendedStyles!

` : '';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 3000,
        messages: [
          {
            role: 'user',
            content: `Проаналізуй текст пісні та ОБЕРИ РІВНО 4 найкращих стилів зі списку перевірених стилів для Suno.

ТЕКСТ ПІСНІ:
${lyrics}
${feedbackSection}

## ДОСТУПНІ СТИЛІ (ID та опис):

### ЕНЕРГІЙНІ ТА СВЯТКОВІ:
- **hip-hop-trap**: Сучасний ритмічний біт з потужним басом (чол. вокал, енергія 5, романтика 1)
  Найкраще для: День народження молодої людини, Мотивація, Для друга

- **funk-dance-pop**: Заводний грув з танцювальною енергією (чол. вокал, енергія 5, романтика 2)
  Найкраще для: Святкування, Вечірка, День народження

- **pop-dance**: Легкий танцювальний поп (жін. вокал, енергія 4, романтика 3)
  Найкраще для: День народження дівчини, Подяка, Святкові привітання

- **disco-groovy**: Ностальгічне диско (жін. вокал, енергія 5, романтика 2)
  Найкраще для: Вечірка, Святкування, Весела подяка

- **edm-party**: Енергійна електронна музика (енергія 5, романтика 1)
  Найкраще для: Вечірки, Молодь, Танці

- **edm-melodic**: Піднесений мелодійний EDM (чол. вокал, енергія 5, романтика 2)
  Найкраще для: Святкування, Мотивація, Позитивні моменти

### РОМАНТИЧНІ ТА НІЖНІ:
- **romantic-ballad**: Ніжна емоційна балада (жін. вокал, енергія 2, романтика 5)
  Найкраще для: Зізнання в коханні, Романтичне послання, Річниця

- **acoustic-folk**: Теплий акустичний звук (чол. вокал, енергія 2, романтика 5)
  Найкраще для: Романтичне послання, Подяка від щирого серця

- **indie-folk-intimate**: Ефірний інді-фолк (чол. вокал, енергія 2, романтика 5)
  Найкраще для: Романтичні моменти, Особисті послання

### ЕМОЦІЙНІ ТА ЩИРІ:
- **soul-emotional**: Глибокий душевний вокал (жін. вокал, енергія 3, романтика 4)
  Найкраще для: Вибачення, Емоційна подяка, Підтримка

- **alternative-folk**: Атмосферний звук (жін. вокал, енергія 3, романтика 3)
  Найкраще для: Підтримка в складні часи, Щирі слова

- **piano-pop-rock**: Театральне виконання з піаніно (чол. вокал, енергія 3, романтика 3)
  Найкраще для: Важливі послання, Вибачення, Підтримка

- **soul-gospel**: Піднесений духовний госпел (жін. вокал, енергія 4, романтика 2)
  Найкраще для: Натхнення, Підтримка, Важливі моменти

- **rnb-dark-cinematic**: Темний атмосферний RnB (чол. вокал, енергія 3, романтика 4)
  Найкраще для: Серйозні послання, Глибокі емоції, Вибачення

- **rnb-neo-soul**: Сучасний емоційний соул (жін. вокал, енергія 3, романтика 4)
  Найкраще для: Емоційні послання, Подяка, Щирі слова для жінки

### КЛАСИЧНІ ТА СПОКІЙНІ:
- **country-americana**: Класичний кантрі (чол. вокал, енергія 3, романтика 3)
  Найкраще для: Історії життя, Подяка батькам, Сімейні моменти

- **country-storytelling**: Розповідна манера (жін. вокал, енергія 3, романтика 3)
  Найкраще для: Історії про життя, Родинні історії

- **acoustic-storytelling**: Розповідна акустична пісня (чол. вокал, енергія 2, романтика 3)
  Найкраще для: Історії життя, Спогади, Сімейні моменти

- **reggae-peaceful**: Розслаблений регі (чол. вокал, енергія 2, романтика 2)
  Найкраще для: Розслаблені привітання, Позитивні послання

- **lounge-singer**: Класичний біг-бенд (чол. вокал, енергія 3, романтика 3)
  Найкраще для: Елегантні привітання, Для старшого покоління

### ЕНЕРГІЙНИЙ РОК:
- **classic-rock**: Потужні гітарні рифи (енергія 5, романтика 1)
  Найкраще для: Мотивація, Для чоловіка, День народження

- **alternative-rock**: Сучасний електронний рок (енергія 4, романтика 2)
  Найкраще для: Для творчих людей, Незвичайні привітання

- **pop-rock-groovy**: Енергійний поп-рок (чол. вокал, енергія 4, романтика 2)
  Найкраще для: День народження, Святкування, Мотивація

- **pop-rock-danceable**: Танцювальний поп-рок (чол. вокал, енергія 5, романтика 2)
  Найкраще для: Вечірки, День народження

### ІНШІ СТИЛІ:
- **rnb-anthemic**: Потужний ритмічний RnB (жін. вокал, енергія 4, романтика 3)
  Найкраще для: Святкування, День народження дівчини, Мотивація для жінки

- **pop-latin-jazz**: Святковий латинський джаз (жін. вокал, енергія 5, романтика 3)
  Найкраще для: Свята, Вечірки, Танцювальні привітання

- **soul-funk-joyful**: Заводний фанковий соул (чол. вокал, енергія 4, романтика 2)
  Найкраще для: Святкування, Подяка, Веселі моменти

- **indie-pop-minimal**: Атмосферний інді-поп (енергія 2, романтика 4)
  Найкраще для: Для творчих людей, Інтимні послання

- **art-pop-experimental**: Авангардний електронний поп (жін. вокал, енергія 3, романтика 2)
  Найкраще для: Для митців, Незвичайні подарунки

- **grunge**: Важкий темний гранж (чол. вокал, енергія 5, романтика 1)
  Найкраще для: Підлітки, Емоційні моменти, Для друзів-бунтарів

- **blues-rock**: Душевний блюз-рок (чол. вокал, енергія 4, романтика 3)
  Найкраще для: Дорослі чоловіки, Чесні емоції, Життєві історії

- **dream-pop**: Ефірний поп з мерехтливими гітарами (жін. вокал, енергія 2, романтика 5)
  Найкраще для: Романтичні моменти, Мрійливі послання, Для творчих людей

- **punk-rock**: Агресивний молодіжний панк (чол. вокал, енергія 5, романтика 1)
  Найкраще для: Молодь, Енергійні привітання, Бунтарські друзі

- **psychedelic-rock**: Грувовий психоделічний рок (чол. вокал, енергія 3, романтика 2)
  Найкраще для: Креативні люди, Незвичайні подарунки, Експериментальні моменти

- **power-metal**: Епічний павер-метал (чол. вокал, енергія 5, романтика 1)
  Найкраще для: Фанати металу, Епічні моменти, Героїчні теми

- **thrash-metal**: Агресивний треш-метал (чол. вокал, енергія 5, романтика 1)
  Найкраще для: Екстремальна енергія, Агресивні привітання, Молодь

- **doom-metal**: Важкий повільний метал (чол. вокал, енергія 4, романтика 1)
  Найкраще для: Темні теми, Важкі емоції, Повільний метал

## ТВОЄ ЗАВДАННЯ:

1. **Проаналізуй контекст**:
   - Тип події (день народження, вибачення, подяка, кохання і т.д.)
   - Від кого і кому (стать, відносини)
   - Настрій тексту (радісний, романтичний, емоційний, енергійний)

2. **Обери РІВНО 4 НАЙКРАЩИХ стилів** зі списку вище за критеріями:
   - Відповідність події та настрою
   - Рівень енергії (1-5)
   - Рівень романтичності (1-5)
   - Стать вокалу (якщо важливо)
   - "Найкраще для" використання

3. **Визнач параметри**:
   - **title**: назва пісні (до 50 символів)
   - **vocalGender**: "male" або "female" (якщо стиль підтримує)
   - **styleWeight** (0-100): наскільки точно слідувати стилю
   - **weirdnessConstraint** (0-100): рівень експериментальності
   - **audioWeight** (0-100): баланс вокал/інструменти
   - **negativeTags**: масив елементів, яких уникати
   - **reasoning**: коротке пояснення (1-2 речення), ЧОМУ ці стилі найкращі

## ФОРМАТ ВІДПОВІДІ:

Поверни ТІЛЬКИ валідний JSON:
{
  "recommendedStyles": ["style-id-1", "style-id-2", "style-id-3", "style-id-4"],
  "title": "Назва пісні",
  "vocalGender": "male" | "female",
  "styleWeight": 60,
  "weirdnessConstraint": 45,
  "audioWeight": 55,
  "negativeTags": ["sad", "slow"],
  "reasoning": "Пояснення вибору стилів"
}`
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', response.status, errorText);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.content[0].text;
    
    console.log('Claude response:', content);

    // Parse JSON from Claude's response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON from Claude response');
    }

    const analysis: AnalysisResponse = JSON.parse(jsonMatch[0]);
    
    // Валідація recommendedStyles
    if (!analysis.recommendedStyles || !Array.isArray(analysis.recommendedStyles)) {
      throw new Error('recommendedStyles must be an array');
    }
    if (analysis.recommendedStyles.length !== 4) {
      console.warn(`Expected 4 styles, got ${analysis.recommendedStyles.length}`);
    }
    
    // Validate ranges
    if (analysis.styleWeight !== undefined) {
      analysis.styleWeight = Math.max(0, Math.min(100, analysis.styleWeight));
    }
    if (analysis.weirdnessConstraint !== undefined) {
      analysis.weirdnessConstraint = Math.max(0, Math.min(100, analysis.weirdnessConstraint));
    }
    if (analysis.audioWeight !== undefined) {
      analysis.audioWeight = Math.max(0, Math.min(100, analysis.audioWeight));
    }

    console.log('Analysis result:', analysis);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-lyrics-for-music:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        fallback: {
          recommendedStyles: ['pop-dance', 'acoustic-folk', 'soul-emotional', 'romantic-ballad'],
          title: 'Untitled',
          styleWeight: 50,
          weirdnessConstraint: 40,
          audioWeight: 50,
          reasoning: 'Використано універсальні стилі як запасний варіант'
        }
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
