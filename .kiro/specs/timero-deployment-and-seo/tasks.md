# Tasks: Timero.ru - Deployment & SEO Optimization

## Phase 1: Production Deployment (Critical)

### Task 1.1: Verify Build Configuration
**Estimate:** 15 minutes  
**Priority:** Critical  
**Dependencies:** None

Verify that the build configuration is correct for production deployment.

**Subtasks:**
- Check `package.json` scripts (build, preview)
- Verify `vite.config.ts` production settings
- Confirm `vercel.json` configuration
- Check that all dependencies are in `package.json`

**Acceptance Criteria:**
- Build command runs successfully locally
- No missing dependencies
- Vercel configuration is correct

---

### Task 1.2: Build and Test Locally
**Estimate:** 20 minutes  
**Priority:** Critical  
**Dependencies:** Task 1.1

Build the application locally and verify all bug fixes are working.

**Subtasks:**
- Run `npm install --include=dev`
- Run `npm run build`
- Run `npm run preview`
- Test WheelPicker (3rd element should be active)
- Test mouse wheel scroll (should scroll by 1 value)
- Test icon centering in all circular buttons
- Test timer functionality
- Check console for errors

**Acceptance Criteria:**
- Build completes without errors
- Preview server runs successfully
- All bug fixes are visible and working
- No console errors
- Timer works correctly

---

### Task 1.3: Deploy to Vercel Production
**Estimate:** 15 minutes  
**Priority:** Critical  
**Dependencies:** Task 1.2

Deploy the built application to Vercel production.

**Subtasks:**
- Commit all changes to git
- Push to main branch
- Trigger Vercel deployment (automatic or manual)
- Monitor deployment logs
- Wait for deployment to complete

**Acceptance Criteria:**
- Deployment completes successfully
- No build errors in Vercel logs
- Site is accessible at timero.ru
- HTTPS works correctly

---

### Task 1.4: Verify Production Deployment
**Estimate:** 20 minutes  
**Priority:** Critical  
**Dependencies:** Task 1.3

Verify that all bug fixes are visible on production site.

**Subtasks:**
- Open timero.ru in browser
- Test WheelPicker: verify 3rd (center) element is active
- Test mouse wheel: verify scrolls by 1 value at a time
- Test icon centering: verify all icons are centered in buttons
- Test timer start/pause/reset
- Test on mobile device
- Check browser console for errors
- Verify images load correctly
- Test CSP policy (no blocked resources)

**Acceptance Criteria:**
- WheelPicker shows 3rd element as active ✅
- Mouse wheel scrolls by 1 value ✅
- All icons are perfectly centered ✅
- Timer works correctly
- No console errors
- Images load from Unsplash
- Mobile version works

---

## Phase 2: SEO Infrastructure Setup

### Task 2.1: Install React Router
**Estimate:** 30 minutes  
**Priority:** High  
**Dependencies:** Task 1.4

Install and configure React Router for client-side routing.

**Subtasks:**
- Install `react-router-dom` package
- Create `src/routes.tsx` with route configuration
- Update `src/main.tsx` to use BrowserRouter
- Create basic route structure (7 routes)
- Add 404 Not Found page
- Test routing locally

**Acceptance Criteria:**
- React Router installed and configured
- All routes defined
- Navigation works
- 404 page shows for invalid routes
- Browser back/forward buttons work

---

### Task 2.2: Create SEOHead Component
**Estimate:** 45 minutes  
**Priority:** High  
**Dependencies:** Task 2.1

Create reusable SEOHead component for managing meta tags and structured data.

**Subtasks:**
- Create `src/components/seo/SEOHead.tsx`
- Implement meta tags management (title, description, keywords)
- Implement Open Graph tags
- Implement Twitter Card tags
- Implement canonical URL
- Implement hreflang tags
- Implement structured data injection
- Use `react-helmet-async` or similar library
- Create TypeScript interfaces for SEO config
- Add JSDoc documentation

**Acceptance Criteria:**
- SEOHead component created
- All meta tags can be configured
- Structured data can be injected
- TypeScript types defined
- Component is reusable
- Documentation added

---

### Task 2.3: Create SEO Configuration Files
**Estimate:** 60 minutes  
**Priority:** High  
**Dependencies:** Task 2.2

