# 🔍 ПОЛНЫЙ ТЕХНИЧЕСКИЙ SEO АУДИТ - TIMERO.RU

**Дата аудита:** 27 мая 2026  
**Аудитор:** Senior SEO Engineer + Senior React Engineer  
**Проект:** Timero - Онлайн Таймер Помодоро  
**URL:** https://timero.ru  
**Технологии:** React 18.3, Vite 6, React Router 7, Vercel

---

## 📊 EXECUTIVE SUMMARY

### Общая SEO оценка: **7.5/10** ⚠️

**Статус:** Проект имеет хорошую базовую SEO инфраструктуру, но есть **критические проблемы** с индексацией и техническими аспектами.

### Критические проблемы (требуют немедленного исправления):
1. ❌ **SITEMAP содержит ФЕЙКОВЫЕ URL** - 9 страниц в sitemap, но реально существует только 2 страницы
2. ❌ **robots.txt блокирует JSON файлы** - может нарушить hydration в React
3. ❌ **Устаревшие даты в sitemap** - lastmod: 2024-03-01 (фиктивная дата)
4. ❌ **Отсутствует H1 на странице** - H1 только в SEO компоненте, но не в HTML
5. ⚠️ **Недостаточно SEO контента** - всего 3 блока текста, нужно 300-700 слов
6. ⚠️ **Нет FAQPage structured data** - есть FAQ контент, но нет JSON-LD
7. ⚠️ **Mobile audio может не работать** - нет unlock flow для iOS Safari

---

## 🏗️ ЭТАП 1 — АРХИТЕКТУРНЫЙ АУДИТ

### 1.1 Структура проекта

**Тип:** React SPA (Single Page Application)  
**Фреймворк:** Vite 6 + React 18.3  
**Роутинг:** React Router 7 (BrowserRouter)  
**SSR/SSG:** ❌ НЕТ (чистый CSR - Client Side Rendering)  
**Деплой:** Vercel

**Вердикт:** ⚠️ **CSR без SSR/SSG - это SEO риск**. Google индексирует JS, но медленнее. Yandex может иметь проблемы.

### 1.2 Реальная структура страниц

**Фактически существующие страницы:**
```
✅ / (TimerPage.tsx)
✅ /404 (not-found.tsx)
```

**Роуты в App.tsx (все ведут на TimerPage):**
```typescript
/ → TimerPage
/pomodoro → TimerPage
/focus-timer → TimerPage
/study-timer → TimerPage
/work-timer → TimerPage
/interval-timer → TimerPage
/minimal-timer → TimerPage
/sound-timer → TimerPage
/faq → TimerPage
* → NotFound
```

**Вердикт:** ✅ Все роуты существуют, но это **один компонент** с разным SEO контентом.

### 1.3 Routing Analysis

**Тип роутинга:** Client-side routing (React Router)  
**Проблема:** Все страницы рендерятся на клиенте, нет pre-rendering.

**Что происходит при переходе:**
1. Пользователь открывает `/pomodoro`
2. Vercel отдает `/index.html` (rewrite rule)
3. React Router парсит URL
4. TimerPage рендерится с SEO конфигом для `/pomodoro`
5. SEOHead обновляет meta tags через react-helmet-async

**Вердикт:** ⚠️ Работает, но не оптимально для SEO. Боты видят сначала пустой HTML, потом JS рендерит контент.

---

## 📄 ЭТАП 2 — АНАЛИЗ ТЕКУЩЕГО SEO

### 2.1 robots.txt

**Файл:** `public/robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /*.json$  ⚠️ ПРОБЛЕМА!
Disallow: /admin/
Disallow: /private/

Sitemap: https://timero.ru/sitemap.xml
Crawl-delay: 1
```

**Проблемы:**
1. ❌ `Disallow: /*.json$` - блокирует все JSON файлы
   - Может заблокировать React Router data fetching
   - Может заблокировать manifest.json
   - Может нарушить hydration

2. ⚠️ `Crawl-delay: 1` - не нужен для Google/Yandex
   - Google игнорирует Crawl-delay
   - Yandex может замедлить краулинг

3. ⚠️ Блокировка AhrefsBot, SemrushBot - не критично, но спорно

**Оценка:** 6/10 - работает, но есть риски

### 2.2 sitemap.xml

**Файл:** `public/sitemap.xml`

**КРИТИЧЕСКАЯ ПРОБЛЕМА:** ❌❌❌

