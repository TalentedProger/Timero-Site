# 🔧 ФИНАЛЬНОЕ ИСПРАВЛЕНИЕ - Настройки Vercel Dashboard

## ❌ Текущая проблема

Vercel установил только **137 пакетов** вместо нужных, и **не установился `@tailwindcss/vite`**.

Логи показывают:
```
Running "install" command: `npm install --include=dev`...
added 137 packages  ← НЕПРАВИЛЬНО! Должно быть ~143 пакета
```

## 🔍 Причина

В **Vercel Dashboard** установлен **Root Directory = `artifacts/focus-timer`**, но команда установки **не учитывает это** и выполняется из корня репозитория, где нет нужных зависимостей.

## ✅ РЕШЕНИЕ

### Вариант 1: Удалить Root Directory из Dashboard (РЕКОМЕНДУЕТСЯ)

Это позволит использовать корневой `vercel.json` с правильными командами.

**Шаги:**

1. Откройте https://vercel.com/dashboard
2. Выберите проект `focus-timer` (или как вы его назвали)
3. Settings → General → **Root Directory**
4. **Очистите поле Root Directory** (должно быть пустым)
5. Settings → General → Build & Development Settings
6. **Очистите ВСЕ поля:**
   - Build Command: **удалите**
   - Output Directory: **удалите**
   - Install Command: **удалите**
7. Save
8. Deployments → Redeploy

После этого Vercel будет использовать **корневой `vercel.json`** с правильными командами:
```json
{
  "buildCommand": "cd artifacts/focus-timer && npm run build",
  "outputDirectory": "artifacts/focus-timer/dist",
  "installCommand": "cd artifacts/focus-timer && npm install --include=dev"
}
```

### Вариант 2: Оставить Root Directory, но исправить команды

Если хотите оставить Root Directory:

1. Settings → General → Root Directory: `artifacts/focus-timer`
2. Settings → General → Build & Development Settings:
   - Build Command: `npm run build` (БЕЗ cd)
   - Output Directory: `dist` (БЕЗ artifacts/focus-timer)
   - Install Command: `npm install --include=dev` (БЕЗ cd)
3. Save
4. Deployments → Redeploy

## 🎯 Проверка успешного деплоя

После Redeploy в логах должно быть:

**Если используете Вариант 1 (без Root Directory):**
```
✅ Running "install" command: `cd artifacts/focus-timer && npm install --include=dev`...
✅ added 143 packages, and audited 148 packages
✅ > focus-timer-premium@1.0.0 build
✅ > vite build --config vite.config.ts
✅ vite v6.4.2 building for production...
✅ ✓ built in ~8s
```

**Если используете Вариант 2 (с Root Directory):**
```
✅ Running "install" command: `npm install --include=dev`...
✅ added 143 packages, and audited 148 packages
✅ > focus-timer-premium@1.0.0 build
✅ > vite build --config vite.config.ts
✅ vite v6.4.2 building for production...
✅ ✓ built in ~8s
```

## 📋 Почему это важно

**Root Directory** в Vercel меняет рабочую директорию для ВСЕХ команд:
- Если Root Directory = `artifacts/focus-timer`, то команды выполняются ИЗ этой папки
- Если Root Directory пустой, команды выполняются из корня репозитория

**Наш монорепозиторий требует:**
- Команды должны выполняться из корня
- Но устанавливать зависимости нужно в `artifacts/focus-timer`
- Поэтому используем `cd artifacts/focus-timer &&` в командах

## 🚀 Рекомендация

Используйте **Вариант 1** (очистить Root Directory), потому что:
- ✅ Все настройки в `vercel.json` (версионируются в Git)
- ✅ Правильная работа с монорепозиторием
- ✅ Проще поддерживать и документировать

---

**После исправления настроек сделайте Redeploy!** 🎉
