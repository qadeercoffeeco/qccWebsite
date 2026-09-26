const trackAnalyticsEvent = (eventName, parameters = {}) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
  }
};

const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid"
];

const pageParameters = new URLSearchParams(window.location.search);

const rememberAttribution = (key, value) => {
  try {
    if (value) window.sessionStorage.setItem(`qcc_${key}`, value);
  } catch {
    // Analytics should never interrupt the booking experience.
  }
};

const readAttribution = (key) => {
  try {
    return window.sessionStorage.getItem(`qcc_${key}`);
  } catch {
    return null;
  }
};

attributionKeys.forEach((key) => {
  rememberAttribution(key, pageParameters.get(key));
});

function getCtaLocation(link) {
  if (link.classList.contains("header-cta")) return "header";
  if (link.classList.contains("floating-book")) return "floating";
  if (link.closest(".hero")) return "hero";
  if (link.closest(".contact-section")) return "contact";
  return "site";
}

document.querySelectorAll('a[href$="#contact"], a[href$="#inquiry"], [data-lead-cta]').forEach((link) => {
  link.addEventListener("click", () => {
    trackAnalyticsEvent("check_availability_click", {
      cta_location: getCtaLocation(link),
      page_path: window.location.pathname
    });
  });
});

document.querySelectorAll('a[href*="app.flashquotes.com/f/qhn9mn"]').forEach((link) => {
  link.addEventListener("click", () => {
    trackAnalyticsEvent("begin_quote", {
      cta_location: getCtaLocation(link),
      page_path: window.location.pathname,
      quote_provider: "flashquotes"
    });
  });
});

document.querySelectorAll("[data-phone-cta]").forEach((link) => {
  link.addEventListener("click", () => {
    trackAnalyticsEvent("phone_lead_click", {
      cta_location: getCtaLocation(link),
      page_path: window.location.pathname
    });
  });
});

document.querySelectorAll(".event-card-link").forEach((link) => {
  link.addEventListener("click", () => {
    const eventType = link.querySelector("h3")?.textContent?.trim() || "unknown";
    trackAnalyticsEvent("service_card_click", { event_type: eventType });
  });
});

const bookingPanel = document.querySelector("[data-flashquotes-embed]");
if (bookingPanel && "IntersectionObserver" in window) {
  const bookingPanelObserver = new IntersectionObserver(
    (entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        trackAnalyticsEvent("flashquotes_embed_view", { quote_provider: "flashquotes" });
        observer.disconnect();
      }
    },
    { threshold: 0.35 }
  );

  bookingPanelObserver.observe(bookingPanel);
}

const isThankYouPage = /\/thank-you\.html$/.test(window.location.pathname);
const leadWasTracked = readAttribution("generate_lead_tracked") === "1";

if ((isThankYouPage || pageParameters.get("lead") === "1") && !leadWasTracked) {
  trackAnalyticsEvent("generate_lead", {
    lead_source: readAttribution("utm_source") || "booking_form",
    lead_medium: readAttribution("utm_medium") || "website",
    lead_campaign: readAttribution("utm_campaign") || "unattributed"
  });
  trackAnalyticsEvent("conversion", {
    send_to: "AW-18470423573/Dq9HCJme4IIdEJWYsedE"
  });
  rememberAttribution("generate_lead_tracked", "1");
}