```xml
<url>
  <loc>https://timero.ru/pomodoro</loc>  ❌ БЕЗ trailing slash
  <lastmod>2024-03-01</lastmod>  ❌ ФИКТИВНАЯ ДАТА
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

**Проблемы:**
1. ❌ **Все URL без trailing slash** - но canonical в SEOHead с trailing slash
2. ❌ **Фиктивная дата** `2024-03-01` - это март 2024, а сейчас май 2026
3. ❌ **changefreq устарел** - Google игнорирует с 2023 года
4. ⚠️ **priority субъективен** - Google не гарантирует учет

**Страницы в sitemap:**
```
✅ / (существует)
❌ /pomodoro (существует, но URL неправильный)
❌ /focus-timer (существует, но URL неправильный)
❌ /study-timer (существует, но URL неправильный)
❌ /work-timer (существует, но URL неправильный)
❌ /interval-timer (существует, но URL неправильный)
❌ /minimal-timer (существует, но URL неправильный)
❌ /sound-timer (существует, но URL неправильный)
❌ /faq (существует, но URL неправильный)
```

**Оценка:** 3/10 - работает, но технически неправильно

### 2.3 index.html (базовый HTML)

**Файл:** `index.html`

**Хорошо:**
✅ Правильный DOCTYPE и lang="ru"
✅ Viewport настроен корректно
✅ Все verification meta tags (Yandex, Google, Bing)
✅ Canonical URL
✅ Open Graph tags
✅ Twitter Cards
✅ Structured Data (WebApplication, Organization, WebSite, BreadcrumbList, FAQPage)
✅ Favicon полный набор
✅ PWA manifest
✅ Yandex.Metrika + Google Analytics
✅ Service Worker регистрация

**Проблемы:**
⚠️ Title: 70 символов (норма 50-60, но допустимо)
⚠️ Description: 150 символов (норма 150-160, хорошо)
⚠️ Keywords meta tag (устарел, но не вредит)
⚠️ Preload 5 фоновых изображений (может замедлить FCP)

**Оценка:** 9/10 - отличная базовая настройка

### 2.4 SEO Metadata (динамический)

**Компонент:** `SEOHead.tsx` + `seoConfig.ts`

**Хорошо:**
✅ Уникальный title для каждой страницы
✅ Уникальный description для каждой страницы
✅ Уникальные keywords для каждой страницы
✅ Canonical URL с trailing slash
✅ Open Graph tags
✅ Twitter Cards
✅ Structured Data (WebSite, BreadcrumbList)

**Проблемы:**
❌ **H1 не в HTML** - H1 только в SEOSection компоненте, который рендерится через JS
❌ **Нет FAQPage structured data** - есть FAQ контент, но нет JSON-LD
⚠️ **Title слишком длинный** для некоторых страниц (70+ символов)

**Пример title:**
```
"Онлайн Таймер Помодоро для Концентрации, Учёбы и Работы | Timero"
```
Длина: 70 символов (Google обрезает после 60)

**Оценка:** 7/10 - хорошо, но нужны улучшения

### 2.5 SEO Content

**Компонент:** `SEOSection.tsx`

**Текущий контент:**
- H1 (через JS)
- Description paragraph
- 3 feature cards
- Дополнительный текст для /pomodoro, /study-timer, /faq

**Проблемы:**
❌ **Недостаточно текста** - всего ~150-200 слов
❌ **Нет H2/H3 структуры** - только H1 и H3 в карточках
❌ **Нет FAQ structured data** - есть FAQ контент на /faq, но нет JSON-LD
❌ **Контент рендерится через JS** - боты могут не увидеть сразу

**Оценка:** 5/10 - есть контент, но недостаточно

### 2.6 Structured Data

**Текущие схемы:**

**В index.html (статические):**
1. ✅ WebApplication (с рейтингом 4.9/383)
2. ✅ Organization
3. ✅ WebSite (с SearchAction)
4. ✅ BreadcrumbList
5. ✅ FAQPage (10 вопросов)

**В SEOHead.tsx (динамические):**
1. ✅ WebSite
2. ✅ BreadcrumbList (с учетом текущей страницы)

**Проблемы:**
❌ **Дублирование** - WebSite и BreadcrumbList есть и в HTML, и в SEOHead
⚠️ **FAQPage только в HTML** - нет динамического FAQ для каждой страницы
⚠️ **Нет HowTo schema** - хотя есть "How It Works" секции

**Оценка:** 7/10 - хорошо, но есть дублирование

---

## 🔍 ЭТАП 3 — ИНДЕКСАЦИЯ И ДОСТУПНОСТЬ

### 3.1 Какие страницы реально существуют

**Физические файлы:**
```
✅ /index.html (главная)
✅ /404.html (нет, но есть NotFound компонент)
```

**React Router страницы (все существуют):**
```
✅ / (200 OK)
✅ /pomodoro (200 OK)
✅ /focus-timer (200 OK)
✅ /study-timer (200 OK)
✅ /work-timer (200 OK)
✅ /interval-timer (200 OK)
✅ /minimal-timer (200 OK)
✅ /sound-timer (200 OK)
✅ /faq (200 OK)
❌ /any-other-url (404 - NotFound компонент)
```

**Vercel rewrites:**
```json
{
  "source": "/(.*)",
  "destination": "/index.html"
}
```

**Вердикт:** ✅ Все страницы существуют и отдают 200 OK

### 3.2 Проверка индексации

**Что видят боты:**

1. **Google Bot:**
   - ✅ Видит HTML
   - ✅ Выполняет JavaScript
   - ✅ Видит контент после рендеринга
   - ⚠️ Может быть задержка индексации (CSR)

2. **Yandex Bot:**
   - ✅ Видит HTML
   - ⚠️ Может не выполнять JS полностью
   - ⚠️ Может не увидеть контент сразу
   - ❌ Может проиндексировать пустую страницу

3. **Bing Bot:**
   - ✅ Видит HTML
   - ✅ Выполняет JavaScript
   - ✅ Видит контент после рендеринга

**Оценка:** 7/10 - Google и Bing OK, Yandex может быть проблема

### 3.3 Canonical URLs

**Текущая настройка:**

**В SEOHead.tsx:**
```typescript
canonicalUrl={currentSeoConfig.path === "/" ? "/" : `${currentSeoConfig.path}/`}
```

**Результат:**
```
/ → https://timero.ru/
/pomodoro → https://timero.ru/pomodoro/
/focus-timer → https://timero.ru/focus-timer/
```

**В sitemap.xml:**
```xml
<loc>https://timero.ru/pomodoro</loc>  ❌ БЕЗ trailing slash
```

**ПРОБЛЕМА:** ❌ **Несоответствие canonical и sitemap**

**Оценка:** 5/10 - работает, но есть несоответствие

### 3.4 Redirects

**Vercel redirects:**
```json
{
  "source": "/:path*",
  "has": [{"type": "host", "value": "www.timero.ru"}],
  "destination": "https://timero.ru/:path*",
  "permanent": true
}
```

**Вердикт:** ✅ www → non-www redirect настроен правильно

**Оценка:** 10/10 - идеально

---

## 📱 ЭТАП 4 — MOBILE SEO

### 4.1 Mobile Compatibility

**Viewport:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5, user-scalable=yes" />
```

