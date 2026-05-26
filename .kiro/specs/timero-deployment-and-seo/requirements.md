# Requirements: Timero.ru - Deployment & SEO Optimization

## Overview
Deploy bug fixes to production and implement comprehensive SEO optimization with Russian keyword strategy for timero.ru focus timer application.

## Business Goals
1. Fix critical UI bugs visible on production (timero.ru)
2. Improve search engine rankings for Russian keywords
3. Increase organic traffic from Yandex and Google
4. Establish separate landing pages for keyword clusters

## Target Audience
- Russian-speaking users searching for online timers
- Students preparing for exams (ЕГЭ, ОГЭ)
- Office workers and freelancers
- Developers using Pomodoro technique
- Athletes doing interval training

## Functional Requirements

### FR1: Production Deployment
**Priority:** Critical  
**Description:** Deploy current codebase with bug fixes to Vercel production

**Acceptance Criteria:**
- Build completes successfully without errors
- All bug fixes are visible on timero.ru:
  - WheelPicker shows 3rd (center) element as active
  - Mouse wheel scrolls by 1 value at a time
  - All icons are perfectly centered in circular buttons
- Site loads without CSP errors
- Images load correctly from Unsplash

### FR2: SEO Landing Pages Structure
**Priority:** High  
**Description:** Create separate landing pages for major keyword clusters

**Target Pages:**
1. `/` - Main page (Таймер Онлайн)
2. `/pomodoro/` - Pomodoro Timer page
3. `/focus-timer/` - Focus Timer page
4. `/study-timer/` - Study Timer page
5. `/work-timer/` - Work Timer page
6. `/interval-timer/` - Interval Timer page
7. `/faq/` - FAQ page

**Acceptance Criteria:**
- Each page has unique Title, Description, H1
- Each page targets specific keyword cluster
- Internal linking between pages
- Consistent design with main app
- Mobile-responsive
- Fast loading (PageSpeed 90+)

### FR3: On-Page SEO Optimization
**Priority:** High  
**Description:** Optimize each landing page for target keywords

**Acceptance Criteria:**
- Title: 60-70 characters, includes main keyword
- Description: 150-250 characters, includes 3-5 keywords
- H1: Clear, includes main keyword
- H2-H3: Include related keywords naturally
- Content: 500-800 words per page
- Keywords density: 2-3% for main keyword
- Alt tags for all images
- Internal links to related pages

### FR4: Structured Data Enhancement
**Priority:** Medium  
**Description:** Add structured data for each landing page

**Acceptance Criteria:**
- BreadcrumbList for navigation
- FAQPage for FAQ section
- WebPage schema for each page
- Consistent Organization schema
- Valid JSON-LD (no errors in Google validator)

### FR5: Analytics Integration
**Priority:** Medium  
**Description:** Replace placeholder analytics IDs with real ones

**Acceptance Criteria:**
- Yandex.Metrika ID configured
- Google Analytics ID configured
- Event tracking for timer actions
- Goal tracking for completed sessions
- Heatmap tracking enabled

## Non-Functional Requirements

### NFR1: Performance
- PageSpeed Score: 90+ (mobile and desktop)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

### NFR2: SEO Technical
- Valid HTML5
- No broken links
- Canonical URLs on all pages
- Proper hreflang tags (ru, en)
- Sitemap includes all pages
- robots.txt allows all pages

### NFR3: Mobile Optimization
- Responsive design on all pages
- Touch-friendly buttons (min 44x44px)
- No horizontal scroll
- Readable text (min 16px)
- Fast mobile loading

### NFR4: Security
- HTTPS on all pages
- HSTS header
- CSP policy
- No mixed content
- Secure cookies

## Content Requirements

### CR1: Russian Language Content
**Priority:** High  
**Description:** All SEO content must be in Russian

**Acceptance Criteria:**
- Natural Russian language (not machine translation)
- Proper grammar and spelling
- Uses target keywords naturally
- Addresses user intent
- Includes call-to-action

### CR2: Keyword Integration
**Priority:** High  
**Description:** Integrate keywords from semantic core

**15 Keyword Clusters:**
1. Базовые запросы (таймер онлайн, онлайн таймер)
2. Помодоро/focus (таймер помодоро, pomodoro timer)
3. Со звуком (таймер со звуком, timer with sound)
4. Минимализм (минималистичный таймер, aesthetic timer)
5. Учеба (таймер для учебы, study timer)
6. Работа (таймер для работы, work timer)
7. Интервальный (интервальный таймер, interval timer)
8. Кухня/быт (кухонный таймер, cooking timer)
9. Узкие запросы (таймер на 25 минут)
10. Функции (таймер с задачами, таймер со статистикой)
11. Без регистрации (таймер без регистрации, free timer)
12. English queries (online timer, pomodoro timer)
13. Long-tail (таймер для чтения без отвлечений)
14. Брендовые (лучший таймер для фокуса)
15. Синонимы (обратный отсчет, счетчик времени)

**Acceptance Criteria:**
- One cluster = one page (no keyword stuffing)
- Main keyword in Title, H1, first paragraph
- Related keywords in H2, H3, body text
- Natural keyword density (2-3%)
- Long-tail keywords in FAQ

## User Stories

### US1: As a student
**I want** to find a timer for studying  
**So that** I can focus on exam preparation  
**Acceptance:** Landing page `/study-timer/` ranks in top 10 for "таймер для учебы"

### US2: As an office worker
**I want** to find a Pomodoro timer  
**So that** I can improve my productivity  
**Acceptance:** Landing page `/pomodoro/` ranks in top 10 for "таймер помодоро"

### US3: As a mobile user
**I want** to use the timer on my phone  
**So that** I can track time anywhere  
**Acceptance:** All pages load fast on mobile (< 2s)

### US4: As a Yandex user
**I want** to find the timer in search results  
**So that** I can start using it immediately  
**Acceptance:** Rich snippets show in Yandex SERP

## Success Metrics

### Traffic Goals (3 months)
- Organic traffic: 1000+ visits/month
- Direct traffic: 500+ visits/month
- Bounce rate: < 50%
- Avg. session duration: > 2 minutes

### Ranking Goals (3 months)
- "таймер онлайн" - TOP 10
- "таймер помодоро" - TOP 10
- "таймер для учебы" - TOP 5
- "онлайн таймер бесплатно" - TOP 5

### Conversion Goals
- Timer usage: 70%+
- Repeat visits: 30%+
- Bookmarks: 10%+

## Constraints
- Must maintain current app functionality
- Must not break existing features
- Must work on all modern browsers
- Must comply with Yandex and Google guidelines
- No black-hat SEO techniques

## Dependencies
- Vercel deployment access
- Yandex.Metrika account
- Google Analytics account
- Domain: timero.ru (already configured)

## Out of Scope
- Backend API development
- User authentication
- Payment integration
- Mobile native apps
- Blog creation (future phase)
- External link building (future phase)

## References
- SEO_STRATEGY.md - Comprehensive SEO plan
- Yandex Webmaster Guidelines
- Google Search Central Documentation
- Current semantic core (15 clusters)
