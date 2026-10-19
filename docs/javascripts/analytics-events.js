/**
 * Analytics Events Tracking - Conhecimentos Pessoais
 * 
 * Monitora eventos de interação (cópia de código, cliques em sistemas
 * institucionais, expansão de detalhes, busca sem resultado, profundidade de
 * rolagem, índice, abas, tema, impressão, âncoras e tempo na página)
 * respeitando o consentimento LGPD.
 */
(function () {
  "use strict";

  /**
   * Verifica se o usuário aceitou o consentimento de cookies para analytics.
   * @returns {boolean}
   */
  function hasAnalyticsConsent() {
    if (typeof __md_get !== "function") {
      return false;
    }
    var consent = __md_get("__consent");
    return Boolean(consent && consent.analytics);
  }

  /**
   * Envia evento para o Google Analytics 4 via gtag ou dataLayer.
   * @param {string} eventName
   * @param {Object} eventParams
   */
  function sendGaEvent(eventName, eventParams) {
    if (!hasAnalyticsConsent()) {
      return;
    }

    if (typeof gtag === "function") {
      gtag("event", eventName, eventParams);
    } else if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: eventName }, eventParams));
    }
  }

  /**
   * Categoriza sistemas institucionais e plataformas externas com base no hostname.
   * @param {string} hostname
   * @returns {string}
   */
  function classifySystem(hostname) {
    if (hostname.indexOf("suap.ifrn.edu.br") !== -1) return "SUAP";
    if (hostname.indexOf("wifi.ifrn.edu.br") !== -1) return "Wi-Fi IFRN";
    if (hostname.indexOf("ifrn.edu.br") !== -1) return "Portal IFRN";
    if (hostname.indexOf("rnp.br") !== -1) return "RNP / Infovia";
    if (
      hostname.indexOf("portal.azure.com") !== -1 ||
      hostname.indexOf("microsoft.com") !== -1 ||
      hostname.indexOf("office.com") !== -1
    ) {
      return "Microsoft 365 / Azure";
    }
    if (hostname.indexOf("github.com") !== -1) return "GitHub";
    if (hostname.indexOf("tinyurl.com") !== -1) return "Manuais IFRN";
    return "Outro Externo";
  }

  /**
   * Inicializa os listeners de eventos usando event delegation no body.
   */
  function initAnalyticsListeners() {
    // 1. Rastreamento de cópia de comandos e scripts
    document.body.addEventListener("click", function (event) {
      var copyBtn = event.target.closest(".md-clipboard");
      if (!copyBtn) return;

      var codeBlock = copyBtn.closest(".highlight") || copyBtn.parentElement;
      var language = "code";

      if (codeBlock) {
        var codeElem = codeBlock.querySelector("code");
        if (codeElem && codeElem.className) {
          var match = codeElem.className.match(/language-([\w-]+)/);
          if (match) language = match[1];
        }
        if (language === "code" && codeBlock.className) {
          var blockMatch = codeBlock.className.match(/language-([\w-]+)/);
          if (blockMatch) language = blockMatch[1];
        }
      }

      sendGaEvent("code_copy", {
        page_path: window.location.pathname,
        code_language: language
      });
    });

    // 2. Rastreamento de links externos e sistemas institucionais
    document.body.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      if (!link || !link.href) return;

      try {
        var url = new URL(link.href, window.location.origin);
        if (url.protocol !== "http:" && url.protocol !== "https:") return;

        if (url.hostname !== window.location.hostname) {
          var system = classifySystem(url.hostname);
          sendGaEvent("outbound_click", {
            page_path: window.location.pathname,
            destination_url: url.href,
            destination_hostname: url.hostname,
            system_name: system,
            link_text: (link.textContent || "").trim().slice(0, 80)
          });
        }
      } catch (err) {
        // Ignora URLs inválidas
      }
    });

    // 3. Rastreamento de expansão de detalhes e troubleshooting
    document.body.addEventListener(
      "toggle",
      function (event) {
        var target = event.target;
        if (target && target.tagName === "DETAILS" && target.open) {
          var summary = target.querySelector("summary");
          var title = summary ? (summary.textContent || "").trim() : "Detalhes";

          sendGaEvent("expand_details", {
            page_path: window.location.pathname,
            section_title: title.slice(0, 80)
          });
        }
      },
      true
    );

    // 4. Rastreamento de navegação: índice lateral, abas, âncoras e tema
    document.body.addEventListener("click", function (event) {
      var tocLink = event.target.closest(".md-nav--secondary a");
      if (tocLink) {
        sendGaEvent("toc_click", {
          page_path: window.location.pathname,
          section_title: (tocLink.textContent || "").trim().slice(0, 80)
        });
        return;
      }

      var tabLink = event.target.closest(".md-tabs__link");
      if (tabLink) {
        sendGaEvent("nav_tab_click", {
          page_path: window.location.pathname,
          tab_name: (tabLink.textContent || "").trim().slice(0, 80)
        });
        return;
      }

      var anchor = event.target.closest(".headerlink");
      if (anchor) {
        var heading = anchor.closest("h1, h2, h3, h4, h5, h6");
        var headingText = heading ? (heading.textContent || "").replace("¶", "").trim() : "";
        sendGaEvent("anchor_copy", {
          page_path: window.location.pathname,
          section_title: headingText.slice(0, 80)
        });
      }
    });

    document.body.addEventListener("change", function (event) {
      var input = event.target;
      if (!input || !input.closest || !input.closest("[data-md-component='palette']")) return;
      sendGaEvent("theme_toggle", {
        page_path: window.location.pathname,
        scheme: input.getAttribute("data-md-color-scheme") || "desconhecido"
      });
    });

    // 5. Impressão da página (indício de uso como procedimento)
    window.addEventListener("beforeprint", function () {
      sendGaEvent("print_page", { page_path: window.location.pathname });
    });

    initSearchNoResults();
    initScrollDepth();
    initTimeOnPage();
  }

  /**
   * Envia `search_no_results` quando a busca do Material não retorna documentos.
   * Um evento por termo, com debounce para ignorar digitação parcial.
   */
  function initSearchNoResults() {
    var input = document.querySelector(".md-search__input");
    var meta = document.querySelector(".md-search-result__meta");
    if (!input || !meta || typeof MutationObserver !== "function") return;

    var timer = null;
    var lastSent = "";

    new MutationObserver(function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var term = (input.value || "").trim();
        if (term.length < 3 || term === lastSent) return;
        if (!/nenhum/i.test(meta.textContent || "")) return;
        lastSent = term;
        sendGaEvent("search_no_results", {
          page_path: window.location.pathname,
          search_term: term.slice(0, 80)
        });
      }, 1200);
    }).observe(meta, { childList: true, characterData: true, subtree: true });
  }

  /**
   * Envia `scroll_depth` uma vez por marco (25, 50, 75, 100%) em cada página.
   */
  function initScrollDepth() {
    var marks = [25, 50, 75, 100];
    var reached = {};
    var ticking = false;

    function check() {
      ticking = false;
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      var percent = (window.scrollY / scrollable) * 100;
      marks.forEach(function (mark) {
        if (percent >= mark - 1 && !reached[mark]) {
          reached[mark] = true;
          sendGaEvent("scroll_depth", {
            page_path: window.location.pathname,
            percent: mark
          });
        }
      });
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(check);
        }
      },
      { passive: true }
    );
  }

  /**
   * Envia `time_on_page` ao sair da página, em faixas, contando só tempo visível.
   */
  function initTimeOnPage() {
    var visibleMs = 0;
    var since = document.visibilityState === "visible" ? Date.now() : null;
    var sent = false;

    function bucket(seconds) {
      if (seconds < 10) return "<10s";
      if (seconds < 60) return "10-60s";
      if (seconds < 180) return "1-3min";
      return ">3min";
    }

    function flush() {
      if (sent) return;
      if (since !== null) {
        visibleMs += Date.now() - since;
        since = null;
      }
      sent = true;
      sendGaEvent("time_on_page", {
        page_path: window.location.pathname,
        time_bucket: bucket(visibleMs / 1000),
        transport_type: "beacon"
      });
    }

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") {
        if (since !== null) {
          visibleMs += Date.now() - since;
          since = null;
        }
        flush();
      } else if (!sent) {
        since = Date.now();
      }
    });
    window.addEventListener("pagehide", flush);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnalyticsListeners);
  } else {
    initAnalyticsListeners();
  }
})();