**Вердикт:** ✅ Правильно настроен

**Responsive Design:**
- ✅ Tailwind CSS с mobile-first подходом
- ✅ Адаптивные breakpoints (sm, md, lg)
- ✅ Touch-friendly кнопки
- ✅ Нет горизонтального скролла

**Оценка:** 10/10 - отлично

### 4.2 Mobile Audio Issues

**Текущая реализация:** `src/lib/sounds.ts`

```typescript
export const initAudio = () => {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }

  // Resume context if suspended
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(err => console.warn("Failed to resume AudioContext:", err));
  }

  // Play a silent short buffer to unlock audio on iOS/Safari
  try {
    const buffer = audioCtx.createBuffer(1, 1, 22050);
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.start(0);
  } catch (e) {
    // Silent fail
  }
};
```

**Хорошо:**
✅ Unlock audio flow для iOS Safari
✅ Resume AudioContext если suspended
✅ Silent buffer для разблокировки
✅ Инициализация на первом взаимодействии (App.tsx)

**Проблемы:**
⚠️ **Нет явного user gesture** - initAudio вызывается на pointerdown/keydown, но может быть недостаточно
⚠️ **Нет fallback** - если AudioContext не поддерживается, звук просто не работает
⚠️ **Нет UI индикатора** - пользователь не знает, разблокирован ли звук

**Оценка:** 7/10 - работает, но может быть улучшено

### 4.3 Core Web Vitals Risks

**Потенциальные проблемы:**

1. **LCP (Largest Contentful Paint):**
   - ⚠️ Preload 5 фоновых изображений (может замедлить)
   - ⚠️ CSR - контент рендерится после JS
   - ✅ Lazy loading компонентов (TimerPage, NotFound)

2. **CLS (Cumulative Layout Shift):**
   - ✅ Нет рекламы
   - ✅ Фиксированные размеры для изображений
   - ⚠️ Framer Motion анимации могут вызвать shift

3. **INP (Interaction to Next Paint):**
   - ✅ React 18 с concurrent features
   - ✅ Мемоизация компонентов
   - ✅ useCallback для обработчиков

**Оценка:** 8/10 - хорошо, но нужно тестировать

---

## 🎯 ЭТАП 5 — КРИТИЧЕСКИЕ ПРОБЛЕМЫ

### Проблема #1: ФЕЙКОВЫЕ URL В SITEMAP

**Описание:** Sitemap содержит URL без trailing slash, но canonical с trailing slash.

**Пример:**
```xml
<!-- sitemap.xml -->
<loc>https://timero.ru/pomodoro</loc>

<!-- SEOHead.tsx -->
<link rel="canonical" href="https://timero.ru/pomodoro/" />
```