Create SEO configuration files for each landing page.

**Subtasks:**
- Create `src/config/seo/` directory
- Create `home.seo.ts` - Home page SEO config
- Create `pomodoro.seo.ts` - Pomodoro page SEO config
- Create `focus-timer.seo.ts` - Focus Timer page SEO config
- Create `study-timer.seo.ts` - Study Timer page SEO config
- Create `work-timer.seo.ts` - Work Timer page SEO config
- Create `interval-timer.seo.ts` - Interval Timer page SEO config
- Create `faq.seo.ts` - FAQ page SEO config
- Include all meta tags, structured data, breadcrumbs
- Use Russian keywords from semantic core

**Acceptance Criteria:**
- 7 SEO config files created
- Each file has unique title, description, keywords
- Structured data included (WebPage, BreadcrumbList, FAQPage)
- Keywords from semantic core integrated
- TypeScript types used
- Natural Russian language

---

### Task 2.4: Update Sitemap and Robots.txt
**Estimate:** 20 minutes  
**Priority:** High  
**Dependencies:** Task 2.3

Update sitemap.xml and robots.txt to include new landing pages.

**Subtasks:**
- Update `public/sitemap.xml` with all 7 pages
- Add lastmod dates
- Add changefreq and priority
- Add hreflang tags
- Add image sitemap entries
- Verify robots.txt allows all pages
- Test sitemap validity

**Acceptance Criteria:**
- Sitemap includes all 7 pages
- Valid XML format
- Hreflang tags present
- Image sitemap included
- Robots.txt allows all pages
- Sitemap validates in Google/Yandex tools

---

## Phase 3: Landing Page Development

### Task 3.1: Create Landing Page Template Component
**Estimate:** 60 minutes  
**Priority:** High  
**Dependencies:** Task 2.2

Create reusable landing page template component.

**Subtasks:**
- Create `src/components/landing/LandingPageTemplate.tsx`
- Implement Hero section component
- Implement Features section component
- Implement HowItWorks section component
- Implement FAQ section component (accordion UI)
- Implement RelatedLinks section component
- Implement Footer component
- Make all sections configurable via props
- Add responsive design (mobile-first)
- Add animations (framer-motion)
- Style with Tailwind CSS

**Acceptance Criteria:**
- Template component created
- All sections implemented
- Fully responsive
- Smooth animations
- Reusable and configurable
- Matches main app design

---

### Task 3.2: Create Home Page Content
**Estimate:** 45 minutes  
**Priority:** High  
**Dependencies:** Task 3.1

Create content for home page (/).

**Subtasks:**
- Create `src/pages/HomePage.tsx`
- Write H1: "Онлайн Таймер - Бесплатно и Без Регистрации"
- Write hero subtitle (50-80 words)
- Define 4 features (Бесплатно, Без регистрации, Офлайн, Дизайн)
- Write "How It Works" 3 steps
- Write 7 FAQ questions and answers
- Add 4 related links (to other pages)
- Integrate timer component
- Add CTA button
- Use keywords: таймер онлайн, онлайн таймер, таймер бесплатно

**Acceptance Criteria:**
- Home page created
- All content in Russian
- Keywords integrated naturally
- 500-800 words total
- Timer component embedded
- Links to other pages
- Mobile responsive

---

### Task 3.3: Create Pomodoro Page Content
**Estimate:** 45 minutes  
**Priority:** High  
**Dependencies:** Task 3.1

Create content for Pomodoro page (/pomodoro/).

**Subtasks:**
- Create `src/pages/PomodoroPage.tsx`
- Write H1: "Таймер Помодоро - Повысьте Продуктивность"
- Write hero subtitle about Pomodoro technique
- Define 4 features (Автоперерывы, Счетчик циклов, Статистика, Звук)
- Write "How It Works" 4 steps (Pomodoro technique)
- Write 6 FAQ questions about Pomodoro
- Add related links (Focus Timer, Work Timer, FAQ)
- Set default timer preset: 25/5/15 minutes
- Use keywords: таймер помодоро, помодоро таймер, pomodoro timer

**Acceptance Criteria:**
- Pomodoro page created
- Explains Pomodoro technique
- Keywords integrated naturally
- 500-800 words total
- Timer preset to 25 minutes
- Links to related pages
- Mobile responsive

