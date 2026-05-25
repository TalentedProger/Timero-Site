# 🚀 Руководство по Деплою Premium Focus Timer на timero.ru

## ✅ Что уже сделано

### 1. SEO Оптимизация
- ✅ Все мета-теги обновлены на timero.ru
- ✅ Open Graph теги для социальных сетей
- ✅ Twitter Cards
- ✅ Structured Data (Schema.org):
  - WebApplication
  - Organization
  - BreadcrumbList
  - FAQPage (5 вопросов)
- ✅ Yandex.Metrika скрипт добавлен
- ✅ Google Analytics скрипт добавлен

### 2. Favicon'ы и Иконки
- ✅ Современная SVG иконка часов (градиент)
- ✅ PNG версии сгенерированы:
  - favicon-16x16.png
  - favicon-32x32.png
  - apple-touch-icon.png (180x180)
  - android-chrome-192x192.png
  - android-chrome-512x512.png
- ✅ Open Graph изображение (1200x630)
- ✅ PWA manifest (site.webmanifest)

### 3. Безопасность
- ✅ HSTS заголовок
- ✅ Content Security Policy (CSP)
- ✅ X-Frame-Options, X-XSS-Protection
- ✅ Referrer-Policy
- ✅ Permissions-Policy

### 4. SEO Файлы
- ✅ robots.txt (обновлен на timero.ru)
- ✅ sitemap.xml (обновлен на timero.ru)

---

## 📋 Шаги для Деплоя

### Шаг 1: Настройка DNS на reg.ru

Зайдите в панель управления доменом timero.ru на reg.ru:

#### Для основного домена (timero.ru):
1. Выберите опцию **"IP-адрес"**
2. Введите IP: `216.198.79.1`
3. Тип записи: **A**
4. Хост: **@** (или оставьте пустым)
5. Сохраните изменения

#### Для поддомена www (www.timero.ru):
1. Добавьте новую запись
2. Выберите тип: **CNAME**
3. Хост: **www**
4. Значение: `e4bad6fce63536d5.vercel-dns-017.com.`
5. Сохраните изменения

**⏱️ Ожидание:** DNS изменения вступят в силу через 10-30 минут (максимум до 24 часов).

---

### Шаг 2: Проверка Настроек Vercel

Убедитесь, что в Vercel Dashboard настроено:

#### Для timero.ru:
- **Domain:** timero.ru
- **Environment:** Production
- **DNS Record:** A @ 216.198.79.1

#### Для www.timero.ru:
- **Redirect to:** timero.ru
- **Type:** 308 Permanent Redirect
- **DNS Record:** CNAME www e4bad6fce63536d5.vercel-dns-017.com.

