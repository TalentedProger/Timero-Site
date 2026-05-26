import { Link } from "react-router-dom";
import { seoConfig } from "@/config/seo";

export function SEOFooter() {
  const links = Object.values(seoConfig);

  return (
    <div className="w-full bg-black/80 border-t border-white/10 text-white/60 py-12 px-6 mt-24 relative z-20 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 justify-between">
        <div className="max-w-md">
          <h2 className="text-white font-semibold mb-4 text-lg">Timero - Онлайн Таймер</h2>
          <p className="text-sm leading-relaxed mb-6">
            Бесплатный онлайн таймер для работы, учебы и продуктивности. 
            Помогает сфокусироваться с помощью техники Pomodoro и глубоких рабочих сессий.
          </p>
          <div className="flex gap-4 text-white/40">
            <span>© {new Date().getFullYear()} Premium Focus Suite</span>
          </div>
        </div>

        <div>
          <h3 className="text-white/90 font-medium mb-4">Популярные таймеры</h3>
          <ul className="space-y-2 text-sm">
            {links.filter(l => l.path !== '/faq').map((link) => (
              <li key={link.path}>
                <Link to={link.path === "/" ? "/" : `${link.path}/`} className="hover:text-white transition-colors duration-200">
                  {link.title.split(" - ")[0]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-white/90 font-medium mb-4">Помощь</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/faq/" className="hover:text-white transition-colors duration-200">
                Часто Задаваемые Вопросы (FAQ)
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Invisible SEO links area just for strict crawlability if needed */}
      <div className="sr-only">
        {links.map((link) => (
          <a key={link.path + '-sr'} href={link.path === "/" ? "/" : `${link.path}/`}>{link.keywords}</a>
        ))}
      </div>
    </div>
  );
}