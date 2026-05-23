# ⚡ Быстрое исправление Vercel деплоя

## 🚨 Если видите ошибку EBADPLATFORM

```bash
# 1. Создайте .npmrc в корне проекта
echo "optional=true" > .npmrc
echo "platform=linux" >> .npmrc
echo "legacy-peer-deps=false" >> .npmrc

# 2. Закоммитьте и запушьте
git add .npmrc vercel.json
git commit -m "Fix: Cross-platform deployment"
git push origin main

# 3. Vercel автоматически пересоберет проект
```

## ✅ Готово!

Файлы уже созданы и настроены:
- ✅ `.npmrc` - конфигурация для кросс-платформенной установки
- ✅ `vercel.json` - правильная команда установки
- ✅ `VERCEL_DEPLOY.md` - полная инструкция

**Просто закоммитьте и запушьте изменения!**

---

## 📖 Подробности

Смотрите:
- `VERCEL_FIX_SUMMARY.md` - детальное объяснение проблемы и решения
- `VERCEL_DEPLOY.md` - полная инструкция по деплою
