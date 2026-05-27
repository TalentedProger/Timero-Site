import { seoConfig } from "@/config/seo";
import { faqData } from "@/config/faq";

export function SEOSection({ currentPath }: { currentPath: string }) {
  const config = Object.values(seoConfig).find(c => c.path === currentPath) || seoConfig.home;
  const pageKey = currentPath === "/" ? "home" : currentPath.replace("/", "").replace(/-/g, "");
  const faqs = faqData[pageKey] || faqData.home;

  return (
    <section className="relative z-20 w-full max-w-4xl mx-auto px-6 pt-24 pb-12 mt-12 text-white/80">
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

        {config.path === "/" && (
          <div className="text-left mt-12 space-y-6 text-sm text-white/70 border-t border-white/10 pt-10">
            <h2 className="text-white font-medium text-2xl mb-4">Timero — Эффективный онлайн таймер для максимальной продуктивности</h2>
            <p>В современном отвлекающем цифровом мире способность удерживать фокус становится ключевым навыком. Timero — это многофункциональный <strong>онлайн таймер</strong> (или focus timer), специально разработанный для глубокой концентрации, учёбы и работы. Благодаря встроенной поддержке популярной методики управления временем, вы можете использовать его как классический таймер помодоро (Pomodoro timer), устанавливая периоды интенсивной деятельности и короткие перерывы, или настраивать произвольные интервалы для своих задач.</p>
            <h3 className="text-white font-medium text-xl mt-6 mb-3">Почему важно использовать таймер для работы и учёбы?</h3>
            <p>Работа без пауз часто приводит к выгоранию и потере внимания. Используя онлайн таймер с грамотно настроенными интервалами, вы помогаете мозгу переключаться и отдыхать. Это напрямую влияет на вашу продуктивность. Неважно, готовитесь ли вы к экзаменам, пишете программный код или читаете профессиональную литературу — структурированный подход увеличит объём выполненной работы и снизит усталость.</p>
            <h3 className="text-white font-medium text-xl mt-6 mb-3">Особенности платформы: статистика, звуки и визуальный комфорт</h3>
            <p>Многие инструменты предлагают только сухой обратный отсчёт. В Timero мы пошли дальше: приятные <strong>звуки</strong> оповещают об окончании сессии, помогая не пропустить перерыв. Встроенная <strong>статистика</strong> наглядно показывает, сколько времени было потрачено с пользой каждый день. Красивое визуальное оформление (с возможностью развернуть приложение на полный экран) создаёт идеальное цифровое пространство, чтобы ваша <strong>работа</strong> или <strong>учёба</strong> проходили без лишнего визуального шума. Повышайте качество своей <strong>концентрации</strong> и выводите свою <strong>productivity</strong> на новый уровень вместе с Timero.</p>
          </div>
        )}

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

        {/* FAQ Section */}
        <div className="text-left mt-12 space-y-6 text-sm text-white/70 border-t border-white/10 pt-10">
          <h2 className="text-white font-medium text-2xl mb-6">Часто задаваемые вопросы</h2>
          {faqs.slice(0, 4).map((faq, index) => (
            <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/5">
              <h3 className="text-white text-base font-medium mb-2">{faq.question}</h3>
              <p className="text-white/60 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}