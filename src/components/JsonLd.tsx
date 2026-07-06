import siteConfig from "../../content/site.json";
import socials from "../../content/socials.json";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.name,
    "jobTitle": siteConfig.title,
    "description": siteConfig.description,
    "url": "https://shikhar-portfolio-phi.vercel.app",
    "sameAs": [
      socials.github,
      socials.linkedin
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Zypp Electric"
    },
    "knowsAbout": [
      "Generative AI",
      "Large Language Models",
      "Computer Vision",
      "Time-Series Forecasting",
      "Voice AI",
      "Backend Engineering",
      "FastAPI",
      "Python"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