---

### Task 3.4: Create Focus Timer Page Content
**Estimate:** 45 minutes  
**Priority:** High  
**Dependencies:** Task 3.1

Create content for Focus Timer page (/focus-timer/).

**Subtasks:**
- Create `src/pages/FocusTimerPage.tsx`
- Write H1: "Focus Timer - Максимальная Концентрация"
- Write hero subtitle about deep work
- Define 4 features (Минимализм, Полный экран, Без отвлечений, Deep Work)
- Write "How It Works" 3 steps (Deep Work technique)
- Write 5 FAQ questions about focus and concentration
- Add related links (Pomodoro, Work Timer, FAQ)
- Set default timer preset: 90 minutes (Deep Work)
- Use keywords: focus timer, таймер для фокуса, таймер концентрации

**Acceptance Criteria:**
- Focus Timer page created
- Explains Deep Work concept
- Keywords integrated naturally
- 500-800 words total
- Timer preset to 90 minutes
- Links to related pages
- Mobile responsive

---

### Task 3.5: Create Study Timer Page Content
**Estimate:** 45 minutes  
**Priority:** High  
**Dependencies:** Task 3.1

Create content for Study Timer page (/study-timer/).

**Subtasks:**
- Create `src/pages/StudyTimerPage.tsx`
- Write H1: "Таймер для Учебы и Подготовки к Экзаменам"
- Write hero subtitle about studying and exam preparation
- Define 4 features (Для студентов, Для школьников, Статистика, Мотивация)
- Write "How It Works" 3 steps (effective studying)
- Write 6 FAQ questions about studying and exams (ЕГЭ, ОГЭ)
- Add related links (Pomodoro, Home, FAQ)
- Set default timer preset: 45 minutes (study session)
- Use keywords: таймер для учебы, study timer, таймер для студентов

**Acceptance Criteria:**
- Study Timer page created
- Targets students and exam preparation
- Keywords integrated naturally
- 500-800 words total
- Timer preset to 45 minutes
- Links to related pages
- Mobile responsive

---

### Task 3.6: Create Work Timer Page Content
**Estimate:** 45 minutes  
**Priority:** High  
**Dependencies:** Task 3.1

Create content for Work Timer page (/work-timer/).

**Subtasks:**
- Create `src/pages/WorkTimerPage.tsx`
- Write H1: "Таймер для Работы и Продуктивности"
- Write hero subtitle about work and productivity
- Define 4 features (Timeboxing, Задачи, Статистика, Для команд)
- Write "How It Works" 3 steps (Timeboxing technique)
- Write 5 FAQ questions about work and productivity
- Add related links (Pomodoro, Focus Timer, FAQ)
- Set default timer preset: 50 minutes (work session)
- Use keywords: таймер для работы, work timer, productivity timer

**Acceptance Criteria:**
- Work Timer page created
- Targets office workers and freelancers
- Keywords integrated naturally
- 500-800 words total
- Timer preset to 50 minutes
- Links to related pages
- Mobile responsive

---

### Task 3.7: Create Interval Timer Page Content
**Estimate:** 45 minutes  
**Priority:** High  
**Dependencies:** Task 3.1

Create content for Interval Timer page (/interval-timer/).

**Subtasks:**
- Create `src/pages/IntervalTimerPage.tsx`
- Write H1: "Интервальный Таймер для Тренировок"
- Write hero subtitle about interval training
- Define 4 features (Интервалы, Раунды, Звук, Для спорта)
- Write "How It Works" 3 steps (interval training)
- Write 5 FAQ questions about training and HIIT
- Add related links (Home, FAQ)
- Set default timer preset: 20/10 seconds (Tabata)
- Use keywords: интервальный таймер, interval timer, tabata timer

**Acceptance Criteria:**
- Interval Timer page created
- Targets athletes and fitness
- Keywords integrated naturally
- 500-800 words total
- Timer preset to Tabata intervals
- Links to related pages
- Mobile responsive

---

### Task 3.8: Create FAQ Page Content
**Estimate:** 60 minutes  
**Priority:** Medium  
**Dependencies:** Task 3.1

Create comprehensive FAQ page (/faq/).

