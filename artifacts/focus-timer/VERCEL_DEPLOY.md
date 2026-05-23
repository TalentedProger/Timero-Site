# 🚀 Полная инструкция по деплою на Vercel

## 📋 Содержание

1. [Подготовка проекта](#подготовка-проекта)
2. [Создание Git репозитория](#создание-git-репозитория)
3. [Настройка Vercel](#настройка-vercel)
4. [Деплой](#деплой)
5. [Настройка домена](#настройка-домена)
6. [Оптимизация и мониторинг](#оптимизация-и-мониторинг)
7. [Решение проблем](#решение-проблем)

---

## 1. Подготовка проекта

### Шаг 1.1: Проверка структуры проекта

Убедитесь, что ваш проект имеет следующую структуру:

```
focus-timer/
├── dist/                  # Папка сборки (создается автоматически)
├── public/               # Статические файлы
│   ├── favicon.svg
│   ├── opengraph.jpg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── manifest.json
│   └── *.jpg            # Фоновые изображения
├── src/                 # Исходный код
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── README.md
```

### Шаг 1.2: Проверка package.json

Откройте `package.json` и убедитесь, что он содержит:

```json
{
  "name": "focus-timer-premium",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --config vite.config.ts",
    "build": "vite build --config vite.config.ts",
    "preview": "vite preview --config vite.config.ts"
  }
}
```

### Шаг 1.3: Тестовая сборка

Выполните локальную сборку для проверки:

```bash
npm install
npm run build
```

Если сборка прошла успешно, вы увидите папку `dist` с файлами.

### Шаг 1.4: Создание .npmrc (КРИТИЧЕСКИ ВАЖНО!)

**Создайте файл `.npmrc` в корне проекта** для корректной работы на серверах Vercel (Linux):

```
# Ignore platform-specific optional dependencies
# This prevents EBADPLATFORM errors when deploying from Windows to Linux
optional=true

# Engine strict mode - allow installation even if engines don't match
engine-strict=false
```

**Почему это важно:**
- Ваш проект разрабатывается на Windows
- Vercel использует Linux серверы
- Без `.npmrc` npm попытается установить Windows-специфичные пакеты на Linux и упадет с ошибкой `EBADPLATFORM`
- `optional=true` позволяет npm пропускать платформо-зависимые optional dependencies

### Шаг 1.5: Проверка vercel.json

Убедитесь, что файл `vercel.json` существует и содержит:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install --force --no-optional",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Важные параметры:**
- `framework: "vite"` - явно указывает Vercel использовать Vite
- `installCommand: "npm install --force --no-optional"` - пропускает optional dependencies (платформо-зависимые пакеты)
- `--force` - игнорирует конфликты и продолжает установку
- `--no-optional` - не устанавливает optional dependencies вообще

---

## 2. Создание Git репозитория

### Шаг 2.1: Инициализация Git

Откройте терминал в папке проекта и выполните:

```bash
git init
git add .
git commit -m "Initial commit: Premium Focus Timer"
```

### Шаг 2.2: Создание репозитория на GitHub

1. Перейдите на [GitHub](https://github.com)
2. Нажмите "New repository"
3. Название: `premium-focus-timer`
4. Описание: `Premium Focus Timer - Pomodoro Timer with Beautiful Backgrounds`
5. Выберите "Public" или "Private"
6. **НЕ** добавляйте README, .gitignore или лицензию (они уже есть)
7. Нажмите "Create repository"

### Шаг 2.3: Подключение к GitHub

Выполните команды, которые GitHub покажет после создания репозитория:

```bash
git remote add origin https://github.com/ВАШ_USERNAME/premium-focus-timer.git
git branch -M main
git push -u origin main
```

**Важно:** Замените `ВАШ_USERNAME` на ваше имя пользователя GitHub.

---

## 3. Настройка Vercel

### Шаг 3.1: Создание аккаунта Vercel

1. Перейдите на [Vercel](https://vercel.com)
2. Нажмите "Sign Up"
3. Выберите "Continue with GitHub"
4. Авторизуйте Vercel для доступа к вашим репозиториям

### Шаг 3.2: Импорт проекта

1. На главной странице Vercel нажмите "Add New..."
2. Выберите "Project"
3. Найдите репозиторий `premium-focus-timer`
4. Нажмите "Import"

### Шаг 3.3: Настройка проекта

На странице настройки проекта:

**Framework Preset:**
- Выберите "Vite" (или оставьте "Other" - Vercel автоматически определит)

**Root Directory:**
- Оставьте пустым (или `./`)

**Build and Output Settings:**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install --force --no-optional`

**Environment Variables:**
- Пока не нужны (оставьте пустым)

**ВАЖНО:** 
- Команда установки `npm install --force --no-optional` критически важна
- `--no-optional` пропускает платформо-зависимые пакеты (Windows-специфичные на Linux серверах)
- `--force` игнорирует конфликты и продолжает установку
- Без этого деплой упадет с ошибкой `EBADPLATFORM`

### Шаг 3.4: Деплой

1. Нажмите "Deploy"
2. Дождитесь завершения сборки (обычно 1-3 минуты)
3. После успешного деплоя вы увидите URL вашего сайта

---

## 4. Деплой

### Автоматический деплой

После первоначальной настройки, каждый push в ветку `main` будет автоматически деплоиться:

```bash
# Внесите изменения в код
git add .
git commit -m "Update: описание изменений"
git push origin main
```

Vercel автоматически:
1. Обнаружит изменения
2. Запустит сборку
3. Задеплоит новую версию
4. Предоставит preview URL

### Preview деплой

Для тестирования изменений создайте отдельную ветку:

```bash
git checkout -b feature/new-feature
# Внесите изменения
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

Vercel создаст preview деплой с уникальным URL для тестирования.

---

## 5. Настройка домена

### Шаг 5.1: Добавление домена

1. В панели Vercel откройте ваш проект
2. Перейдите в "Settings" → "Domains"
3. Нажмите "Add"
4. Введите ваш домен (например, `focustimer.com`)

### Шаг 5.2: Настройка DNS

Vercel предоставит DNS записи. Добавьте их у вашего регистратора домена:

**Для корневого домена (focustimer.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Для www поддомена:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Шаг 5.3: Проверка

1. Дождитесь распространения DNS (до 48 часов, обычно 1-2 часа)
2. Vercel автоматически выпустит SSL сертификат
3. Ваш сайт будет доступен по HTTPS

---

## 6. Оптимизация и мониторинг

### Шаг 6.1: Analytics

1. В панели Vercel откройте проект
2. Перейдите в "Analytics"
3. Включите "Web Analytics"
4. Добавьте скрипт в `index.html` (Vercel предоставит код)

### Шаг 6.2: Speed Insights

1. Перейдите в "Speed Insights"
2. Включите функцию
3. Мониторьте производительность

### Шаг 6.3: Настройка кэширования

Vercel автоматически кэширует статические файлы. Дополнительная настройка в `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Шаг 6.4: Мониторинг ошибок

Рекомендуется интегрировать Sentry:

```bash
npm install @sentry/react
```

Добавьте в `main.tsx`:

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

---

## 7. Решение проблем

### Проблема 1: Ошибка "EBADPLATFORM" при установке зависимостей

**Симптомы:**
```
npm error code EBADPLATFORM
npm error notsup Unsupported platform for @rollup/rollup-win32-x64-msvc
npm error notsup Valid os: win32
npm error notsup Actual os: linux
```

**Причина:** 
- Проект разрабатывался на Windows
- Vercel использует Linux серверы
- `package-lock.json` содержит Windows-специфичные optional dependencies

**Решение:**

1. **Создайте файл `.npmrc` в корне проекта:**
```
# Ignore platform-specific optional dependencies
# This prevents EBADPLATFORM errors when deploying from Windows to Linux
optional=true

# Engine strict mode - allow installation even if engines don't match
engine-strict=false
```

2. **Обновите `vercel.json`:**
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install --force --no-optional"
}
```

3. **В настройках Vercel проекта:**
   - Settings → General → Build & Development Settings
   - Install Command: `npm install --force --no-optional`

4. **Коммит и пуш:**
```bash
git add .npmrc vercel.json
git commit -m "Fix: Add .npmrc for cross-platform compatibility"
git push origin main
```

### Проблема 2: Ошибка сборки "Module not found"

**Решение:**
```bash
# Удалите node_modules и lock файлы
rm -rf node_modules package-lock.json
# Переустановите зависимости
npm install
# Попробуйте собрать локально
npm run build
```

### Проблема 3: 404 при переходе по прямым ссылкам

**Причина:** Не настроен роутинг для SPA

**Решение:** Убедитесь, что в `vercel.json` есть:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Проблема 3: 404 при переходе по прямым ссылкам

**Причина:** Не настроен роутинг для SPA

**Решение:** Убедитесь, что в `vercel.json` есть:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Проблема 4: Изображения не загружаются

**Причина:** Неправильные пути к изображениям

**Решение:**
- Убедитесь, что изображения в папке `public/`
- Используйте абсолютные пути: `/image.jpg` вместо `./image.jpg`
- Проверьте регистр имен файлов (Linux чувствителен к регистру)

### Проблема 5: Медленная загрузка

**Решение:**
1. Оптимизируйте изображения (используйте WebP)
2. Включите lazy loading
3. Используйте code splitting
4. Проверьте размер бандла: `npm run build -- --analyze`

### Проблема 6: Ошибки TypeScript при сборке

**Решение:**
```bash
# Проверьте типы локально
npm run typecheck
# Исправьте ошибки
# Если нужно временно отключить проверку типов:
# В vite.config.ts добавьте:
{
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
        warn(warning);
      }
    }
  }
}
```

### Проблема 7: Превышен лимит размера функций

**Причина:** Слишком большой размер бандла

**Решение:**
1. Используйте dynamic imports
2. Разделите код на чанки
3. Удалите неиспользуемые зависимости
4. Используйте tree shaking

---

## 📊 Чеклист перед деплоем

- [ ] Создан файл `.npmrc` для кросс-платформенной совместимости
- [ ] Локальная сборка работает (`npm run build`)
- [ ] Все изображения оптимизированы
- [ ] SEO мета-теги заполнены
- [ ] robots.txt и sitemap.xml созданы
- [ ] .gitignore настроен правильно
- [ ] Удалены все упоминания Replit
- [ ] Проверена работа на мобильных устройствах
- [ ] Настроены переменные окружения (если нужны)
- [ ] README.md обновлен
- [ ] Лицензия добавлена
- [ ] vercel.json содержит правильную команду установки

---

## 🎉 Готово!

Ваш Premium Focus Timer теперь доступен онлайн!

### Полезные ссылки:

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev

### Следующие шаги:

1. Настройте Google Analytics
2. Добавьте Yandex Metrika для русскоязычной аудитории
3. Настройте мониторинг ошибок (Sentry)
4. Создайте страницу в социальных сетях
5. Оптимизируйте для поисковых систем

---

**Удачи с вашим проектом! 🚀**

Если возникнут вопросы, обращайтесь к документации Vercel или создайте Issue в репозитории.
