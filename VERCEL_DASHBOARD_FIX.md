# 🔧 Исправление настроек Vercel Dashboard

## ❌ Проблема

Vercel использует **настройки из Dashboard**, которые переопределяют `vercel.json`. Текущие настройки в Dashboard:

```
Framework Preset: Vite
Root Directory: пустое (./  )
Build Command: npm run build
Output Directory: dist
Install Command: npm install --force --no-optional
```

Эти настройки **неправильные** для монорепозитория и используют **старую команду установки**.

## ✅ Решение

### Вариант 1: Удалить настройки из Dashboard (Рекомендуется)

Это позволит Vercel использовать `vercel.json` из репозитория.

1. Откройте [Vercel Dashboard](https://vercel.com/dashboard)
2. Выберите проект `Timero-Site`
3. Перейдите в **Settings** → **General** → **Build & Development Settings**
4. **Очистите все поля:**
   - Framework Preset: оставьте "Other" или пустым
   - Root Directory: **очистите поле** (должно быть пустым)
   - Build Command: **очистите поле**
   - Output Directory: **очистите поле**
   - Install Command: **очистите поле**
5. Нажмите **Save**
6. Перейдите в **Deployments**
7. Нажмите **Redeploy** на последнем деплое

### Вариант 2: Обновить настройки в Dashboard

Если хотите оставить настройки в Dashboard, обновите их:

1. Откройте [Vercel Dashboard](https://vercel.com/dashboard)
2. Выберите проект `Timero-Site`
3. Перейдите в **Settings** → **General** → **Build & Development Settings**
4. **Обновите настройки:**
   - Framework Preset: `Vite`
   - Root Directory: **оставьте пустым**
   - Build Command: `cd artifacts/focus-timer && npm run build`
   - Output Directory: `artifacts/focus-timer/dist`
   - Install Command: `cd artifacts/focus-timer && npm install --include=dev --no-optional`
5. Нажмите **Save**
6. Перейдите в **Deployments**
7. Нажмите **Redeploy** на последнем деплое

## 🎯 Почему это важно

**Приоритет настроек:**
1. **Dashboard Settings** (самый высокий приоритет) ← текущая проблема
2. `vercel.json` в корне репозитория
3. Автоматическое определение Vercel

Если в Dashboard есть настройки, Vercel **игнорирует** `vercel.json`.

## ✅ Правильная конфигурация

После исправления Vercel будет использовать настройки из `vercel.json`:

```json
{
  "buildCommand": "cd artifacts/focus-timer && npm run build",
  "outputDirectory": "artifacts/focus-timer/dist",
  "installCommand": "cd artifacts/focus-timer && npm install --include=dev --no-optional",
  "ignoreCommand": "git diff --quiet HEAD^ HEAD ./artifacts/focus-timer"
}
```

## 📋 Проверка

После Redeploy проверьте логи:

**Должно быть:**
```
Running "install" command: `cd artifacts/focus-timer && npm install --include=dev --no-optional`...
added 135 packages, and audited 140 packages in 10s
```

**Не должно быть:**
```
Running "install" command: `npm install --force --no-optional`...
added 137 packages, and audited 142 packages in 10s
```

---

**Рекомендация:** Используйте **Вариант 1** (удалить настройки из Dashboard), чтобы все настройки были в `vercel.json` и версионировались в Git.