**Subtasks:**
- Create `src/pages/FAQPage.tsx`
- Write H1: "Часто Задаваемые Вопросы"
- Collect all FAQ questions from all pages (20+ questions)
- Organize into categories:
  - Общие вопросы (5 questions)
  - Помодоро и продуктивность (5 questions)
  - Учеба и работа (5 questions)
  - Технические вопросы (5 questions)
- Implement accordion UI for each category
- Add table of contents with anchor links
- Add search functionality (optional)
- Add links back to relevant pages
- Use keywords in questions naturally

**Acceptance Criteria:**
- FAQ page created
- 20+ questions organized by category
- Accordion UI implemented
- Table of contents added
- Links to relevant pages
- Mobile responsive
- FAQPage structured data

---

## Phase 4: Analytics and Tracking

### Task 4.1: Configure Analytics IDs
**Estimate:** 15 minutes  
**Priority:** Medium  
**Dependencies:** Task 1.4

Replace placeholder analytics IDs with real ones.

**Subtasks:**
- Get real Yandex.Metrika ID from user
- Get real Google Analytics ID from user
- Update `index.html` with real IDs
- Create `.env` file for environment variables
- Update build process to use env variables
- Test analytics tracking locally

**Acceptance Criteria:**
- Real Yandex.Metrika ID configured
- Real Google Analytics ID configured
- Environment variables used
- Analytics tracking works

---

### Task 4.2: Implement Event Tracking
**Estimate:** 45 minutes  
**Priority:** Medium  
**Dependencies:** Task 4.1

Implement event tracking for timer actions.

**Subtasks:**
- Create `src/lib/analytics.ts` utility
- Implement `trackTimerStart` event
- Implement `trackTimerPause` event
- Implement `trackTimerComplete` event
- Implement `trackTimerReset` event
- Implement `trackPageView` event
- Add tracking to timer components
- Add tracking to page navigation
- Test events in Yandex.Metrika and Google Analytics

**Acceptance Criteria:**
- Analytics utility created
- All timer events tracked
- Page views tracked
- Events visible in analytics dashboards
- No errors in console

---

### Task 4.3: Set Up Goals and Conversions
**Estimate:** 30 minutes  
**Priority:** Medium  
**Dependencies:** Task 4.2

Set up goals and conversions in analytics platforms.

**Subtasks:**
- Create Yandex.Metrika goals:
  - Timer started
  - Timer completed
  - Session > 2 minutes
- Create Google Analytics conversions:
  - Timer completed
  - Repeat visit
- Test goal tracking
- Document goal IDs

**Acceptance Criteria:**
- Goals created in Yandex.Metrika
- Conversions created in Google Analytics
- Goals tracking correctly
- Documentation updated

---

## Phase 5: Testing and Optimization

### Task 5.1: SEO Validation
**Estimate:** 45 minutes  
**Priority:** High  
**Dependencies:** Task 3.8

Validate SEO implementation for all pages.

**Subtasks:**
- Test all pages in Google Rich Results Test
- Test all pages in Yandex Validator
- Validate structured data in Schema.org Validator
- Check meta tags with browser dev tools
- Verify canonical URLs
- Verify hreflang tags
- Check for duplicate content
- Verify internal links work
- Test 404 page

**Acceptance Criteria:**
- All pages pass Rich Results Test
- All pages pass Yandex Validator
- Structured data is valid
- No duplicate content
- All internal links work
- 404 page works

---

### Task 5.2: Performance Testing
**Estimate:** 45 minutes  
**Priority:** High  
**Dependencies:** Task 3.8

Test performance of all pages.

**Subtasks:**
- Run Lighthouse on all pages (mobile and desktop)
- Run PageSpeed Insights on all pages
- Check Core Web Vitals
- Optimize images if needed
- Optimize code splitting if needed
- Test on slow 3G connection
- Test on mobile devices
- Verify lazy loading works

**Acceptance Criteria:**
- Lighthouse score 90+ on all pages
- PageSpeed score 90+ on all pages
- Core Web Vitals pass
- Fast loading on 3G
- Mobile performance good

---

### Task 5.3: Mobile Testing
**Estimate:** 30 minutes  
**Priority:** High  
**Dependencies:** Task 3.8

Test all pages on mobile devices.

