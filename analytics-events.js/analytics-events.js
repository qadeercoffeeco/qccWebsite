const trackAnalyticsEvent = (eventName, parameters = {}) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
  }
};

function getCtaLocation(link) {
  if (link.classList.contains("header-cta")) return "header";
  if (link.classList.contains("floating-book")) return "floating";
  if (link.closest(".hero")) return "hero";
  if (link.closest(".contact-section")) return "contact";
  return "site";
}

document.querySelectorAll('a[href="#contact"], a[href="/#contact"]').forEach((link) => {
  link.addEventListener("click", () => {
    trackAnalyticsEvent("check_availability_click", {
      cta_location: getCtaLocation(link)
    });
  });
});

document.querySelectorAll(".event-card-link").forEach((link) => {
  link.addEventListener("click", () => {
    const eventType = link.querySelector("h3")?.textContent?.trim() || "unknown";
    trackAnalyticsEvent("service_card_click", { event_type: eventType });
  });
});

const bookingPanel = document.querySelector(".tally-panel");
if (bookingPanel && "IntersectionObserver" in window) {
  const bookingPanelObserver = new IntersectionObserver(
    (entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        trackAnalyticsEvent("booking_form_view");
        observer.disconnect();
      }
    },
    { threshold: 0.35 }
  );

  bookingPanelObserver.observe(bookingPanel);
}

if (new URLSearchParams(window.location.search).get("lead") === "1") {
  trackAnalyticsEvent("generate_lead", { lead_source: "booking_form" });
}
