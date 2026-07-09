/* ═══════════════════════════════════════════════════════════════
 * Яндекс.Метрика — счётчик аналитики
 * ═══════════════════════════════════════════════════════════════
 *
 * Идентификатор счётчика: по умолчанию 109598035 (реальный счётчик
 * сайта «Мадам Бум»). Можно переопределить через переменную окружения
 * NEXT_PUBLIC_YANDEX_METRIKA_ID — полезно для тестовых окружений.
 *
 * Примечание: ID счётчика Метрики — публичное значение (он виден в
 * HTML-исходнике каждой страницы), поэтому хардкод безопасен и
 * гарантирует работу счётчика в production без настройки env.
 *
 * Снипет соответствует официальному коду счётчика Яндекс.Метрики
 * (https://metrica.yandex.ru) с настройками:
 *   ssr, webvisor, clickmap, ecommerce, referrer, url,
 *   accurateTrackBounce, trackLinks
 */

import Script from "next/script";

declare global {
  interface Window {
    ym?: (
      counterId: number | string,
      method: string,
      ...args: unknown[]
    ) => void;
  }
}

// Реальный счётчик сайта «Мадам Бум» (публичное значение).
// Можно переопределить через NEXT_PUBLIC_YANDEX_METRIKA_ID.
const METRIKA_ID =
  process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || "109598035";

export function YandexMetrika() {
  const counterId = METRIKA_ID.trim();

  return (
    <>
      {/* Yandex.Metrika counter — основной снипет (tag.js + init) */}
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=${counterId}', 'ym');

          ym(${counterId}, 'init', {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              referrer: document.referrer,
              url: location.href,
              accurateTrackBounce: true,
              trackLinks: true
          });`}
      </Script>

      {/* /Yandex.Metrika counter — <noscript> фолбэк для пользователей с отключённым JS */}
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${counterId}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}

export default YandexMetrika;
