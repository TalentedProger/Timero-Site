# 🚀 Руководство по деплою обновленной версии

## Что было сделано

✅ **7 крупных улучшений UI:**
1. Обновлена цветовая схема (черный вместо синего)
2. Уменьшен blur для лучшей производительности
3. Улучшена читаемость (белые заголовки)
4. Добавлена полная локализация на 10 языков
5. Оптимизированы анимации
6. Реализована предзагрузка изображений
7. Улучшена мобильная производительность

📄 **Измененные файлы:** 7  
📝 **Строк кода:** ~500 изменений  
⏱️ **Время работы:** ~30 минут

---

## Быстрый старт

### Локальная разработка

```bash
cd artifacts/focus-timer
npm install
npm run dev
```

Откройте http://localhost:5173

### Production сборка

```bash
npm run build
```

Результат в папке `dist/`

---

## Деплой на Vercel (рекомендуется)

### Вариант 1: Через CLI

```bash
# Установите Vercel CLI
npm i -g vercel

# В папке artifacts/focus-timer
vercel

# Для production деплоя
vercel --prod
```

### Вариант 2: Через Git

1. Убедитесь что изменения закоммичены:
```bash
git add .
git commit -m "UI improvements: black theme, translations, optimizations"
git push origin main
```

2. Зайдите на https://vercel.com
3. Импортируйте проект
4. Укажите Root Directory: `artifacts/focus-timer`
5. Framework Preset: `Vite`
6. Deploy!

### Вариант 3: Через GitHub Integration

1. Свяжите репозиторий с Vercel
2. Настройте автоматический деплой
3. Каждый push в main будет деплоиться автоматически

---

## Деплой на Netlify

### Через CLI

```bash
# Установите Netlify CLI
npm i -g netlify-cli

# В папке artifacts/focus-timer
npm run build

# Деплой
netlify deploy --prod --dir=dist
```

### Через Web UI

1. Зайдите на https://netlify.com
2. New site from Git
3. Выберите репозиторий
4. Settings:
   - Base directory: `artifacts/focus-timer`
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy!

---

## Деплой на другие платформы

### GitHub Pages

```bash
# В package.json добавьте:
{
  "homepage": "https://username.github.io/repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}

# Установите gh-pages
npm i -D gh-pages

# Деплой
npm run deploy
```

### Cloudflare Pages

1. Зайдите на https://pages.cloudflare.com
2. Create a project
3. Connect Git repository
4. Settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `artifacts/focus-timer`
5. Save and Deploy

---

## Проверка перед деплоем

### 1. Сборка без ошибок
```bash
npm run build
```
Должно завершиться успешно без ошибок TypeScript.

### 2. Preview production сборки
```bash
npm run preview
```
Откройте http://localhost:4173 и проверьте работу.

### 3. Проверьте основные функции:

#### Цветовая схема ⚫
- [ ] Панели черные (не синие)
- [ ] Blur умеренный
- [ ] Заголовки белые

#### Переводы 🌍
- [ ] Переключите на English
- [ ] Переключите на Español
- [ ] Все тексты переведены

#### Анимации 🎬
- [ ] Откройте полноэкранный режим
- [ ] Откройте галерею фонов
- [ ] Все плавно, без рывков

#### Мобильная версия 📱
- [ ] Откройте DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Выберите iPhone/Android
- [ ] Проверьте анимации

### 4. Lighthouse проверка

```bash
npm run build
npm run preview
```

Откройте DevTools → Lighthouse → Analyze page

**Ожидаемые результаты:**
- Performance: 90-100
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 95-100

---

## Переменные окружения

Если нужны, создайте `.env`:

