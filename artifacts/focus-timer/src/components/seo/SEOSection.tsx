import { seoConfig } from "@/config/seo";

export function SEOSection({ currentPath }: { currentPath: string }) {
  const config = Object.values(seoConfig).find(c => c.path === currentPath) || seoConfig.home;

  return (
    <section className="relative z-20 w-full max-w-4xl mx-auto px-6 pt-24 pb-12 mt-12 text-white/80 text-center">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {config.h1}
        </h1>
        <p className="text-lg leading-relaxed text-white/70 max-w-2xl mx-auto mb-10">
          {config.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-12 border-t border-white/10 pt-10">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
            <h3 className="text-white font-medium text-lg mb-2">Бесплатно и без скачивания</h3>
            <p className="text-sm text-white/60">Запускается прямо в браузере. Без установки платного ПО, без назойливой рекламы и без обязательной регистрации.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
            <h3 className="text-white font-medium text-lg mb-2">Помощь в концентрации</h3>
            <p className="text-sm text-white/60">Минималистичный дизайн без отвлекающих элементов помогает быстрее войти в состояние потока и сфокусироваться на главном.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
            <h3 className="text-white font-medium text-lg mb-2">Настраиваемые перерывы</h3>
            <p className="text-sm text-white/60">Полностью кастомизируемые интервалы времени и звуки уведомлений для учебы, интервальных тренировок или фриланса.</p>
          </div>
        </div>

        {config.path === "/pomodoro" && (
          <div className="text-left mt-12 space-y-4 text-sm text-white/70">
            <h2 className="text-white font-medium text-xl mb-4">Техника Pomodoro (Помодоро)</h2>
            <p>Техника строится на чередовании интенсивной работы и отдыха. Обычно это 25 минут полного погружения в задачу и 5 минут отдыха. Это позволяет разгружать мозг и сохранять продуктивность на протяжении всего дня.</p>
          </div>
        )}
        
        {config.path === "/study-timer" && (
          <div className="text-left mt-12 space-y-4 text-sm text-white/70">
            <h2 className="text-white font-medium text-xl mb-4">Эффективная подготовка к экзаменам</h2>
            <p>Учебный таймер станет лучшим помощником в подготовке к ЕГЭ, ОГЭ или сессии. Учеба блоками по 45 минут с 10-15 минутами перерыва имитирует академические часы и не дает мозгу выгореть.</p>
          </div>
        )}

        {config.path === "/faq" && (
          <div className="text-left mt-12 space-y-8 text-sm text-white/70">
            <h2 className="text-white font-medium text-2xl mb-6">Частые вопросы</h2>
            <div>
              <h3 className="text-white text-lg font-medium">Как пользоваться онлайн таймером?</h3>
              <p className="mt-2">Выберите время из быстрых пресетов (5м, 15м, 25м, 45м, 1ч) или установите свое время. Нажмите кнопку Play для запуска таймера. Когда время истечет, прозвучит звуковой сигнал. Таймер работает прямо в браузере без скачивания.</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-medium">Бесплатен ли таймер?</h3>
              <p className="mt-2">Да, Timero полностью бесплатный онлайн таймер без регистрации, без рекламы и без скрытых платежей.</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-medium">Работает ли таймер на телефоне?</h3>
              <p className="mt-2">Да, он оптимизирован под мобильные устройства и планшеты. Главный экран адаптируется под любой размер.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}