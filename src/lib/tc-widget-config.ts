/* ═══════════════════════════════════════════════════════════════
 * TicketsCloud Widget Config
 * ═══════════════════════════════════════════════════════════════
 *
 * Карта площадок → URL виджета продаж TicketsCloud.
 *
 * API TicketsCloud НЕ возвращает URL виджетов — эти поддомены
 * настраиваются отдельно в ЛК TicketsCloud (раздел «Виджеты продаж»).
 *
 * Чтобы добавить новый виджет:
 * 1. Узнайте venue.id в ЛК TicketsCloud (или через /api/calendar ответ)
 * 2. Добавьте строку в VENUE_WIDGETS ниже:
 *    'venue_id_здесь': 'https://поддомен.ticketscloud.org/'
 *
 * Важно: venue.id надёжнее матчинга по названию (если площадку
 * переименуют в ЛК — виджет всё равно продолжит работать).
 */

/* ─── Поддомены виджетов по venue.id ─── */
export const VENUE_WIDGETS: Record<string, string> = {
  // Гримёрка Gastro Club & Karaoke Bar (Москва, Пушечная ул., 9/6)
  // Шоу по пятницам (классическая программа)
  '69036b3d88263f70479d39c2': 'https://madamboomgrimerka.ticketscloud.org/',

  // Ibiza (Санкт-Петербург, Садовая ул., 12)
  // Шоу по субботам («Джазовый бунт»)
  '63d245c0cf850e128fd98aeb': 'https://madamboomibiza.ticketscloud.org/',

  // Unity_Sennaya (Санкт-Петербург, пер. Гривцова, 4)
  // Шоу по четвергам (классическая программа)
  '6009c4462b7ecc1335ac7299': 'https://unitysummer.ticketscloud.org/',
}

/* ─── Override по типу шоу (когда на одной площадке несколько виджетов) ───
 *
 * Гримёрка (Москва) имеет ДВА виджета в зависимости от программы:
 *  - Классическая программа (пт) → madamboomgrimerka.ticketscloud.org
 *  - «Джазовый бунт» (сб)         → jazzandburlesque.ticketscloud.org
 *
 * Этот override применяется ПОСЛЕ VENUE_WIDGETS (приоритет выше).
 */
export const SHOW_OVERRIDES: Array<{
  venueId: string
  titleMatch: RegExp
  url: string
  comment: string
}> = [
  {
    venueId: '69036b3d88263f70479d39c2', // Гримёрка (Москва)
    titleMatch: /джазовый бунт/i,
    url: 'https://jazzandburlesque.ticketscloud.org/',
    comment: '«Джазовый бунт» по субботам в Гримёрке',
  },
]

/* ─── Общий виджет организатора (fallback) ───
 *
 * Используется, если venue.id не найден в VENUE_WIDGETS
 * и ни один SHOW_OVERRIDE не сработал.
 *
 * Это виджет продаж организатора «Бурлеск кабаре Мадам Бум»
 * (org.id = 6a04a283ace6bbe321827e6f) — показывает все мероприятия.
 */
export const ORG_WIDGET_URL: string =
  'https://6a04a283ace6bbe321827e6f.ticketscloud.org/'

/* ─── Главная функция: получить URL виджета для мероприятия ───
 *
 * Приоритет:
 *   1. SHOW_OVERRIDES (точный матч по venue.id + названию шоу)
 *   2. VENUE_WIDGETS (по venue.id)
 *   3. ORG_WIDGET_URL (общий виджет организатора, fallback)
 *
 * Возвращает null только если ORG_WIDGET_URL пустой.
 */
export function getWidgetUrl(
  venueId: string,
  eventTitle: string
): string | null {
  // 1. Check show-specific overrides first (highest priority)
  for (const override of SHOW_OVERRIDES) {
    if (override.venueId === venueId && override.titleMatch.test(eventTitle)) {
      return override.url
    }
  }

  // 2. Check venue-specific widget
  if (VENUE_WIDGETS[venueId]) {
    return VENUE_WIDGETS[venueId]
  }

  // 3. Fallback: org-level widget (shows all events)
  if (ORG_WIDGET_URL) {
    return ORG_WIDGET_URL
  }

  return null
}
