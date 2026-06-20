# МАДАМ БУМ — Worklog

## Проект: Премиальный сайт бурлеск-кабаре «Мадам Бум»

### Технологический стек
- Next.js 16.1.3 (App Router, Turbopack)
- TypeScript 5
- Tailwind CSS 4 + shadcn/ui
- GSAP (анимация занавеса)
- date-fns (календарь)
- Дизайн-система: burgundy #7B1A2B, gold #C9A96E, dark bg #06020A
- Шрифты: Playfair Display, Cormorant Garamond, Inter

---

## Этап 0: Базовая реализация (предыдущая сессия)

### Выполнено:
- Клонирован репозиторий https://github.com/arasacacorp/madamboom.git
- Запущен Next.js dev server на порту 3000
- Изучены референсы: grimerka.art, t.me/s/madamboom, vk.com/madamboom
- Реализованы 4 секции: Hero, Afisha, Calendar, Cast
- Добавлен Curtain (занавес) + Navbar + Footer
- Исправлены ошибки гидратации, календарных дат

---

## Этап 1: Расширение главной страницы (текущая сессия)

### Исходные данные:
- Изучен документ «Новый документ.docx» — полная информация о проекте
- Документ содержит: описание проекта, что такое бурлеск, 2 программы, 7 артистов с био, площадки, корпоративы

### Выполнено:

#### 1. Генерация изображений (6 файлов)
- `performer-marlene.jpg` — Марлен, джазовая вокалистка
- `performer-frau-anaid.jpg` — Фрау Анаид, классический бурлеск
- `performer-ksenia.jpg` — Ксения Лапшина, основатель и продюсер
- `champagne-glass.jpg` — девушка в золотом бокале
- `venue-grimerka.jpg` — интерьер Гримёрки
- `corporate-event.jpg` — корпоративное мероприятие

#### 2. Обновлённые компоненты
- **Hero.tsx** — теглайн «Бурлеск-кабаре нового поколения», кнопка «О проекте» → #about
- **Navbar.tsx** — 8 пунктов: О проекте, Программы, Афиша, Календарь, Состав, Площадки, Гастроли, Почему мы
- **Cast.tsx** — 7 артистов с ролями:
  1. Ксения Лапшина — Основатель и продюсер (НОВЫЙ)
  2. Олеся Волык — Худ. руководитель, конферансье
  3. Сапфира Тайгерс — Прима бурлеск-кабаре (переименована)
  4. Варлок (дуо Анна + Сергей)
  5. Марлен — Джазовый вокал (НОВЫЙ)
  6. Фрау Анаид — Классический бурлеск (НОВЫЙ)
  7. Кристал Дейзи — Девушка в золотом бокале
  - Удалена Инна Айвори (отсутствует в документе)
- **Footer** — добавлен теглайн, города «САНКТ-ПЕТЕРБУРГ · МОСКВА · ГАСТРОЛИ», маркер 18+, увеличенные иконки соцсетей

#### 3. Новые компоненты
- **About.tsx** — «О проекте» (описание + 3 хайлайта) + «Что такое бурлеск?» (2 карточки: классический + с перцем)
- **Programs.tsx** — «Мадам Бум» (классическая) + «Джазовый бунт» (джазовое кабаре, 19:00/20:00)
- **Venues.tsx** — Гримёрка (Москва, Кузнецкий Мост) + Санкт-Петербург
- **Corporate.tsx** — гастроли и корпоративы, 6 типов мероприятий, CTA «Заказать выступление»
- **WhyUs.tsx** — «Почему Мадам Бум?», 6 фишек (бокал, вокал, ментализм, конферанс, 7 артистов, 2 программы)

#### 4. Исправления
- Плашка «Сайт в разработке» перекрывала навигацию → изменён z-index и pointer-events

### Финальная структура главной страницы:

```
1. Curtain (занавес-прелодер)
2. Navbar (фиксированная шапка)
3. Hero — кинематографичный первый экран
4. About — о проекте + что такое бурлеск
5. Programs — две шоу-программы
6. Afisha — 3 афишных карточки
7. Calendar — интерактивный календарь
8. Cast — 7 артистов
9. Venues — площадки
10. Corporate — гастроли и корпоративы
11. WhyUs — почему выбирают Мадам Бум
12. Footer — соцсети, 18+, копирайт
```

### Файловая структура проекта:

```
src/
├── app/
│   ├── page.tsx          — главная (все блоки)
│   ├── layout.tsx        — корневой layout + шрифты
│   ├── globals.css       — глобальные стили
│   └── api/route.ts
├── components/
│   ├── sections/
│   │   ├── Curtain.tsx   — театральный занавес (GSAP)
│   │   ├── Navbar.tsx    — навигация (8 пунктов + мобильный drawer)
│   │   ├── Hero.tsx      — герой-экран
│   │   ├── About.tsx     — о проекте + бурлеск
│   │   ├── Programs.tsx  — две программы
│   │   ├── Afisha.tsx    — афиша событий
│   │   ├── Calendar.tsx  — календарь с date-fns
│   │   ├── Cast.tsx      — состав перформеров
│   │   ├── Venues.tsx    — площадки
│   │   ├── Corporate.tsx — корпоративы/гастроли
│   │   └── WhyUs.tsx     — почему мы
│   └── ui/               — shadcn/ui компоненты
├── hooks/
└── lib/

public/images/
├── afisha-moscow-grimerka.jpg
├── afisha-moscow-jazz.jpg
├── afisha-speterburg-ibiza.jpg
├── champagne-glass.jpg
├── corporate-event.jpg
├── performer-crystal.jpg
├── performer-frau-anaid.jpg
├── performer-inna.jpg      (устаревшее, не используется)
├── performer-ksenia.jpg
├── performer-marlene.jpg
├── performer-olesya.jpg
├── performer-saphaya.jpg   (устаревшее, не используется после переименования)
├── stage-bg.png
├── varlok-anna.jpg
├── varlok-sergey.jpg
└── venue-grimerka.jpg
```

### Результаты проверки:
- ✅ Lint чист
- ✅ Сервер компилируется без ошибок
- ✅ Agent Browser: все секции рендерятся корректно
- ✅ Навигация работает (клик по всем 8 пунктам)
- ✅ Мобильная адаптация OK (drawer, responsive)
- ✅ Ошибок в консоли браузера нет

---

## Этап 2: Отдельные страницы (ПЛАН)

### Запланированные страницы:
1. `/about` — полная история проекта, миссия, команда продюсеров
2. `/program/madamboom` — детальное описание классической программы
3. `/program/jazz-revolt` — детальное описание «Джазового бунта»
4. `/cast/[name]` — индивидуальная страница каждого артиста (био, фотогалерея, номера)
5. `/corporate` — корпоративным клиентам: форматы, портфолио, заявка
6. `/venues` — площадки с картами, схемами залов, фото

---

## Этап 3: Восстановление проекта из архива (текущая сессия)

### Исходные данные:
- Получен архив `Архив.zip` (≈20 МБ) в `/home/z/my-project/upload/`
- Архив содержал полный снапшот проекта + macOS-метаданные (`__MACOSX`)

### Выполнено:

#### 1. Анализ архива
- Просмотрено содержимое: 152 файла (без учёта `__MACOSX`)
- Структура: Next.js 16 проект + секционные компоненты + изображения + скриншоты
- Сравнён `package.json` архива с текущим: единственное отличие — `gsap@^3.15.0`

#### 2. Установка недостающей зависимости
- `bun add gsap` → установлен `gsap@3.15.0`
- Все остальные зависимости уже присутствовали в текущем проекте

#### 3. Распаковка архива
- Команда: `unzip -o "Архив.zip" -x "__MACOSX/*" "bun.lock" "package.json" "*.DS_Store"`
- Исключены: `__MACOSX/` (мусор macOS), `bun.lock` (оставлен текущий), `package.json` (оставлен текущий)
- Файлы перезаписали существующие в `src/`, `public/`, `prisma/`, `db/`, корневые конфиги
- Восстановлены 11 секционных компонентов: `Curtain`, `Navbar`, `Hero`, `About`, `Programs`, `Afisha`, `Calendar`, `Cast`, `Venues`, `Corporate`, `WhyUs`
- Восстановлены 15+ изображений в `public/images/` (артисты, афиши, площадки, фоны)

#### 4. Запуск dev-сервера
- Проблема: фоновые процессы убивались при завершении bash-команды
- Решение: двойной fork + `setsid` для полного отсоединения от процесса-родителя
- Сервер: Next.js 16.1.3 (Turbopack) на порту 3000, PID 2272
- `bun run lint` → чист, без ошибок
- Первая компиляция `/`: 15.6s, последующие рендеры: 30-40ms

#### 5. Верификация через Agent Browser
- **Открытие страницы**: HTTP 200, title «МАДАМ БУМ — Бурлеск-Кабаре | Москва»
- **Структура**: все 12 секций на месте (Curtain → Navbar → Hero → About → Programs → Afisha → Calendar → Cast → Venues → Corporate → WhyUs → Footer)
- **Навигация**: клик по «О ПРОЕКТЕ» → плавный скролл к секции About (scrollY=577)
- **Календарь**: 3 активных шоу (19, 26, 27 июня), кнопки переключения месяцев работают
- **Состав**: 7 артистов (Ксения, Олеся, Сапфира, Варлок, Марлен, Фрау Анаид, Кристал)
- **Footer**: теглайн, города (СПб · Москва · Гастроли), маркер 18+, © 2026
- **Мобильная адаптация**: viewport 375×812 — рендерится корректно
- **Десктоп**: viewport 1280×800 — рендерится корректно
- **Ошибки в консоли**: только hydration-mismatch warning (безопасное предупреждение от форматирования дат)
- **Runtime errors**: нет

### Результаты:
- ✅ Lint чист
- ✅ Сервер запущен и стабильно работает на порту 3000
- ✅ Все секции рендерятся
- ✅ Навигация работает
- ✅ Мобильная + десктоп адаптация OK
- ✅ Footer присутствует с корректным контентом
- ✅ Ошибок в консоли браузера нет (кроме ожидаемого hydration warning)

### Предупреждение (не критичное):
- Next.js warn: cross-origin request от preview-панели. В будущем нужно добавить `allowedDevOrigins` в `next.config.ts`. Сейчас не влияет на работу.

### Файлы скриншотов верификации:
- `/home/z/my-project/screenshot-verify.png` — полный скриншот
- `/home/z/my-project/screenshot-mobile.png` — мобильный вид (375×812)
- `/home/z/my-project/screenshot-desktop.png` — десктоп вид (1280×800)

---

## Этап 4: Редизайн блока «О проекте» (текущая сессия)

### Задача:
Переработать Part 1 секции About — сделать редакционный premium-дизайн вместо центрированного текста.

### Концепция дизайна (арт-дирекшн):
Журнальный/редакционный стиль (premium magazine spread) с асимметричной композицией.

### Что изменилось в `src/components/sections/About.tsx`:

#### 1. Заголовок (двухуровневая иерархия)
- **Eyebrow**: «О проекте» — мелкий, золотой, uppercase, letter-spacing 0.35em, с золотой линией слева
- **Главный заголовок**: «Бурлеск-кабаре **«Мадам Бум»**» — Playfair Display, крупный (до 64px)
  - «Бурлеск-кабаре» — золотой (#C9A96E), bold
  - ««Мадам Бум»» — кремовый (#E8D5A3), italic — визуальный акцент
- **Подзаголовок**: «Независимое кабаре · Санкт-Петербург · 2025»
- Выравнивание: **по левому краю** (вместо центрированного)

#### 2. Двухколоночная сетка (grid 5:7)
- **Левая колонка (5/12)**: портрет продюсера в ornaments-рамке
- **Правая колонка (7/12)**: текст описания, выравнивание по левому краю
- На мобильном: колонки стекаются вертикально (фото → текст)

#### 3. Портрет продюсера (фрейм)
- Фото: `/images/performer-ksenia.jpg` (временное — пользователь пришлёт отдельное позже)
- Двойная золотая рамка (внешняя + внутренняя)
- 4 угловых декоративных скобки (corner brackets) — золотые L-образные
- Бордовый radial glow позади рамки
- Тонкая золотая линия сверху + градиент снизу для глубины
- Подпись: «Ксения Лапшина» (Playfair, золото) + «Продюсер · Основатель» (Inter, uppercase)
- Hover-эффект: рамка и скобки становятся ярче, glow усиливается

#### 4. Текст описания (5 абзацев, по левому краю)
- **Лид-абзац**: ««Мадам Бум» — независимое бурлеск-кабаре...»
  - Крупнее (до 22px), Cormorant Garamond, более яркий цвет
  - Золотая вертикальная акцентная линия слева (border-left 2px) — журнальный приём
- **4 body-абзаца**: полный текст описания от пользователя
  - Cormorant Garamond, 18px, lineHeight 1.85, muted color (0.72 opacity)
- Каскадная анимация появления (staggered reveal)

#### 5. CTA-кнопка «Подробнее о проекте»
- Ссылка `href="/about"` — подготовка под будущую отдельную страницу
- Золотой outline, при hover заливается золотом, текст темнеет
- Иконка-стрелка → сдвигается вправо при hover
- Letter-spacing расширяется при hover (0.22em → 0.26em)

#### 6. Удалено
- 3 хайлайта (Санкт-Петербург · Москва · Гастроли / 2 программы / 7 артистов) — стали избыточны с полным текстом описания
- Функция `HighlightItem` убрана (больше не используется)
- Центрирование основного текста убрано полностью

### Сохранено без изменений:
- `SectionParticles` (частицы фона)
- `BurlesqueCard` компонент
- Part 2 «Что такое бурлеск?» (2 карточки + цитата) — остался центрированным как контраст
- Золотой разделитель между Part 1 и Part 2
- Все фоновые слои (градиенты, radial glow, conic accents, vignette)

### Результаты верификации (Agent Browser):
- ✅ Lint чист (0 errors, 0 warnings)
- ✅ Сервер компилируется без ошибок
- ✅ H2 «Бурлеск-кабаре «Мадам Бум»» рендерится
- ✅ Фото продюсера (performer-ksenia.jpg) загружается
- ✅ Подпись «Ксения Лапшина · Продюсер · Основатель» на месте
- ✅ Лид-абзац + 4 body-абзаца с полным текстом
- ✅ Кнопка «Подробнее о проекте» → href="/about"
- ✅ 9 параграфов всего (lead + 4 body + 2 cards + 1 quote + 1 role)
- ✅ Мобильная адаптация (375×812): фото и текст стекаются вертикально
- ✅ Десктоп (1440×900): двухколоночная сетка 5:7
- ✅ Ошибок в консоли браузера нет
- ✅ Part 2 «Что такое бурлеск?» сохранён и работает

### Скриншоты верификации:
- `screenshot-about-new-desktop.png` — десктоп, верх About
- `screenshot-about-grid.png` — сетка фото+текст
- `screenshot-about-text.png` — текст + кнопка
- `screenshot-about-mobile.png` — мобильная вёрстка
- `screenshot-about-mobile-top.png` — мобильный, Part 1

### Примечание:
Фото `performer-ksenia.jpg` используется как временное (оно же есть в секции Cast). Когда пользователь пришлёт отдельное фото продюсера, нужно будет заменить src в `<img>` или добавить новое изображение в `public/images/` и обновить путь.

---

## Этап 5: Редизайн блока «Афиша» + перенос позиции (текущая сессия)

### Задача:
1. Перенести блок Афиша сразу после Hero
2. Сделать карточки шире
3. Центральная афиша должна выделяться (больше/выше)
4. Убрать текст (дата/город/шоу/площадка) — оставить только ссылку на билеты
5. Изображение афиши должно быть чистым — без наслоения текста

### Что изменилось:

#### 1. Порядок секций в `src/app/page.tsx`
**Было**: Hero → About → Programs → Afisha → Calendar → Cast → Venues → Corporate → WhyUs
**Стало**: Hero → **Afisha** → About → Programs → Calendar → Cast → Venues → Corporate → WhyUs

#### 2. Полная переработка `src/components/sections/Afisha.tsx`

**Удалено:**
- Весь текстовый блок под изображением: date badge, city (h3), show name, venue
- Bottom gradient overlay на изображении (делал изображение «грязным»)
- Все текстовые наслоения на изображении
- Компонент `AfishaCard` полностью переписан (старый с details-панелью удалён)

**Сохранено в данных (для доступности):**
- date/city/show/venue остались в массиве `events`, но используются ТОЛЬКО в `alt` и `aria-label` изображений/кнопок

**Новый дизайн карточки:**
- Чистое изображение постера в золотой рамке (padding 6px, двойная рамка)
- Под изображением — единственный текстовый элемент: кнопка «Билеты»
- Никаких overlays, градиентов или текста на самом изображении

**Ширина карточек (увеличена):**
- Обычные: `clamp(260px, 24vw, 360px)` (было clamp(230px, 19vw, 300px))
- Центральная (featured): `clamp(280px, 26vw, 400px)` — шире остальных

**Центральная карточка выделяется (3 отличия):**
1. **Шире**: 400px max vs 360px max
2. **Выше**: aspect-ratio `3/4.55` vs `3/4` (примерно на 14% выше)
3. **Приподнята**: `translateY(-28px)` — визуально возвышается над соседними
4. Усиленная золотая рамка: 2px solid (0.65 opacity) vs 1px (0.28 opacity)
5. Усиленный glow: двойная тень (золото + бордо + чёрный)
6. Декоративные угловые скобки (corner brackets) — 4 золотых L-образных элемента
7. Кнопка более контрастная: золото-кремовый текст + лёгкий фон

**Изменение featured-карточки:**
- Было: первое событие (19 ИЮН, Москва, Бурлеск-кабаре)
- Стало: среднее событие (26 ИЮН, Санкт-Петербург, Ибица Джаз) — пользователь просил выделять «по середине»

**Кнопка «Билеты» (единый текстовый элемент):**
- Gold outline, uppercase, letter-spacing 0.22em
- Hover: заливается золотым градиентом, текст темнеет, стрелка сдвигается вправо
- Letter-spacing расширяется при hover (0.22em → 0.26em)
- Для featured: более контрастная (кремовый текст + лёгкий золотой фон)

**Мобильная версия:**
- Вертикальный стек карточек (max 340px)
- Без elevation (translateY) — на мобильном это выглядит некрасиво
- Сохранена featured-стилизация: усиленная рамка + glow + угловые скобки
- Aspect ratio: 3/4.2 для всех (компромисс)

#### 3. Фон секции
- Burgundy radial glow центрирован на 50% 40% (под центральной карточкой)
- Остальные фоновые слои сохранены (градиенты, conic accents, particles, vignette)

### Результаты верификации (Agent Browser):

**Десктоп (1440×900):**
- ✅ Порядок секций: Hero → Afisha → About → Programs → ...
- ✅ 3 desktop-карточки рендерятся
- ✅ Card0 (Москва 19 ИЮН): 327px, aspect 3/4, translateY(0)
- ✅ Card1 (СПб 26 ИЮН, featured): 354px (шире), aspect 3/4.55 (выше), translateY(-28px) (приподнята)
- ✅ Card2 (Москва 27 ИЮН): 327px, aspect 3/4, translateY(0)
- ✅ Изображения чистые: только `<img>` внутри контейнера (для Card1 + 4 декоративные corner spans, без gradient/text overlays)
- ✅ 0 заголовков h3 (текст города убран)
- ✅ 3 кнопки «Билеты» видимы

**Мобильная (375×812):**
- ✅ Desktop-карточки скрыты (0 visible)
- ✅ 3 mobile-карточки видны (вертикальный стек)
- ✅ 3 кнопки «Билеты» видимы
- ✅ Featured-стилизация сохранена (рамка/glow/скобки)

**Сервер и lint:**
- ✅ Lint чист (0 errors, 0 warnings)
- ✅ Сервер компилируется без ошибок (HTTP 200)
- ✅ Ошибок в консоли браузера нет

### Скриншоты верификации:
- `screenshot-afisha-new.png` — десктоп, новая Афиша
- `screenshot-afisha-final.png` — десктоп, финальный вид
- `screenshot-afisha-mobile.png` — мобильная версия

---

## Этап 6: Добавление второй кнопки «О программе» в афишу (текущая сессия)

### Задача:
Добавить вторую кнопку «О программе» рядом с «Билеты» в каждой карточке афиши. Ссылки будут добавлены позже.

### Что изменилось в `src/components/sections/Afisha.tsx`:

#### 1. Desktop-карточка (`AfishaCard`)
- Контейнер действий изменился с `justify-content: center` на flex с `gap: 12px` + `flexWrap: wrap`
- Добавлена вторая ссылка `a.afisha-info-btn` после `.afisha-ticket-btn`
- Иконка: book-open (открытая книга) — символизирует чтение/описание программы
- `href="#afisha"` — placeholder (остаётся на той же секции, без прыжка наверх)

#### 2. Mobile-карточка (`AfishaCardMobile`)
- Аналогично: контейнер с `gap: 10px` + `flexWrap: wrap`
- Добавлена вторая ссылка с тем же классом `.afisha-info-btn`

#### 3. CSS для `.afisha-info-btn` (secondary button)
Дизайн-иерархия: «Билеты» — primary (заливка золотом при hover), «О программе» — secondary (тоньше, без заливки).

Стили secondary-кнопки:
- `padding: 12px 24px` (немного у́же primary `12px 28px`)
- `font-weight: 400` (primary = 500)
- `letter-spacing: 0.2em` (primary = 0.22em)
- `color: rgba(201,169,110,0.65)` — приглушённое золото (primary = #C9A96E)
- `border: 1px solid rgba(201,169,110,0.22)` — тонкая рамка (primary = 0.4)
- **Без** `::before` slide-fill анимации (это сигнатура primary)
- Hover: цвет → #C9A96E, рамка → 0.5, лёгкий bg tint (0.05), letter-spacing расширяется до 0.24em, иконка scale(1.08)

Для featured-карточки:
- Чуть ярче base: border 0.32, color rgba(232,213,163,0.75)
- Hover: color #E8D5A3, border 0.6

### Результаты верификации (Agent Browser):

**Десктоп (1440×900):**
- ✅ 3 кнопки «Билеты» видимы
- ✅ 3 кнопки «О программе» видимы
- ✅ Текст: «Билеты» (href=внешний URL) + «О программе» (href=#afisha placeholder)
- ✅ Иконка book-open рендерится

**Мобильная (375×812):**
- ✅ 6 видимых кнопок (3 Билеты + 3 О программе)
- ✅ Тексты: «Билеты, О программе, Билеты, О программе, ...»

**Сервер и lint:**
- ✅ Lint чист (0 errors, 0 warnings)
- ✅ Сервер стабилен (HTTP 200)
- ✅ Ошибок в консоли браузера нет

### Скриншоты:
- `screenshot-afisha-two-btns.png` — десктоп с двумя кнопками
- `screenshot-afisha-two-btns-mobile.png` — мобильная версия

### Примечание:
`href="#afisha"` — временный placeholder, который при клике остаётся на секции Афиша (не прыгает наверх). Когда ссылки на страницы программ будут готовы, нужно заменить на реальные пути (например `/program/madamboom`, `/program/ibiza-jazz`).

---

## Этап 7: Кнопки «Билеты» + «О программе» в один ряд (текущая сессия)

### Задача:
Заставить две кнопки в карточках афиши всегда располагаться в один ряд (без переноса), даже на узких мобильных экранах (375px).

### Что изменилось в `src/components/sections/Afisha.tsx`:

#### 1. Flex-контейнеры
- Desktop `.afisha-actions`: `flexWrap: wrap` → `flexWrap: nowrap`, gap 12px → 10px
- Mobile actions div: `flexWrap: wrap` → `flexWrap: nowrap`, gap 10px → 8px

#### 2. Primary кнопка «Билеты» (`.afisha-ticket-btn`)
- padding: `12px 28px` → `11px 20px`
- font-size: `12px` → `11px`
- letter-spacing: `0.22em` → `0.18em`
- gap (icon↔text): `10px` → `8px`
- hover letter-spacing: `0.26em` → `0.21em`

#### 3. Secondary кнопка «О программе» (`.afisha-info-btn`)
- padding: `12px 24px` → `11px 18px`
- font-size: `12px` → `11px`
- letter-spacing: `0.2em` → `0.16em`
- gap (icon↔text): `10px` → `8px`
- hover letter-spacing: `0.24em` → `0.19em`

### Результаты верификации (Agent Browser):

**Мобильная (375×812) — самый жёсткий constraint:**
- ✅ card0: 2 btns, sameRow=true, overflow=false
- ✅ card1: 2 btns, sameRow=true, overflow=false
- ✅ card2: 2 btns, sameRow=true, overflow=false

**Десктоп (1440×900):**
- ✅ card0: 2 btns, sameRow=true
- ✅ card1: 2 btns, sameRow=true
- ✅ card2: 2 btns, sameRow=true

**Сервер и lint:**
- ✅ Lint чист (0 errors, 0 warnings)
- ✅ Ошибок в консоли браузера нет

### Скриншоты:
- `screenshot-afisha-one-row-mobile.png` — мобильная версия (375px), кнопки в один ряд
- `screenshot-afisha-one-row-desktop.png` — десктоп версия

### Итог:
Кнопки компактнее (меньше padding/font-size/letter-spacing), но сохраняют визуальную иерархию: primary «Билеты» всё ещё ярче и шире secondary «О программе». Гарантированно помещаются в один ряд на всех экранах от 375px.

---

## Этап 8: Перенос Календаря + исследование TicketsCloud API (текущая сессия)

### Часть A: Перенос и переименование

#### Порядок секций в `src/app/page.tsx`
**Было**: Hero → Afisha → About → Programs → **Calendar** → Cast → ...
**Стало**: Hero → Afisha → **Calendar** → About → Programs → Cast → ...

#### Заголовок в `src/components/sections/Calendar.tsx`
- «Календарь» → **«Календарь событий»**
- Все остальные стили/структура без изменений

#### Верификация
- ✅ Lint чист
- ✅ Порядок секций подтверждён через Agent Browser:
  Hero (МАДАМ БУМ) → Afisha → **Календарь событий** → About → Programs → Cast → Venues → Corporate → WhyUs
- ✅ Ошибок в консоли нет

---

### Часть B: Исследование документации TicketsCloud

**ВАЖНО: интеграция НЕ выполнялась — только исследование.**

Изученные источники:
1. https://ticketscloud.readthedocs.io/ru/latest/ — главная (оглавление)
2. walkthrough/basics.html — базовые понятия (URL, авторизация)
3. walkthrough/events.html — текущий способ получения событий
4. walkthrough/events_obsoleted.html — устаревший REST endpoint (со структурой данных)
5. walkthrough/order_example.html — полный пример заказа
6. walkthrough/order_create.html — создание заказа
7. extra/types.html — типы данных (VEVENT, Media, ObjectId, ISODatetime)
8. https://github.com/ticketscloud/docs/blob/master/doc/docs.md — gRPC-сервис tc-simple (proto-файлы)

### Ключевые выводы по TicketsCloud API

#### 1. Два способа работы с API

**A. REST API (для заказов) — активный**
- Base URL: `https://ticketscloud.com`
- Stage: `https://stage.freetc.net`
- Авторизация: заголовок `Authorization: key <API_KEY>` (префикс `key`)
- Только HTTPS
- Формат: JSON
- Endpoints для заказов:
  - `POST /v2/resources/orders` — создать заказ
  - `PATCH /v2/resources/orders/{id}` — изменить (добавить билеты, завершить)
  - `GET /v2/resources/orders` — список заказов

**B. gRPC-сервис `tc-simple` (для справочников и событий) — активный, РЕКОМЕНДУЕМЫЙ**
- Proto-документация: https://github.com/ticketscloud/docs/blob/master/doc/docs.md
- 10 методов RPC (все возвращают stream):
  - **`Events(EventsRequest) → stream Event`** ← ключевой для календаря
  - `Seats(SeatsRequest) → stream Seat` — места с рассадкой
  - `Venues(VenuesRequest) → stream Venue` — площадки
  - `Cities / Countries / Categories / Tags / Artists / Maps / MetaEvents`

**C. Устаревший REST для событий — НЕ рекомендуется**
- `GET /v1/services/simple/events` — список мероприятий (deprecated, но работает)
- `GET /v1/resources/events/:id/tickets` — билеты с местами (deprecated)

#### 2. Требования для интеграции (получить от организатора)

Для интеграции необходимо:
1. **Зарегистрироваться как распространитель** на TicketsCloud
   - https://support.ticketscloud.org/для-распространителей/регистрация
2. **Заключить сделку с организатором** мероприятий «Мадам Бум»
   - https://support.ticketscloud.org/для-распространителей/как-заключать-сделки
3. **Получить API-ключ** (token) — передаётся в `Authorization: key <token>`

Без API-ключа интеграция невозможна — все endpoints требуют авторизации.

#### 3. Структура данных Event (для календаря)

Из gRPC proto (v3.Event):
```
Event {
  id: string                  // id мероприятия
  name: string                // название
  description: string         // описание
  status: EventStatus         // STAND_BY(0) | PUBLIC(1) — продажи
  org: string                 // id организатора
  venue: string               // id площадки
  lifetime: Lifetime {        // ⭐ даты для календаря
    start: Timestamp
    finish: Timestamp
  }
  category: string            // id категории
  tags: string[]              // id жанров
  artists: string[]           // id артистов
  age_rating: string          // возрастное ограничение
  media: Media {              // ⭐ обложки для карточек
    cover: string
    cover_small: string
    cover_original: string
  }
  sets: TicketSet[]           // категории билетов
  tickets_amount: uint32      // всего билетов
  tickets_amount_vacant: uint32  // ⭐ свободно (для индикации "sold out")
  open_date: bool             // мероприятие с открытой датой
}
```

Из устаревшего REST (дополнительные поля, которые есть в данных):
- `venue.address` — адрес площадки
- `venue.city.name` — название города (мультиязычное)
- `venue.city.timezone` — часовой пояс (ВАЖНО для отображения времени)
- `venue.point.coordinates` — координаты [lng, lat] (для карты)
- `partner.contact` — контакты партнёра
- `org.media.logo` — логотип организатора

#### 4. Параметры запроса EventsRequest (фильтры)

```
EventsRequest {
  ids: string[]               // конкретные мероприятия по id
  meta: string                // по id группы мероприятий
  without_meta: bool          // только одиночные (не из групп)
  org: string                 // по id организатора ⭐ (наш случай)
  status: Status              // ANY(0) | STAND_BY(1) | PUBLIC(2) ⭐ = PUBLIC
  lifetime: LiftimeFilter {   // ⭐ фильтр по датам для календаря
    start: TimestampFilter
    finish: TimestampFilter
  }
}
```

Для календаря оптимально: `status=PUBLIC`, `org=<id_организатора_Мадам_Бум>`, `lifetime` — диапазон текущего месяца.

#### 5. Архитектура интеграции (план, НЕ реализован)

```
┌─────────────────────────────────────────────────────────┐
│ Frontend (Calendar.tsx, client)                          │
│  - отображение сетки месяца                              │
│  - кнопка месяца → GET /api/calendar?year=2025&month=6   │
│  - маркеры на днях с событиями                           │
└────────────────────────┬────────────────────────────────┘
                         │ fetch (relative path)
                         ▼
┌─────────────────────────────────────────────────────────┐
│ Backend API Route (/api/calendar/route.ts, server)       │
│  - in-memory cache (1 час)                               │
│  - вызывает TicketsCloud                                 │
└────────────────────────┬────────────────────────────────┘
                         │ gRPC или REST
                         ▼
┌─────────────────────────────────────────────────────────┐
│ TicketsCloud API                                         │
│  Вариант 1: gRPC tc-simple → Events(EventsRequest)       │
│  Вариант 2: REST GET /v1/services/simple/events          │
│  Авторизация: Authorization: key <TOKEN>                 │
└─────────────────────────────────────────────────────────┘
```

#### 6. Что нужно для реализации (cheat-sheet)

| Что | Где взять | Заметка |
|-----|-----------|---------|
| API-ключ (token) | ЛК распространителя TicketsCloud | добавить в `.env` как `TC_API_KEY` |
| ID организатора | из данных Events (поле `org`) после получения ключа | фильтр `EventsRequest.org` |
| gRPC endpoint | TBD (вероятно `api.ticketscloud.com:443`) | уточнить у поддержки |
| Proto-файлы | https://github.com/ticketscloud/docs/tree/master/proto | склонировать |
| ИЛИ REST endpoint | `https://ticketscloud.com/v1/services/simple/events` | проще, но deprecated |

#### 7. Рекомендуемый путь интеграции

**Этап 1 (минимальный, REST):**
- Получить API-ключ
- Backend route `/api/calendar` → `GET /v1/services/simple/events?status=public` с `Authorization: key <TOKEN>`
- Парсить `lifetime` (VEVENT-строка) → извлекать DTSTART/DTEND
- Кешировать ответ 1 час (in-memory)
- Frontend Calendar.tsx → fetch `/api/calendar?year=Y&month=M`

**Этап 2 (продвинутый, gRPC) — когда REST отключат:**
- Установить `@grpc/grpc-js` + `@grpc/proto-loader`
- Загрузить proto-файлы из github.com/ticketscloud/docs
- Создать gRPC-клиент к сервису `Simple`
- Вызвать `Events(EventsRequest)` со стримом

**Этап 3 (полноценная продажа билетов на сайте):**
- Реализовать весь flow: Events → Seats → Order create → Order finish
- Интеграция платёжного шлюза (через TicketsCloud)
- Возвраты

### Вывод для пользователя

Для интеграции календаря с TicketsCloud нужно получить у организатора «Мадам Бум»:
1. **API-ключ TicketsCloud** (токен распространителя)
2. **Подтверждение сделки** между сайтом и организатором в системе TicketsCloud

После получения ключа — реализация займет ~1-2 часа (REST-вариант) или ~3-4 часа (gRPC-вариант). Архитектура готова (backend API route + in-memory cache + клиентский fetch), нужно только:
- добавить `TC_API_KEY` в `.env`
- написать `/api/calendar/route.ts` (серверный fetch с авторизацией)
- обновить `Calendar.tsx` — заменить хардкод `getEvents()` на fetch к `/api/calendar`

### Сохранённые артефакты исследования:
- /tmp/tc-home.json — главная страница документации
- /tmp/tc-basics.json — базовые понятия
- /tmp/tc-events.json — текущий способ (gRPC)
- /tmp/tc-events-obs.json — устаревший REST (структура Event)
- /tmp/tc-example.json — полный пример заказа
- /tmp/tc-ordercreate.json — создание заказа
- /tmp/tc-types.json — типы данных
- /tmp/tc-github-raw.json — proto-документация gRPC tc-simple

---

## Этап 9: Очистка проекта от мусора (текущая сессия)

### Задача:
Удалить файлы, не относящиеся к сайту и не влияющие на его работу.

### Что удалено (~103 MB):

#### 1. Временные скриншоты верификации (31 MB)
- 38 файлов `screenshot-*.png` в корне проекта
- Это скриншоты, которые Agent Browser делал при проверке секций (About, Afisha, Calendar, Cast, mobile/desktop версии и т.д.)
- Никогда не использовались сайтом — только для отладки

#### 2. Папка `upload/` содержимое (69 MB)
- `Архив.zip` (20 MB) — исходный архив проекта
- `arasaca-main (2).zip` (8 MB) — другой архив
- `workspace-*.tar` (42 MB + 359 KB) — tar-архивы workspace
- `pasted_image_*.png` (2 × 9 KB) — вставленные изображения
- `Новый документ.docx` (14 KB) — исходный документ с описанием проекта
- Сама папка `upload/` оставлена (это mount point, нельзя удалить) — теперь пустая

#### 3. Папка `tool-results/` (312 KB)
- 5 текстовых файлов с выводом предыдущих bash/read команд
- Логи прошлых сессий, не нужны для работы

#### 4. Папка `download/` (34 байта)
- Пустая папка с одним `README.md` (34 байта)
- Никогда не использовалась

#### 5. Папка `examples/` (~10 KB)
- Пример `websocket/frontend.tsx` и `websocket/server.ts`
- На сайте нет WebSocket интеграции — не используется

#### 6. `.dev-server.pid` (5 байт)
- Устаревший PID файл от предыдущего запуска сервера

#### 7. `start-dev.sh` (60 байт)
- Кастомный скрипт запуска `npx next dev -p 3000`
- Дублирует `bun run dev` — избыточен

#### 8. Неиспользуемые изображения (1.5 MB)
- `public/images/performer-inna.jpg` (1.4 MB) — 0 ссылок в коде (артистка Инна Айвори была удалена из Cast)
- `public/images/champagne-glass.jpg` (147 KB) — 0 ссылок в коде (ранее была в WhyUs, но убрана)

### Что ОСТАВЛЕНО (используется или важно):

| Файл/папка | Почему оставлено |
|------------|------------------|
| `src/`, `public/`, `prisma/`, `db/` | ядро сайта |
| `package.json`, `bun.lock`, `node_modules/` | зависимости |
| `.next/`, `.git/` | build + VCS |
| конфиги (`.env`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `components.json`, `Caddyfile`, `next-env.d.ts`) | конфигурация |
| `skills/` | системные skills (в .gitignore) |
| `.zscripts/` | dev.sh скрипты окружения |
| `mini-services/` | предусмотрено архитектурой (пустая, .gitkeep) |
| `worklog.md` | журнал работы (важно!) |
| `dev.log` | лог сервера (перезаписывается, в .gitignore) |
| `public/images/` (14 файлов) | все используются сайтом |
| `upload/` (пустая) | mount point, для будущих загрузок |

### Обновлён `.gitignore`
Добавлены правила на будущее:
```gitignore
# Temporary verification screenshots
screenshot-*.png
screenshot.png

# Tool output logs
/tool-results/

# User uploads (archives, dropped files)
/upload/*

# Dev server PID file
.dev-server.pid

# Custom dev scripts (use bun run dev instead)
start-dev.sh
```

### Верификация после очистки:
- ✅ Lint чист (0 errors, 0 warnings)
- ✅ Сервер работает стабильно (HTTP 200, ~25ms response)
- ✅ 9 секций на месте: hero, afisha, calendar, about, programs, cast, venues, corporate, whyus
- ✅ 25 изображений на странице, 0 сломанных (после прокрутки 12 загружено, остальные lazy-load)
- ✅ 0 ошибок 404 в консоли
- ✅ Все 14 изображений в `public/images/` имеют ссылки в коде

### Итог:
Проект стал чище на ~103 MB. Удалены: 38 скриншотов, 69 MB архивов, 312 KB логов, 2 неиспользуемых изображения, 4 пустые/дублирующие папки и файла. Структура проекта теперь минимальна и содержит только необходимое для работы сайта.

---

## Этап 10: Интеграция календаря с TicketsCloud (текущая сессия)

### Задача:
1. Получать реальные мероприятия с TicketsCloud для календаря
2. Показывать детали мероприятия (обложка, описание, цены, площадка) при клике на дату
3. Отмечать город (Москва/СПб) на датах календаря
4. Дать возможность покупать билеты через iframe-виджет TicketsCloud

### ⚠️ Принцип безопасности:
**ТОЛЬКО GET-запросы к TicketsCloud** — никакие POST/PATCH/DELETE не выполнялись.
На стороне TicketsCloud ничего не создано, не изменено, не удалено.

### Что обнаружено через API:

**ID организатора**: `6a04a283ace6bbe321827e6f` («Бурлеск кабаре Мадам Бум»)
- `org.id == partner.id` — распространитель и организатор одно лицо (продаём свои билеты)

**36 мероприятий** с июня по сентябрь 2026:
- 3 площадки:
  - `69036b3d88263f70479d39c2` — Гримёрка Gastro Club & Karaoke Bar (Москва, Пушечная ул., 9/6)
  - `63d245c0cf850e128fd98aeb` — Ibiza (СПб, Садовая ул., 12)
  - `6009c4462b7ecc1335ac7299` — Unity_Sennaya (СПб, пер. Гривцова, 4)
- 2 типа шоу: «Бурлеск кабаре шоу МАДАМ БУМ» (классика) + «Джазовый бунт»
- Все 18+, все `status=public`
- Даты в VEVENT формате (UTC) — нужна конвертация в Europe/Moscow (UTC+3)

**Известные поддомены виджетов** (из старого кода Afisha):
- `madamboomgrimerka.ticketscloud.org` — Гримёрка (Москва, классика)
- `jazzandburlesque.ticketscloud.org` — Гримёрка (Москва, «Джазовый бунт»)
- `madamboomibiza.ticketscloud.org` — Ibiza (СПб, «Джазовый бунт»)
- Unity_Sennaya — поддомен неизвестен, fallback на `ticketscloud.com/events/<id>`

### Реализация:

#### 1. `.env` — добавлены переменные
```
TC_API_KEY=<ваш_API_ключ_из_ЛК_TicketsCloud>
TC_API_BASE=https://ticketscloud.com
```

#### 2. `src/app/api/calendar/route.ts` — backend API route (новый)
- `GET /api/calendar?year=2026&month=6` (month 1-indexed)
- Обращается к `https://ticketscloud.com/v1/services/simple/events?page_size=200&status=public`
- Заголовок `Authorization: key <TC_API_KEY>` (только чтение!)
- **Двухуровневый кеш**:
  - `allEventsCache` — все события (TTL 1 час)
  - `cache` — отфильтрованные по месяцу (TTL 1 час)
- **Парсинг VEVENT** → извлечение DTSTART/DTEND (UTC)
- **Конвертация часовых поясов**: UTC → Europe/Moscow (UTC+3) через ручной offset
- **Трансформация** в CalendarEvent с полями:
  - `dateKey` (YYYY-MM-DD в venue TZ) — для группировки по дням
  - `dateDisplay` («19 июня»), `timeDisplay` («19:00»)
  - `title`, `description`, `ageRating`, `venueName`, `venueAddress`, `city`
  - `ticketsAmount`, `ticketsVacant`, `soldOut`
  - `coverUrl`, `coverSmallUrl` (обложки с ticketscloud.com)
  - `sets[]` (топ-6 категорий по цене, с vacant/total)
  - `widgetUrl` (mapping venue→поддомен виджета)
  - `cityMarker` ('М' | 'СПб' | null)
- HTTP-заголовок `Cache-Control: public, max-age=3600`
- Полный тип `CalendarEvent` экспортирован для фронта

#### 3. `src/components/sections/Calendar.tsx` — полностью переписан
**Что изменилось:**
- ❌ Удалён хардкод `getEvents()` с 3 событиями
- ✅ Заменён на `fetch('/api/calendar?year=Y&month=M')`
- ✅ Client-side кеш по месяцам (`monthCacheRef = useRef<Map>`)
- ✅ Loading state (спиннер + «Загрузка шоу»)
- ✅ Error state («Не удалось загрузить события»)
- ✅ Empty state («В этом месяце мероприятий нет»)

**Маркеры городов на датах календаря:**
- Москва → золотой маркер (`#C9A96E`)
- Санкт-Петербург → бордовый маркер (`#7B1A2B`)
- Легенда под заголовком секции
- Каждый день с событием окрашен в цвет города
- Точка под числом — индикатор события

**Sidebar (правая панель):**
- Список всех событий месяца (карточки)
- Каждая карточка: дата (с цветом города), weekday, название, город, время
- Badge «Sold out» если билеты распроданы
- Скроллбар со стилизацией (max-h-500px)
- Клик по карточке → открывает модалку

**Модальное окно с деталями (EventModal):**
- Два режима: «details» (по умолчанию) и «widget» (после клика «Купить»)
- **Details mode**:
  - Слева: обложка мероприятия (с ticketscloud.com) + badge города
  - Справа: дата + время + возрастной рейтинг + название + площадка + адрес + описание
  - Прогресс-бар свободных мест («Свободно 67 из 191» + процент)
  - Сетка категорий билетов (до 6) с ценами и индикатором «нет»/«5 ост.»
  - Кнопка «Купить билеты» (золотая, заливка градиентом)
  - Footer: «Безопасная оплата через TicketsCloud»
- **Widget mode** (после клика «Купить»):
  - Шапка: «← Назад к описанию» + «Безопасная оплата · TicketsCloud»
  - iframe на весь размер модалки (src = widgetUrl)
  - `allow="payment"` для платёжных форм
- Закрытие: клик по фону, кнопка ✕, или ESC
- Блокировка скролла body пока открыта
- Анимации: fade-in + slide-up

**Кнопки «Купить» в модалке:**
- Если `widgetUrl` есть → золотая кнопка → открывает iframe-виджет
- Если `soldOut` → disabled, серая, текст «Билеты распроданы»
- Если `widgetUrl === null` → плашка «Скоро — продажа билетов откроется»

### Верификация (Agent Browser):

**Десктоп (1440×900):**
- ✅ Секция «Календарь событий» рендерится
- ✅ Легенда городов (Москва / Санкт-Петербург) видна
- ✅ 4 события за июнь 2026 загружены с TicketsCloud
- ✅ Карточки: «6пт Бурлеск кабаре шоу МАДАМ БУМ Москва 19:00» и т.д.
- ✅ Weekday корректный («пт», «сб») — исправлен с EEEEE → EEEEEE
- ✅ Клик по дню в сетке → открывает модалку
- ✅ Клик по карточке в sidebar → открывает модалку
- ✅ Модалка: «Москва 19 июня 19:00 18+ Бурлеск кабаре шоу МАДАМ БУМ Гримёрка Gastro Club & Karaoke Bar Пушечная ул., 9/6»
- ✅ Кнопка «Купить билеты» → открывает iframe-виджет
- ✅ iframe src: `https://madamboomgrimerka.ticketscloud.org/` (894×722 px)
- ✅ Шапка виджета: «← Назад к описанию | Безопасная оплата · TicketsCloud»

**Мобильная (375×812):**
- ✅ 4 карточки и 4 активных дня
- ✅ Адаптация работает

**Сервер и lint:**
- ✅ Lint чист (0 errors, 0 warnings)
- ✅ Сервер стабилен (HTTP 200)
- ✅ `/api/calendar` — первый запрос 3.2с (обращение к TC), из кеша 5-16мс
- ✅ Ошибок в консоли браузера нет

### Архитектура безопасности:
```
Frontend (Calendar.tsx, client)
  ↓ fetch (relative path, no API key exposed)
/api/calendar (server route)
  ↓ fetch with Authorization: key <TC_API_KEY> (только GET!)
TicketsCloud API
  https://ticketscloud.com/v1/services/simple/events
```
- API-ключ НЕ экспонируется на клиенте (только в server route)
- Только GET-запросы — ничего не меняем на стороне TicketsCloud
- Двухуровневый кеш (1 час) — снижает нагрузку на TicketsCloud

### Скриншоты верификации:
- `screenshot-calendar-tc.png` — календарь с реальными данными (десктоп)
- `screenshot-calendar-modal.png` — модалка с деталями
- `screenshot-calendar-widget.png` — iframe-виджет TicketsCloud в модалке
- `screenshot-calendar-mobile.png` — мобильная адаптация

### Что нужно от пользователя:
1. **Уточнить поддомен виджета для Unity_Sennaya** (СПб, пер. Гривцова, 4)
   - Сейчас fallback на `ticketscloud.com/events/<event_id>` — это может не работать как виджет
   - Нужен поддомен вида `madamboomunity.ticketscloud.org` или подобный
2. **Подтвердить** что iframe-виджет корректно отображается (можно ли его встроить)
   - Некоторые виджеты TC могут иметь защиту от встраивания (X-Frame-Options)
   - Если iframe не грузится — альтернатива: открывать виджет в новой вкладке

### Что НЕ делалось (по требованию пользователя):
- ❌ Никаких POST/PATCH/DELETE к TicketsCloud
- ❌ Не создавались заказы
- ❌ Не изменялись данные мероприятий
- ❌ Не работал с платёжным шлюзом напрямую (через iframe TC)

---

## Этап 11: Исправления + статус Unity_Sennaya (текущая сессия)

### Bugfix: Число месяца в sidebar badge

**Проблема:**
В карточках sidebar («Шоу этого месяца») в квадрате показывался номер месяца (06), а не число месяца (19).

**Причина:**
Ошибка в destructuring:
```javascript
// БЫЛО (баг): берёт index 1 = месяц ('06')
const [, dayNum] = evt.dateKey.split('-')

// dateKey = "2026-06-19" → split = ['2026', '06', '19']
// [, dayNum] пропускает '2026', берёт '06' (месяц!) ← БАГ
```

**Исправление:**
```javascript
// СТАЛО: явно берём index 2 = день ('19')
const dateParts = evt.dateKey.split('-')
const dayNumber = parseInt(dateParts[2], 10)
```

**Верификация:**
- Было: «card1: 6пт» (номер месяца)
- Стало: «card1: 19пт» (число месяца) ✓

---

### Статус Unity_Sennaya (площадка в СПб)

**Проверка через API:**
- ✅ Площадка валидна в TicketsCloud: `venue.id = 6009c4462b7ecc1335ac7299`
- ✅ 9 мероприятий запланировано (июль-август 2026)
- ✅ Адрес: переулок Гривцова, 4 БЦ BolloevСenter, Санкт-Петербург
- ✅ Доступны в API: обложки, категории билетов, свободные места, описание

**Проблема: URL виджета продаж**
- API TicketsCloud НЕ возвращает URL виджетов продаж (поддомены `*.ticketscloud.org`)
- Эти поддомены настраиваются отдельно в ЛК TicketsCloud
- Проверены стандартные варианты — все возвращают 404:
  - `madamboomunity.ticketscloud.org` → 404
  - `madamboom-unity.ticketscloud.org` → 404
  - `madamboom-sennaya.ticketscloud.org` → 404
  - и другие
- Generic URLs тоже не работают:
  - `ticketscloud.com/events/<id>` → 404
  - `ticketscloud.com/e/<id>` → 404

**Известные рабочие поддомены (для сравнения):**
- `madamboomgrimerka.ticketscloud.org` — Гримёрка (Москва, классика) ✅
- `jazzandburlesque.ticketscloud.org` — Гримёрка (Москва, «Джазовый бунт») ✅
- `madamboomibiza.ticketscloud.org` — Ibiza (СПб, «Джазовый бунт») ✅

**Что нужно от пользователя:**
Узнать в ЛК TicketsCloud поддомен виджета для Unity_Sennaya. Скорее всего, при создании этой площадки организатор должен был настроить поддомен продаж (как для Гримёрки и Ibiza). Возможные варианты имени:
- `madamboomunity.ticketscloud.org`
- `madamboomsennaya.ticketscloud.org`
- `madamboomspbbolshoy.ticketscloud.org`
- или другой, который организатор задал при настройке

Пока в коде для Unity_Sennaya используется fallback — показывается плашка «Скоро — продажа билетов откроется» вместо кнопки «Купить».

### Текущая логика getWidgetUrl (в /api/calendar/route.ts):
```
Ibiza → madamboomibiza.ticketscloud.org ✅
Гримёрка + классика → madamboomgrimerka.ticketscloud.org ✅
Гримёрка + «Джазовый бунт» → jazzandburlesque.ticketscloud.org ✅
Unity_Sennaya → null (виджет не настроен) — показывается плашка
```

---

## Этап 12: Конфиг-файл виджетов + все поддомены (текущая сессия)

### Задача:
1. Вынести логику матчинга venue→виджет в отдельный конфиг-файл (чтобы можно было добавлять новые поддомены без правки основного кода)
2. Сверить и интегрировать все актуальные поддомены виджетов продаж

### Сверка поддоменов (все рабочие, HTTP 200):
| Площадка | Город | Тип шоу | Поддомен | Статус |
|----------|-------|---------|----------|--------|
| Гримёрка (пт) | Москва | классика | `madamboomgrimerka.ticketscloud.org` | ✅ 200 |
| Гримёрка (сб) | Москва | «Джазовый бунт» | `jazzandburlesque.ticketscloud.org` | ✅ 200 |
| Ibiza (сб) | СПб | «Джазовый бунт» | `madamboomibiza.ticketscloud.org` | ✅ 200 |
| Unity_Sennaya (чт) | СПб | классика | `unitysummer.ticketscloud.org` | ✅ 200 (НОВЫЙ) |
| Общий (fallback) | — | все | `6a04a283ace6bbe321827e6f.ticketscloud.org` | ✅ 200 |

### Создан конфиг-файл: `src/lib/tc-widget-config.ts`

**Структура:**
```typescript
// 1. Карта venue.id → URL виджета
export const VENUE_WIDGETS: Record<string, string> = {
  '69036b3d88263f70479d39c2': 'https://madamboomgrimerka.ticketscloud.org/',  // Гримёрка
  '63d245c0cf850e128fd98aeb': 'https://madamboomibiza.ticketscloud.org/',    // Ibiza
  '6009c4462b7ecc1335ac7299': 'https://unitysummer.ticketscloud.org/',       // Unity_Sennaya
}

// 2. Override по типу шоу (когда на одной площадке несколько виджетов)
export const SHOW_OVERRIDES = [
  {
    venueId: '69036b3d88263f70479d39c2',  // Гримёрка
    titleMatch: /джазовый бунт/i,
    url: 'https://jazzandburlesque.ticketscloud.org/',
    comment: '«Джазовый бунт» по субботам в Гримёрке',
  },
]

// 3. Fallback — общий виджет организатора
export const ORG_WIDGET_URL = 'https://6a04a283ace6bbe321827e6f.ticketscloud.org/'

// 4. Главная функция с приоритетами
export function getWidgetUrl(venueId, eventTitle): string | null
```

**Приоритет матчинга:**
1. `SHOW_OVERRIDES` — точный матч по venue.id + regex названия шоу (высший приоритет)
2. `VENUE_WIDGETS` — по venue.id
3. `ORG_WIDGET_URL` — общий виджет организатора (показывает все события)

### Рефакторинг `/api/calendar/route.ts`
- ❌ Удалена локальная функция `getWidgetUrl()` (40 строк с text-match логикой)
- ✅ Импорт из конфига: `import { getWidgetUrl } from '@/lib/tc-widget-config'`
- ✅ Вызов: `getWidgetUrl(raw.venue.id, raw.title.text)` (вместо `getWidgetUrl(raw)`)
- Комментарий-указатель на конфиг-файл для будущих изменений

### Как добавлять новые поддомены (инструкция для пользователя):
1. Узнать `venue.id` в ЛК TicketsCloud или через ответ `/api/calendar`
2. Открыть `src/lib/tc-widget-config.ts`
3. Добавить строку в `VENUE_WIDGETS`:
   ```typescript
   'venue_id_здесь': 'https://поддомен.ticketscloud.org/',
   ```
4. Готово — при следующем запросе к `/api/calendar` (макс. через 1 час, пока кеш не обновится) все мероприятия на этой площадке получат кнопку «Купить»

### Верификация (Agent Browser):

**API тест (июль 2026):**
- ✅ HTTP 200, 14 мероприятий
- ✅ Unity_Sennaya (5 событий) → `unitysummer.ticketscloud.org`
- ✅ Гримёрка классика (4 события) → `madamboomgrimerka.ticketscloud.org`
- ✅ Гримёрка «Джазовый бунт» (2 события) → `jazzandburlesque.ticketscloud.org` (override работает!)
- ✅ Ibiza (2 события) → `madamboomibiza.ticketscloud.org`

**UI тест (клик по Unity-событию 2 июля):**
- ✅ Клик по карточке «2 июля» в sidebar → открылась модалка
- ✅ Модалка: «Санкт-Петербург, 2 июля, 19:00, 18+, Unity_Sennaya, переулок Гривцова, 4»
- ✅ Кнопка «Купить билеты» → кликабельна
- ✅ После клика: iframe загрузился с `src=https://unitysummer.ticketscloud.org/`
- ✅ Размер iframe: 894×722 px
- ✅ Шапка виджета: «← Назад к описанию | Безопасная оплата · TicketsCloud»
- ✅ Ошибок в консоли нет

### Сервер и lint:
- ✅ Lint чист (0 errors, 0 warnings)
- ✅ Сервер стабилен (HTTP 200)
- ✅ Все 5 поддоменов виджетов подтверждены рабочими (HTTP 200)

### Скриншоты:
- `screenshot-calendar-july.png` — календарь за июль (14 событий, маркеры М/СПб)
- `screenshot-unity-widget.png` — модалка с iframe-виджетом Unity

### Примечание:
Во время работы обнаружилось, что `.env` файл был случайно перезаписан (остался только `DATABASE_URL`). Восстановлены `TC_API_KEY` и `TC_API_BASE`. В будущем нужно быть аккуратнее с перезапуском dev-сервера.

---

## Этап 13: Push в GitHub ветку dev (текущая сессия)

### Задача:
Создать ветку `dev` на GitHub (https://github.com/arasacacorp/madamboom.git) и запушить код.

### 🚨 Критическая проблема безопасности (обнаружена и исправлена):

При проверке git состояния перед пушем обнаружено:
1. **`.env` файл с API-ключом TicketsCloud попал в git tracking** (в 5 коммитах ветки main)
2. **API-ключ `4fecb5ca...` был в worklog.md** (строка 837)

Причина: `.env` был в `.gitignore`, но файл был принудительно добавлен в tracking ранее (через `git add -f` или до обновления `.gitignore`).

### Что сделано для безопасности:

1. **Удалён ключ из worklog.md** — заменён на `<ваш_API_ключ_из_ЛК_TicketsCloud>`
2. **Создана orphan branch `dev`** (без истории main) — это гарантирует, что история с .env НЕ попадёт на GitHub
3. **`.env` убран из staging** на dev ветке (`git rm --cached .env`)
4. **Финальная проверка**: ключа нет ни в одном файле dev коммита, .env нет в коммите
5. **GitHub токен** использован только в URL для push, НЕ сохранён в `.git/config`

### Результат push:

```
* [new branch]      dev -> dev
remote: Create a pull request for 'dev' on GitHub by visiting:
remote:      https://github.com/arasacacorp/madamboom/pull/new/dev
```

- ✅ Ветка `dev` создана на GitHub
- ✅ Локальный dev == remote dev (хеши совпадают: `fad8bdd`)
- ✅ Upstream tracking настроен: `dev` → `origin/dev`
- ✅ 106 файлов в коммите (весь проект кроме .env)
- ✅ GitHub токен не сохранён в config
- ✅ API-ключ TicketsCloud не в коммите

### Ссылка:
https://github.com/arasacacorp/madamboom/tree/dev

### ⚠ ВАЖНЫЕ ПРЕДУПРЕЖДЕНИЯ ДЛЯ ПОЛЬЗОВАТЕЛЯ:

1. **Локальная ветка `main` содержит .env с ключом в истории (5 коммитов)**
   - НЕ пушить main на GitHub!
   - В будущем: рекомендуется перевыпустить API-ключ в ЛК TicketsCloud (rotating), так как он был в локальной git истории

2. **Файл `.env` исключён из git** (правильно!)
   - При клонировании репозитория на новый машине нужно создать `.env` вручную:
     ```
     DATABASE_URL=file:/path/to/db/custom.db
     TC_API_KEY=<ваш_API_ключ_из_ЛК_TicketsCloud>
     TC_API_BASE=https://ticketscloud.com
     ```

3. **`db/custom.db` включён в коммит** — содержит только пустые тестовые таблицы (User/Post из Prisma schema). В будущем лучше добавить `db/*.db` в `.gitignore`.

### Команда для будущего push (без токена в config):
```bash
git push origin dev
# Если потребуется токен снова:
git push https://<token>@github.com/arasacacorp/madamboom.git dev
```

### Структура коммита dev:
- 106 файлов
- 1 чистый коммит (orphan branch, без истории main)
- Все секции сайта, API routes, конфиги, изображения
- Исключены: `.env`, `node_modules/`, `.next/`, `skills/`, `upload/`, `tool-results/`, скриншоты

---

## Этап 14: Редизайн шапки навигации (текущая сессия)

### Задача:
Новая структура навигации:
1. **О шоу** (dropdown) → О Мадам Бум / Состав / Галерея
2. **Афиша**
3. **Календарь событий**
4. **Программы**
5. **Контакты**
6. **Заказать мероприятие** (выделенная кнопка)
7. **Билеты** (остаётся как есть, primary CTA)

### Что изменилось в `src/components/sections/Navbar.tsx`:

#### 1. Новая типизированная структура NAV_ITEMS
```typescript
type NavItem =
  | { type: 'link'; label: string; href: string }
  | { type: 'dropdown'; label: string; items: { label: string; href: string }[] }
  | { type: 'button-outline'; label: string; href: string }

const NAV_ITEMS: NavItem[] = [
  { type: 'dropdown', label: 'О шоу', items: [
    { label: 'О Мадам Бум', href: '#about' },
    { label: 'Состав', href: '#cast' },
    { label: 'Галерея', href: '#gallery' },  // секция пока не существует
  ]},
  { type: 'link', label: 'Афиша', href: '#afisha' },
  { type: 'link', label: 'Календарь событий', href: '#calendar' },
  { type: 'link', label: 'Программы', href: '#programs' },
  { type: 'link', label: 'Контакты', href: '#contacts' },  // → footer
  { type: 'button-outline', label: 'Заказать мероприятие', href: '#corporate' },
]
```

#### 2. Dropdown «О шоу» (desktop)
- Открывается по **hover** (с задержкой 150мс для избежания мерцания)
- Также работает по **клик** (toggle)
- Закрывается по клику вне элемента (mousedown listener)
- Анимация: fade-in + slide-down (0.25s)
- Декоративная стрелка-треугольник сверху
- Тёмный фон с blur, золотая рамка
- Каждый подпункт: uppercase, hover → padding-left + золотой цвет + лёгкий фон
- Chevron иконка вращается на 180° при открытии

#### 3. Кнопка «Заказать мероприятие» (button-outline)
- Визуально отделена от обычных ссылок
- Outline стиль: прозрачный фон + золотая рамка 1px
- Иконка Calendar слева
- Hover: лёгкий золотой tint + усиление рамки + glow
- НЕ такая яркая как «Билеты» (primary CTA остаётся выделенным)

#### 4. Мобильный drawer
- «О шоу» — expandable button (не dropdown)
- При клике разворачивает подпункты с анимацией max-height
- Подпункты с префиксом «—» для визуальной вложенности
- Chevron вращается при раскрытии
- Клик по подпункту: закрывает drawer + скроллит к секции

#### 5. Изменения в `src/app/page.tsx`
- Добавлен `id="contacts"` к `<footer>` — теперь «Контакты» скроллит к футеру с соцсетями

### Верификация (Agent Browser):

**Десктоп (1440×900):**
- ✅ Структура: О ШОУ (button) | АФИША | КАЛЕНДАРЬ СОБЫТИЙ | ПРОГРАММЫ | КОНТАКТЫ | ЗАКАЗАТЬ МЕРОПРИЯТИЕ | БИЛЕТЫ
- ✅ Клик «О шоу» → dropdown открывается (aria-expanded=true)
- ✅ 3 подпункта видны: О МАДАМ БУМ, СОСТАВ, ГАЛЕРЕЯ
- ✅ Клик «О Мадам Бум» → скролл к #about (top: 0)
- ✅ Клик «Афиша» → скролл к #afisha (top: 0)
- ✅ Клик «Календарь событий» → скролл к #calendar (top: 0)
- ✅ Клик «Программы» → скролл к #programs (top: 0)
- ✅ Клик «Контакты» → скролл к #contacts/footer (top: 562)
- ✅ Клик «Заказать мероприятие» → скролл к #corporate (top: 0)

**Мобильная (375×812):**
- ✅ Drawer открывается
- ✅ Все пункты видны: О ШОУ, АФИША, КАЛЕНДАРЬ СОБЫТИЙ, ПРОГРАММЫ, КОНТАКТЫ, ЗАКАЗАТЬ МЕРОПРИЯТИЕ, БИЛЕТЫ
- ✅ Клик «О шоу» → раскрывается список подпунктов
- ✅ Подпункты: «—О МАДАМ БУМ», «—СОСТАВ», «—ГАЛЕРЕЯ»
- ✅ Клик «О Мадам Бум» → drawer закрывается + скролл к #about (top: 0)

**Сервер и lint:**
- ✅ Lint чист (0 errors, 0 warnings)
- ✅ Сервер стабилен (HTTP 200)
- ✅ Ошибок в консоли нет

### Примечания:
- **«Галерея» (#gallery)** — секция пока не существует на странице. Ссылка добавлена, но при клике ничего не происходит (element not found). Когда секция Галерея будет добавлена — ссылка заработает автоматически.
- Брейкпоинт для desktop навигации изменён с `md` (768px) на `lg` (1024px), так как пунктов стало больше и на средних экранах они не помещались.

---

## Этап 15: Новый блок «Что такое бурлеск + шоу-программа» (текущая сессия)

### Задача:
Создать новый блок после Афиши — объединить описание жанра бурлеск и шоу-программы «Мадам Бум» в одном блоке.

### Создан компонент `src/components/sections/WhatIsBurlesque.tsx`

### Дизайн-концепция:
Двухуровневый блок с золотым разделителем посередине. Каждый уровень имеет свой заголовок + контент.

**Часть 1: «Что такое бурлеск?»**
- Eyebrow «О жанре» + главный заголовок с italic-акцентом
- Сетка 7:5 (текст слева / 2 карточки справа на десктопе)
- Левая колонка:
  - Лид-абзац с золотой вертикальной линией слева (border-left)
  - 2 body-абзаца (полный текст пользователя)
  - Заключительная italic-цитата с золотой точкой
- Правая колонка — 2 карточки:
  - «Классический бурлеск» (Sparkles icon, gold)
  - «Бурлеск с перцем» (Theater icon, cream)

**Золотой разделитель** (центрированный, с ромбом)

**Часть 2: «Шоу-программа «Мадам Бум»»**
- Eyebrow «Программа» + заголовок с italic-акцентом
- Описание конферанса (центрированный, max-w-3xl) с подсветкой слова «конферанса»
- Лейбл «В программе представлены» (центрированный с золотыми линиями)
- Сетка из 7 элементов программы (иконки в кругах + подписи):
  1. Классический бурлеск (Theater)
  2. Авторские постановки (Sparkles)
  3. Живой вокал (Music)
  4. Джазовые композиции (Stars)
  5. Ментализм и магия (Eye)
  6. Интерактив со зрителями (Users)
  7. Элементы кабаре (Flower2)
- 2 выделенные карточки (md:grid-cols-2):
  - «Девушка в бокале» (Wine icon) — eyebrow «Легендарный номер», полный текст про 2 номера в бокале
  - «Анна и Сергей Варлоки» (Eye icon) — eyebrow «Ментализм и магия»

### Адаптивность:
- Десктоп (lg): 7+5 сетка для Part 1, 7 колонок для program elements, 2 колонки для highlights
- Планшет (md): 2 колонки для highlights, 4 колонки для program elements
- Мобильный (sm): всё стекается вертикально, program elements 2-3 колонки

### Анимации:
- IntersectionObserver (threshold 0.08, rootMargin bottom -60px)
- Staggered reveal: заголовок → текст → карточки → разделитель → Part 2
- Hover-эффекты: все карточки приподнимаются + glow, program element иконки масштабируются

### Интеграция в `src/app/page.tsx`:
Новый порядок секций:
1. Hero
2. Afisha
3. **WhatIsBurlesque** ← НОВЫЙ
4. Calendar
5. About (оставлен как есть — пользователь сказал «пока оставим»)
6. Programs (оставлен как есть)
7. Cast
8. Venues
9. Corporate
10. WhyUs

### Верификация (Agent Browser):

**Десктоп (1440×900):**
- ✅ Порядок секций: hero → afisha → **what-is-burlesque** → calendar → about → ...
- ✅ Part 1: «Что такое бурлеск?» + лид + 2 body + цитата + 2 карточки
- ✅ Part 2: «Шоу-программа «Мадам Бум»» + конферанс + 7 элементов + 2 хайлайт-карточки
- ✅ Хайлайт-карточки: «Девушка в бокале» (Легендарный номер) + «Анна и Сергей Варлоки» (Ментализм и магия)
- ✅ 7 элементов программы: Классический бурлеск, Авторские постановки, Живой вокал, Джазовые композиции, Ментализм и магия, Интерактив со зрителями, Элементы кабаре

**Мобильная (375×812):**
- ✅ 2 burlesque cards + 2 highlight cards + 7 program elements
- ✅ Адаптивная сетка

**Сервер и lint:**
- ✅ Lint чист (0 errors, 0 warnings)
- ✅ Сервер стабилен (HTTP 200)
- ✅ Ошибок в консоли нет

### Скриншоты:
- `screenshot-whatisburlesque-part1.png` — верх блока (заголовок + текст)
- `screenshot-whatisburlesque-cards.png` — Part 1 с карточками
- `screenshot-whatisburlesque-part2.png` — Part 2 (программа)
- `screenshot-whatisburlesque-highlights.png` — хайлайт-карточки (Бокал + Варлоки)
- `screenshot-whatisburlesque-mobile.png` — мобильная версия

### Использованные иконки (lucide-react):
Wine (бокал), Sparkles (постановки/классика), Music (вокал), Stars (джаз), Eye (ментализм), Users (интерактив), Flower2 (кабаре), Theater (бурлеск с перцем), Mic2 (импортирован но не использован — можно убрать)

### Примечание:
Существующие блоки About («Что такое бурлеск?») и Programs — оставлены как есть по просьбе пользователя. В будущем можно будет удалить дублирующий контент из About или сделать About более кратким.

---

## Этап 16: Центрирование заголовка блока «Что такое бурлеск?» (текущая сессия)

### Задача:
1. Убрать eyebrow «О жанре»
2. Сделать заголовок «Что такое бурлеск?» по центру
3. Сделать подзаголовок «Искусство кабаре · Музыка · Театральность» по центру (с симметричными золотыми линиями)

### Что изменилось в `src/components/sections/WhatIsBurlesque.tsx`:

#### Part 1 title block (был left-aligned → стал centered)

**Удалено:**
- Eyebrow «О жанре» с левой золотой линией

**Изменено:**
- Контейнер: добавлен `flex flex-col items-center` для центрирования
- Заголовок h2: `textAlign: 'left'` → `textAlign: 'center'`
- Подзаголовок: добавлена правая золотая линия (симметрично левой)
- Добавлен `whiteSpace: 'nowrap'` к подзаголовку — чтобы не переносился

**Было (левая линия + текст):**
```
┌─ О жанре
│
Что такое бурлеск?
── Искусство кабаре · Музыка · Театральность
```

**Стало (центрированный заголовок + симметричный подзаголовок):**
```
              Что такое бурлеск?
   ── Искусство кабаре · Музыка · Театральность ──
```

### Верификация (Agent Browser):
- ✅ Eyebrow «О жанре» убран (exists: false)
- ✅ Заголовок «Что такое бурлеск?» — textAlign: center
- ✅ Подзаголовок «Искусство кабаре · Музыка · Театральность» на месте
- ✅ Идеальное центрирование: h2 center X = 720, container center X = 720, diff = 0px
- ✅ Lint чист, ошибок нет

---

## Этап 17: Уменьшение отступа до блока «Что такое бурлеск?» (текущая сессия)

### Задача:
Отступ от Afisha до WhatIsBurlesque был слишком большим. Сделать гармоничным, ближе к эталону (Hero→Afisha = 128px).

### Замеры до изменений (десктоп):
- Hero → Afisha: 128px (эталон)
- **Afisha → WhatIsBurlesque: 240px** ← слишком большой
- WhatIsBurlesque → Calendar: 112px

Причина: padding-bottom Afisha (128) + padding-top WhatIsBurlesque (112) = 240px суммарно.

### Что изменилось в `src/components/sections/WhatIsBurlesque.tsx`:

**Padding section:**
```diff
- className="relative py-16 md:py-24 lg:py-28 overflow-hidden"
+ className="relative py-14 md:py-20 lg:py-24 overflow-hidden"
```

**Inline paddingTop override** (уменьшает верхний отступ на всех брейкпоинтах):
```diff
- style={{ backgroundColor: '#06020A' }}
+ style={{ backgroundColor: '#06020A', paddingTop: 'clamp(24px, 2.5vw, 32px)' }}
```

Inline-стиль `paddingTop` переопределяет Tailwind `py-*` для верха, оставляя `paddingBottom` из `py-14 md:py-20 lg:py-24` (для баланса с Calendar ниже).

### Замеры после изменений (десктоп):
- Hero → Afisha: **128px** (эталон)
- **Afisha → WhatIsBurlesque: 160px** ← было 240, стало 160 (сбалансировано)
- WhatIsBurlesque → Calendar: 96px (чуть меньше, но гармонично — плавный переход)

### Замеры на мобильном (375px):
- Hero → Afisha: 64px
- Afisha → WhatIsBurlesque: 88px (было 120)
- WhatIsBurlesque → Calendar: 56px

### Верификация:
- ✅ Lint чист
- ✅ Отступы сбалансированы: 128 → 160 → 96 (было 128 → 240 → 112)
- ✅ Визуально гармонично с соседними блоками

160px немного больше 128, но это даёт визуальное «дыхание» перед новым содержательным блоком — выглядит естественнее, чем равные отступы.

---

## Этап 18: Центрирование заголовка Part 2 «Шоу-программа «Мадам Бум»» (текущая сессия)

### Задача:
1. Убрать eyebrow «Программа» из Part 2
2. Центрировать заголовок «Шоу-программа «Мадам Бум»»

### Что изменилось в `src/components/sections/WhatIsBurlesque.tsx`:

#### Part 2 title block (был left-aligned → стал centered)

**Удалено:**
- Eyebrow «Программа» с левой золотой линией

**Изменено:**
- Контейнер: добавлен `flex flex-col items-center` для центрирования
- Заголовок h2: `textAlign: 'left'` → `textAlign: 'center'`

Теперь оба заголовка блока (Part 1 «Что такое бурлеск?» и Part 2 «Шоу-программа «Мадам Бум»») центрированы одинаково — визуальная консистентность.

### Верификация (Agent Browser):
- ✅ Eyebrow «Программа» убран (exists: false)
- ✅ Заголовок «Шоу-программа «Мадам Бум»» — textAlign: center
- ✅ Идеальное центрирование: center diff = 0px
- ✅ Lint чист, ошибок нет

---

## Этап 19: Исправление пропадающей обводки карточек при hover (текущая сессия)

### Задача:
При наведении на карточки «Классический бурлеск», «Бурлеск с перцем», «Девушка в бокале», «Анна и Сергей Варлоки» — обводка (border) пропадала.

### Причина:
1. Hover менял только `border-color` на 0.45, но визуально это было слабо заметно на фоне тёмного фона
2. Box-shadow содержал бордовый цвет `rgba(123,26,43,0.2-0.25)`, который конфликтовал с золотой рамкой (создавал визуальный «шум» вокруг, делая рамку менее заметной)
3. Inline-стиль `border: '1px solid rgba(...,0.25)'` мог конфликтовать с hover-правилом `border-color` в некоторых браузерах

### Что изменилось в `src/components/sections/WhatIsBurlesque.tsx` (CSS hover):

**Burlesque cards (Part 1):**
```diff
.burlesque-card-inner:hover {
  transform: translateY(-4px);
- box-shadow: 0 0 30px rgba(123,26,43,0.2), 0 0 12px rgba(201,169,110,0.08), 0 8px 30px rgba(0,0,0,0.5);
- border-color: rgba(201,169,110,0.45) !important;
+ box-shadow: 0 0 28px rgba(201,169,110,0.18), 0 8px 30px rgba(0,0,0,0.5);
+ border: 1px solid rgba(201,169,110,0.7) !important;
+ border-color: rgba(201,169,110,0.7) !important;
}
```

**Highlight cards (Part 2):**
```diff
.highlight-card-inner:hover {
  transform: translateY(-4px);
- box-shadow: 0 0 35px rgba(123,26,43,0.25), 0 0 14px rgba(201,169,110,0.1), 0 10px 35px rgba(0,0,0,0.5);
- border-color: rgba(201,169,110,0.45) !important;
+ box-shadow: 0 0 32px rgba(201,169,110,0.22), 0 10px 35px rgba(0,0,0,0.5);
+ border: 1px solid rgba(201,169,110,0.7) !important;
+ border-color: rgba(201,169,110,0.7) !important;
}
```

**Program element icons:**
- border-color: 0.45 → 0.55 (чуть ярче)
- box-shadow: 0.15 → 0.2

### Изменения:
1. **Border-color: 0.45 → 0.7** — рамка стала в 1.5× ярче при hover
2. **Явный `border: 1px solid` + `border-color`** — надёжнее, чем только border-color (не зависит от inline-стиля)
3. **Box-shadow**: убран бордовый `rgba(123,26,43,...)` — оставлен только золотой `rgba(201,169,110,...)`, теперь свечение совпадает по цвету с рамкой, усиливая визуальный эффект вместо конфликта

### Верификация (Agent Browser, реальный mouse hover):
- ✅ Base state: `border: 1px solid rgba(201,169,110,0.25)` (слабая рамка)
- ✅ Hover state: `border: 1px solid rgba(201,169,110,0.7)` (яркая золотая рамка)
- ✅ Box-shadow: `rgba(201,169,110,0.18) 0px 0px 28px` — золотое свечение
- ✅ Transform: `translateY(-4px)` — карточка приподнимается
- ✅ Lint чист, ошибок нет

---

## Этап 20: Финальное исправление — верхняя обводка при hover (текущая сессия)

### Задача:
При наведении на карточки верхняя часть обводки всё ещё была не видна (несмотря на предыдущее исправление border-color).

### Причина:
В каждой карточке есть **абсолютный gold accent line** `position: absolute; top: 0; height: 1px` — он **перекрывает верхнюю часть border**. Даже когда border-color становится яркой (0.7), она скрыта под этим accent line.

Найдено 3 accent lines:
1. В `HighlightCard` (для «Девушка в бокале» и «Варлоки»)
2. В карточке «Классический бурлеск» (burlesque-card-inner)
3. В карточке «Бурлеск с перцем» (burlesque-card-inner)

### Что изменилось в `src/components/sections/WhatIsBurlesque.tsx`:

Для всех 3 accent lines добавлено:
```diff
  <div
    className="absolute top-0 inset-x-0 h-px"
    style={{
+     top: '-1px',
      background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6), transparent)',
+     zIndex: 2,
    }}
  />
```

Изменения:
1. **`top: '-1px'`** — accent line смещён на 1px вверх, теперь он поверх рамки (а не внутри, перекрывая верхний border)
2. **`zIndex: 2`** — accent line гарантированно выше других элементов

Теперь accent line становится **декоративным элементом поверх рамки**, а не заменяет верхнюю часть border.

### Верификация (Agent Browser, реальный mouse hover):
- ✅ Base state: `border: 1px solid rgba(201,169,110,0.25)` (слабая рамка)
- ✅ Hover state: `border-top: 1px solid rgba(201,169,110,0.7)` — **верхняя рамка теперь видна!**
- ✅ border: 1px solid 0.7 — все 4 стороны рамки на месте
- ✅ boxShadow: золотое свечение
- ✅ Lint чист, ошибок нет

### Итог:
При наведении на любую из 4 карточек («Классический бурлеск», «Бурлеск с перцем», «Девушка в бокале», «Анна и Сергей Варлоки») — теперь видна полная яркая золотая обводка со всех 4 сторон.

---

## Этап 21: Финальный фикс — верхний border не уходит выше при hover (текущая сессия)

### Задача:
При наведении на карточки верхний бордюр уходил выше (под вышележащий элемент) и был не виден.

### Причина:
`transform: translateY(-4px)` поднимал карточку на 4px вверх. Верхний край карточки (вместе с border) уходил под вышележащий элемент (заголовок Part 2 или разделитель), который имел фон — и верхняя часть border становилась невидимой.

### Что изменилось в `src/components/sections/WhatIsBurlesque.tsx`:

#### 1. Убран `transform: translateY(-4px)` из hover
```diff
  .burlesque-card-inner:hover {
-   transform: translateY(-4px);
-   box-shadow: 0 0 28px rgba(201,169,110,0.18), 0 8px 30px rgba(0,0,0,0.5);
+   box-shadow: 0 0 32px rgba(201,169,110,0.28), 0 8px 30px rgba(0,0,0,0.5);
    border: 1px solid rgba(201,169,110,0.7) !important;
    border-color: rgba(201,169,110,0.7) !important;
  }

  .highlight-card-inner:hover {
-   transform: translateY(-4px);
-   box-shadow: 0 0 32px rgba(201,169,110,0.22), 0 10px 35px rgba(0,0,0,0.5);
+   box-shadow: 0 0 36px rgba(201,169,110,0.32), 0 10px 35px rgba(0,0,0,0.5);
    border: 1px solid rgba(201,169,110,0.7) !important;
    border-color: rgba(201,169,110,0.7) !important;
  }
```

Компенсация: усилил box-shadow (0.18→0.28 для burlesque, 0.22→0.32 для highlight) — визуальный hover-эффект сохранён через свечение вместо движения.

#### 2. Убран `overflow: 'hidden'` со всех 3 карточек
```diff
  style={{
    background: '...',
    border: '1px solid rgba(201,169,110,0.25)',
    padding: '22px 22px',
-   transition: 'transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease',
-   overflow: 'hidden',
+   transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
  }}
```

Причина: `overflow: hidden` обрезал accent line (`top: -1px`). Теперь accent line виден полностью, поверх border.

Также убран `transform` из transition (он больше не используется).

### Верификация (Agent Browser, реальный mouse hover):
**Burlesque card (Классический бурлеск):**
- ✅ transform: none (карточка не двигается)
- ✅ border-top: 1px solid rgba(201,169,110,0.7) — верхняя рамка видна!
- ✅ border: 1px solid 0.7 — все 4 стороны на месте
- ✅ boxShadow: 0 0 32px rgba(201,169,110,0.28) — усиленное золотое свечение

**Highlight card (Девушка в бокале):**
- ✅ transform: none
- ✅ border-top: 1px solid rgba(201,169,110,0.7) — верхняя рамка видна!
- ✅ border: 1px solid 0.7 — все 4 стороны
- ✅ boxShadow: 0 0 36px rgba(201,169,110,0.32) — усиленное свечение

### Итог:
При наведении на любую из 4 карточек («Классический бурлеск», «Бурлеск с перцем», «Девушка в бокале», «Анна и Сергей Варлоки»):
- Карточка остаётся на месте (без подъёма)
- Полная яркая золотая обводка видна со всех 4 сторон
- Усиленное золотое свечение вокруг — визуальный hover-эффект сохранён
- Lint чист, ошибок нет

---

## Этап 22: Создание страницы /about + перенос блока About (текущая сессия)

### Задача:
1. Создать отдельную страницу `/about` (О Мадам Бум)
2. Сделать блок About (editorial layout с фото продюсера) первым блоком (Hero) на /about
3. Убрать About с главной страницы
4. Обновить навигацию: «О Мадам Бум» → `/about`

### Что сделано:

#### 1. Создан `src/components/sections/Footer.tsx` (новый компонент)
- Извлечён footer из `src/app/page.tsx` в отдельный переиспользуемый компонент
- Содержит: tagline, города, соцсети (TG/VK/IG), 18+, copyright
- `id="contacts"` для якорной навигации
- Используется на обеих страницах (main + /about)

#### 2. Создан `src/app/about/page.tsx` (новая страница)
- Navbar (фиксированный)
- Spacer для очистки navbar (56px mobile, 64px desktop)
- About компонент (как Hero/первый блок)
- Footer
- Без Curtain preloader (прямая загрузка для вторичной страницы)

#### 3. Обновлён `src/app/page.tsx` (главная)
- ❌ Удалён импорт About
- ❌ Удалён `<About />` из секций
- ❌ Удалён inline footer (130+ строк)
- ✅ Добавлен импорт Footer
- ✅ Footer используется как компонент: `{curtainComplete && <Footer />}`

Новый порядок секций главной:
1. Hero
2. Afisha
3. WhatIsBurlesque
4. Calendar
5. Programs
6. Cast
7. Venues
8. Corporate
9. WhyUs
10. Footer

#### 4. Обновлён `src/components/sections/Navbar.tsx` — навигация для cross-page
**Ссылки изменены** (для работы с любой страницы):
```diff
- { label: 'О Мадам Бум', href: '#about' },
+ { label: 'О Мадам Бум', href: '/about' },
- { label: 'Состав', href: '#cast' },
+ { label: 'Состав', href: '/#cast' },
- { label: 'Галерея', href: '#gallery' },
+ { label: 'Галерея', href: '/#gallery' },
- { label: 'Афиша', href: '#afisha' },
+ { label: 'Афиша', href: '/#afisha' },
- { label: 'Календарь событий', href: '#calendar' },
+ { label: 'Календарь событий', href: '/#calendar' },
- { label: 'Программы', href: '#programs' },
+ { label: 'Программы', href: '/#programs' },
- { label: 'Контакты', href: '#contacts' },
+ { label: 'Контакты', href: '/#contacts' },
- { label: 'Заказать мероприятие', href: '#corporate' },
+ { label: 'Заказать мероприятие', href: '/#corporate' },
```

**handleNavClick обновлён** для различения same-page и cross-page:
- `href.startsWith('#')` → smooth scroll (same-page)
- `href.startsWith('/...')` → natural navigation (cross-page, без preventDefault)

#### 5. Обновлён `src/components/sections/About.tsx` — CTA
- Было: «Подробнее о проекте» → `/about` (бессмысленно на /about странице)
- Стало: «Смотреть афишу» → `/#afisha` (возврат на главную к афише)

### Верификация (Agent Browser):

**Главная страница (/):**
- ✅ HTTP 200
- ✅ Порядок секций: hero → afisha → what-is-burlesque → calendar → programs → cast → venues → corporate → whyus (About убран)
- ✅ Footer существует (id=contacts, tag=FOOTER)

**Страница /about:**
- ✅ HTTP 200
- ✅ Заголовок: «Бурлеск-кабаре «Мадам Бум»»
- ✅ Подпись: «Ксения Лапшина» (h4)
- ✅ CTA: «Смотреть афишу» → /#afisha
- ✅ Footer существует (id=contacts)
- ✅ Navbar с dropdown «О ШОУ» работает

**Cross-page навигация:**
- ✅ С /about клик «Афиша» → переход на /#afisha → Afisha section видна
- ✅ URL корректно меняется: /about → /#afisha

**Сервер и lint:**
- ✅ Lint чист (0 errors, 0 warnings)
- ✅ Обе страницы: HTTP 200, ~30ms response
- ✅ Ошибок в консоли нет

### Архитектура:
```
/src/app/
├── page.tsx          — главная (Hero, Afisha, WhatIsBurlesque, Calendar, Programs, Cast, Venues, Corporate, WhyUs, Footer)
├── about/page.tsx    — /about (Navbar, spacer, About, Footer)
└── api/calendar/     — TicketsCloud API

/src/components/sections/
├── Navbar.tsx        — обновлён для cross-page навигации
├── Footer.tsx        — НОВЫЙ, переиспользуемый
├── About.tsx         — обновлён CTA, используется на /about
└── ... остальные секции
```

### Примечание:
- Curtain preloader есть только на главной (для /about — прямая загрузка)
- При переходе с /about на /#section — curtain срабатывает, но контент загружается корректно
- /about доступен по прямой ссылке http://localhost:3000/about и через navbar dropdown «О Мадам Бум»