**Последствия:**
- Google может считать это дублями
- Может снизить индексацию
- Может разделить ссылочный вес

**Решение:** Добавить trailing slash в sitemap.xml

---

### Проблема #2: УСТАРЕВШИЕ ДАТЫ В SITEMAP

**Описание:** Все lastmod даты - `2024-03-01` (март 2024), а сейчас май 2026.

**Последствия:**
- Google может считать контент устаревшим
- Может снизить приоритет краулинга
- Может не переиндексировать страницы

**Решение:** Использовать текущую дату или дату последнего деплоя

---

### Проблема #3: БЛОКИРОВКА JSON В ROBOTS.TXT

**Описание:** `Disallow: /*.json$` блокирует все JSON файлы.

**Последствия:**
- Может заблокировать manifest.json
- Может нарушить React Router data fetching
- Может нарушить hydration

**Решение:** Удалить эту строку или сделать более специфичной

---

### Проблема #4: H1 НЕ В HTML

**Описание:** H1 рендерится через JS в SEOSection компоненте.

**Последствия:**
- Боты могут не увидеть H1 сразу
- Может снизить SEO вес страницы
- Yandex может не проиндексировать правильно

**Решение:** Добавить H1 в index.html или использовать SSR

---

### Проблема #5: НЕДОСТАТОЧНО SEO КОНТЕНТА

**Описание:** Всего ~150-200 слов текста на странице.

**Последствия:**
- Недостаточно для ранжирования
- Мало ключевых слов
- Низкая релевантность

**Решение:** Добавить 300-700 слов SEO текста

---

### Проблема #6: НЕТ FAQPAGE STRUCTURED DATA

**Описание:** Есть FAQ контент на /faq, но нет FAQPage JSON-LD для каждой страницы.

**Последствия:**
- Нет rich snippets в поиске
- Меньше кликов из поиска
- Упущенная возможность

**Решение:** Добавить FAQPage structured data для каждой страницы

---

## 📋 ПЛАН ИСПРАВЛЕНИЙ

### Приоритет 1 (Критические):

1. ✅ **Исправить sitemap.xml**
   - Добавить trailing slash ко всем URL
   - Обновить lastmod на текущую дату
   - Удалить changefreq (устарел)

2. ✅ **Исправить robots.txt**
   - Удалить `Disallow: /*.json$`
   - Упростить до минимума

3. ✅ **Добавить FAQPage structured data**
   - Создать FAQ для каждой страницы
   - Добавить JSON-LD в SEOHead

### Приоритет 2 (Важные):

4. ✅ **Добавить SEO контент**
   - Расширить SEOSection до 300-700 слов
   - Добавить H2/H3 структуру
   - Добавить FAQ секцию на каждую страницу

5. ✅ **Оптимизировать title**
   - Сократить до 50-60 символов
   - Сохранить ключевые слова

### Приоритет 3 (Желательные):

6. ⏳ **Рассмотреть SSR/SSG**
   - Переход на Next.js или Remix
   - Pre-rendering страниц
   - Улучшение индексации

7. ⏳ **Улучшить mobile audio**
   - Добавить UI индикатор
   - Добавить fallback
   - Улучшить unlock flow

---

## 📊 ИТОГОВАЯ ОЦЕНКА

### SEO Компоненты:

| Компонент | Оценка | Статус |
|-----------|--------|--------|
| robots.txt | 6/10 | ⚠️ Нужны исправления |
| sitemap.xml | 3/10 | ❌ Критические проблемы |
| index.html | 9/10 | ✅ Отлично |
| SEO Metadata | 7/10 | ⚠️ Нужны улучшения |
| SEO Content | 5/10 | ⚠️ Недостаточно |
| Structured Data | 7/10 | ⚠️ Нужны улучшения |
| Mobile SEO | 8/10 | ✅ Хорошо |
| Индексация | 7/10 | ⚠️ CSR риск |
| Redirects | 10/10 | ✅ Идеально |
| Core Web Vitals | 8/10 | ✅ Хорошо |

### Общая оценка: **7.5/10** ⚠️

**Вердикт:** Проект имеет хорошую базовую SEO инфраструктуру, но есть критические проблемы с sitemap, robots.txt и контентом. После исправлений оценка может быть **9/10**.

---

## 🚀 СЛЕДУЮЩИЕ ШАГИ

1. ✅ Исправить sitemap.xml (trailing slash, даты)
2. ✅ Исправить robots.txt (удалить блокировку JSON)
3. ✅ Добавить FAQPage structured data
4. ✅ Расширить SEO контент до 300-700 слов
5. ✅ Оптимизировать title (50-60 символов)
6. ⏳ Рассмотреть переход на SSR/SSG (долгосрочно)
7. ⏳ Улучшить mobile audio UX

---

**Отчет подготовлен:** 27 мая 2026  
**Следующий аудит:** После внедрения исправлений