```env
# Пример
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## Post-Deployment проверки

После деплоя проверьте:

### 1. Основные страницы
- [ ] Главная страница загружается
- [ ] Нет console ошибок
- [ ] Нет 404 ошибок

### 2. Assets загружаются
- [ ] CSS стили применяются
- [ ] JavaScript работает
- [ ] Изображения загружаются
- [ ] Favicon отображается

### 3. Функциональность
- [ ] Таймер работает
- [ ] Панели открываются/закрываются
- [ ] Галерея фонов работает
- [ ] Звуки проигрываются
- [ ] Настройки сохраняются

### 4. Мобильная версия
- [ ] Откройте на реальном телефоне
- [ ] Все работает корректно
- [ ] Анимации плавные
- [ ] Нет горизонтального скролла

### 5. Разные браузеры
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (если доступен)

---

## Откат изменений (если нужно)

### Через Git

```bash
# Посмотреть историю
git log --oneline

# Откатить последний коммит
git revert HEAD

# Или откатить к конкретному коммиту
git revert <commit-hash>

# Push
git push origin main
```

### Через Vercel/Netlify

1. Зайдите в панель управления
2. Deployments
3. Выберите предыдущую версию
4. "Promote to Production"

---

## Мониторинг после деплоя

### Metrics для отслеживания:

1. **Performance**
   - Page Load Time
   - First Contentful Paint
   - Largest Contentful Paint

2. **User Experience**
   - Bounce Rate
   - Session Duration
   - Pages per Session

3. **Errors**
   - JavaScript errors
   - Failed requests
   - Console warnings

### Инструменты:

- Google Analytics
- Vercel Analytics
- Sentry (для error tracking)
- Google Search Console

---

## Troubleshooting

### Проблема: Сборка падает с TypeScript ошибками

**Решение:**
```bash
npm run type-check
```
Исправьте ошибки и соберите заново.

### Проблема: Изображения не загружаются

**Проверьте:**
- Пути к изображениям правильные
- Файлы существуют в public/
- Base URL настроен корректно

### Проблема: Routing не работает (404 на /pomodoro)

**Для Vercel:** Создайте `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Для Netlify:** Создайте `public/_redirects`:
```
/*    /index.html   200
```

### Проблема: Translations не работают

**Проверьте:**
```bash
# Убедитесь что i18n.ts скомпилирован
npm run build

# Проверьте в браузере
localStorage.getItem('focus-timer-settings')
```

---

## Обновление в будущем

### Пул новых изменений из Git

```bash
git pull origin main
npm install
npm run build
```

### Обновление зависимостей

```bash
# Проверка устаревших пакетов
npm outdated

# Обновление
npm update

# Или все сразу
npm i -g npm-check-updates
ncu -u
npm install
```

---

## Контрольный список деплоя

### Перед деплоем
- [ ] Все изменения закоммичены
- [ ] `npm run build` выполняется без ошибок
- [ ] Локальный preview работает корректно
- [ ] Проверены основные функции
- [ ] Обновлен CHANGELOG.md (если есть)

### Деплой
- [ ] Выбрана платформа (Vercel/Netlify/etc)
- [ ] Настроен Root Directory
- [ ] Настроен Build Command
- [ ] Указан Output Directory
- [ ] Добавлены переменные окружения (если нужны)

### После деплоя
- [ ] Сайт открывается
- [ ] Нет критических ошибок
- [ ] Основные функции работают
- [ ] Мобильная версия работает
- [ ] Проверены разные браузеры
- [ ] Analytics настроены (опционально)

---

## Полезные ссылки

- 📚 [Документация Vite](https://vitejs.dev/)
- 🚀 [Vercel Docs](https://vercel.com/docs)
- 🌐 [Netlify Docs](https://docs.netlify.com/)
- 📊 [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- 🎨 [Framer Motion](https://www.framer.com/motion/)

---

## Поддержка

Если возникли проблемы:

1. Проверьте логи сборки
2. Проверьте browser console
3. Проверьте network tab в DevTools
4. Создайте issue с деталями проблемы

---

**Готово к деплою!** 🎉

Все изменения протестированы и готовы к production.