#### Build Settings:
- **Framework Preset:** Vite
- **Root Directory:** `artifacts/focus-timer`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install --include=dev`

---

### Шаг 3: Замена ID Аналитики

#### Yandex.Metrika:
1. Зайдите на https://metrika.yandex.ru/
2. Создайте новый счетчик для timero.ru
3. Скопируйте ID счетчика (например: 98765432)
4. Откройте `index.html`
5. Найдите строку: `ym(98765432, "init", {`
6. Замените `98765432` на ваш реальный ID

#### Google Analytics:
1. Зайдите на https://analytics.google.com/
2. Создайте новое свойство для timero.ru
3. Скопируйте Measurement ID (формат: G-XXXXXXXXXX)
4. Откройте `index.html`
5. Найдите строку: `gtag('config', 'G-XXXXXXXXXX');`
6. Замените `G-XXXXXXXXXX` на ваш реальный ID
7. Также замените в URL: `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`

---

### Шаг 4: Коммит и Деплой

```bash
# Перейдите в директорию проекта
cd e:\it\Premium-Focus-Suite\Premium-Focus-Suite

# Добавьте все изменения
git add .

# Создайте коммит
git commit -m "Complete SEO optimization and domain setup for timero.ru"

# Отправьте на GitHub
git push origin main
```

Vercel автоматически задеплоит изменения.

---

### Шаг 5: Проверка После Деплоя

#### Проверка Домена:
1. Откройте https://timero.ru
2. Проверьте, что сайт загружается
3. Проверьте, что www.timero.ru редиректит на timero.ru
4. Проверьте SSL сертификат (замок в браузере)

#### Проверка Favicon'ов:
1. Откройте timero.ru
2. Проверьте иконку во вкладке браузера
3. Добавьте сайт в закладки - проверьте иконку
4. На iOS: добавьте на главный экран - проверьте apple-touch-icon

#### Проверка Open Graph:
1. Используйте https://www.opengraph.xyz/
2. Введите https://timero.ru
3. Проверьте, что отображается правильное изображение и текст

#### Проверка SEO:
1. **Google Rich Results Test:** https://search.google.com/test/rich-results
   - Введите https://timero.ru
   - Проверьте structured data

2. **PageSpeed Insights:** https://pagespeed.web.dev/
   - Проверьте скорость загрузки
   - Цель: 90+ баллов

3. **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
   - Проверьте мобильную версию

#### Проверка Аналитики:
1. Откройте Yandex.Metrika
2. Проверьте, что счетчик работает (Real-time данные)
3. Откройте Google Analytics
4. Проверьте Real-time отчеты

---

## 🔧 Дополнительные Настройки

### Регистрация в Поисковых Системах

#### Google Search Console:
1. Зайдите на https://search.google.com/search-console
2. Добавьте свойство: timero.ru
3. Подтвердите владение (через DNS или HTML файл)
4. Отправьте sitemap: https://timero.ru/sitemap.xml

#### Yandex Webmaster:
1. Зайдите на https://webmaster.yandex.ru/
2. Добавьте сайт: timero.ru
3. Подтвердите владение
4. Отправьте sitemap: https://timero.ru/sitemap.xml

#### Bing Webmaster Tools:
1. Зайдите на https://www.bing.com/webmasters
2. Добавьте сайт: timero.ru
3. Подтвердите владение
4. Отправьте sitemap

---

## 📊 Мониторинг

### Что отслеживать:

1. **Трафик:**
   - Yandex.Metrika: посещения, источники, поведение
   - Google Analytics: сессии, пользователи, конверсии

2. **Позиции в поиске:**
   - Google Search Console: запросы, клики, показы
   - Yandex Webmaster: запросы, позиции

3. **Производительность:**
   - PageSpeed Insights: регулярные проверки
   - Vercel Analytics: время загрузки

4. **Ошибки:**
   - Google Search Console: ошибки индексации
   - Yandex Webmaster: проблемы с сайтом
   - Vercel Logs: ошибки сервера

---

## 🎯 Целевые Метрики

### SEO:
- Индексация в Google: 1-2 недели
- Индексация в Yandex: 3-7 дней
- Позиции по ключевым запросам: 1-3 месяца

### Производительность:
- PageSpeed Score: 90+ (mobile и desktop)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

### Пользовательский Опыт:
- Bounce Rate: < 50%
- Average Session Duration: > 2 минуты
- Pages per Session: > 2

---

## 🐛 Решение Проблем

### Домен не работает:
1. Проверьте DNS записи: https://dnschecker.org/
2. Подождите 24 часа для полной пропагации
3. Очистите кэш браузера (Ctrl+Shift+Delete)
4. Проверьте статус в Vercel Dashboard

### Favicon не отображается:
1. Очистите кэш браузера
2. Проверьте, что файлы существуют: https://timero.ru/favicon-32x32.png
3. Проверьте консоль браузера на ошибки 404

### Open Graph не работает:
1. Проверьте, что opengraph.jpg существует
2. Используйте https://www.opengraph.xyz/ для отладки
3. Очистите кэш Facebook: https://developers.facebook.com/tools/debug/

### Аналитика не работает:
1. Проверьте, что заменили placeholder ID на реальные
2. Проверьте консоль браузера на ошибки
3. Отключите AdBlock для проверки
4. Проверьте Real-time отчеты через 5-10 минут

---

## 📞 Поддержка

### Документация:
- Vercel: https://vercel.com/docs
- Yandex.Metrika: https://yandex.ru/support/metrika/
- Google Analytics: https://support.google.com/analytics

### Полезные Инструменты:
- DNS Checker: https://dnschecker.org/
- SSL Checker: https://www.sslshopper.com/ssl-checker.html
- Open Graph Debugger: https://www.opengraph.xyz/
- Rich Results Test: https://search.google.com/test/rich-results
- PageSpeed Insights: https://pagespeed.web.dev/

---

## ✅ Финальный Чеклист

Перед запуском убедитесь:

- [ ] DNS настроен на reg.ru (A и CNAME записи)
- [ ] Vercel Dashboard показывает домен как активный
- [ ] SSL сертификат выпущен (зеленый замок)
- [ ] Yandex.Metrika ID заменен на реальный
- [ ] Google Analytics ID заменен на реальный
- [ ] Все favicon'ы отображаются корректно
- [ ] Open Graph изображение работает
- [ ] robots.txt доступен: https://timero.ru/robots.txt
- [ ] sitemap.xml доступен: https://timero.ru/sitemap.xml
- [ ] Сайт добавлен в Google Search Console
- [ ] Сайт добавлен в Yandex Webmaster
- [ ] Sitemap отправлен в поисковые системы
- [ ] PageSpeed Score > 90
- [ ] Mobile-Friendly Test пройден
- [ ] Аналитика работает (Real-time данные)

---

## 🎉 Готово!

После выполнения всех шагов ваш сайт будет:
- ✅ Доступен по адресу timero.ru
- ✅ Оптимизирован для SEO
- ✅ Защищен SSL сертификатом
- ✅ Отслеживается аналитикой
- ✅ Индексируется поисковыми системами
- ✅ Готов к продвижению

**Удачи с запуском! 🚀**