**Subtasks:**
- Test on iPhone (Safari)
- Test on Android (Chrome)
- Test on tablet
- Verify responsive design
- Test touch interactions
- Test timer on mobile
- Check text readability
- Verify button sizes (min 44x44px)
- Test landscape orientation

**Acceptance Criteria:**
- All pages work on mobile
- Responsive design works
- Touch interactions work
- Timer works on mobile
- Text is readable
- Buttons are touch-friendly

---

### Task 5.4: Cross-Browser Testing
**Estimate:** 30 minutes  
**Priority:** Medium  
**Dependencies:** Task 3.8

Test all pages in different browsers.

**Subtasks:**
- Test in Chrome
- Test in Firefox
- Test in Safari
- Test in Edge
- Test in Yandex Browser
- Check for console errors
- Verify timer works in all browsers
- Check CSS compatibility

**Acceptance Criteria:**
- All pages work in all browsers
- No console errors
- Timer works correctly
- CSS renders correctly

---

## Phase 6: Deployment and Monitoring

### Task 6.1: Deploy SEO Updates to Production
**Estimate:** 20 minutes  
**Priority:** High  
**Dependencies:** Task 5.4

Deploy all SEO updates to production.

**Subtasks:**
- Commit all changes to git
- Push to main branch
- Trigger Vercel deployment
- Monitor deployment logs
- Wait for deployment to complete
- Verify deployment success

**Acceptance Criteria:**
- Deployment completes successfully
- No build errors
- All pages accessible
- Analytics working

---

### Task 6.2: Submit to Search Engines
**Estimate:** 30 minutes  
**Priority:** High  
**Dependencies:** Task 6.1

Submit sitemap to search engines.

**Subtasks:**
- Submit sitemap to Google Search Console
- Submit sitemap to Yandex Webmaster
- Request indexing for all pages
- Verify site ownership
- Check for crawl errors
- Monitor indexing status

**Acceptance Criteria:**
- Sitemap submitted to Google
- Sitemap submitted to Yandex
- All pages requested for indexing
- No crawl errors
- Indexing in progress

---

### Task 6.3: Set Up Monitoring
**Estimate:** 30 minutes  
**Priority:** Medium  
**Dependencies:** Task 6.2

Set up monitoring for site health and SEO.

**Subtasks:**
- Set up uptime monitoring (UptimeRobot or similar)
- Set up Google Search Console alerts
- Set up Yandex Webmaster alerts
- Set up analytics email reports
- Create monitoring dashboard
- Document monitoring setup

**Acceptance Criteria:**
- Uptime monitoring active
- Search Console alerts configured
- Yandex Webmaster alerts configured
- Analytics reports scheduled
- Dashboard created
- Documentation updated

---

### Task 6.4: Create SEO Report Template
**Estimate:** 30 minutes  
**Priority:** Low  
**Dependencies:** Task 6.3

Create template for monthly SEO reports.

**Subtasks:**
- Create report template document
- Define KPIs to track:
  - Organic traffic
  - Keyword rankings
  - Bounce rate
  - Session duration
  - Conversions
- Create tracking spreadsheet
- Document reporting process
- Schedule first report (1 month)

**Acceptance Criteria:**
- Report template created
- KPIs defined
- Tracking spreadsheet created
- Process documented
- First report scheduled

---

## Summary

**Total Tasks:** 28  
**Estimated Time:** ~18 hours

**Phase Breakdown:**
- Phase 1 (Deployment): 4 tasks, ~70 minutes
- Phase 2 (SEO Infrastructure): 4 tasks, ~155 minutes
- Phase 3 (Landing Pages): 8 tasks, ~390 minutes
- Phase 4 (Analytics): 3 tasks, ~90 minutes
- Phase 5 (Testing): 4 tasks, ~150 minutes
- Phase 6 (Deployment & Monitoring): 4 tasks, ~110 minutes

**Priority Distribution:**
- Critical: 4 tasks
- High: 16 tasks
- Medium: 7 tasks
- Low: 1 task

**Dependencies:**
- Phase 1 must complete before Phase 2
- Phase 2 must complete before Phase 3
- Phase 3 must complete before Phase 5
- Phase 5 must complete before Phase 6
- Phase 4 can run in parallel with Phase 3
