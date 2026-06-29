import { siteConfig } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "pt-BR",
    },
    {
      "@type": "SportsEvent",
      "@id": `${siteConfig.url}/#event`,
      name: "Copa do Mundo FIFA 2026 — Fase de Mata-Mata",
      description: siteConfig.description,
      sport: "Football",
      url: siteConfig.url,
      startDate: "2026-06-28",
      endDate: "2026-07-19",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        { "@type": "Country", name: "Estados Unidos" },
        { "@type": "Country", name: "Canadá" },
        { "@type": "Country", name: "México" },
      ],
      organizer: {
        "@type": "SportsOrganization",
        name: "FIFA",
        url: "https://www.fifa.com",
      },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires a raw script tag
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
