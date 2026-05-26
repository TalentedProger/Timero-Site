import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  h1?: string;
  type?: string;
  structuredData?: Record<string, any>[];
}

export function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  type = "website",
  structuredData = []
}: SEOHeadProps) {
  const siteUrl = "https://timero.ru";
  const url = `${siteUrl}${canonicalUrl}`;

  const baseStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Timero - Таймер Онлайн",
      "url": "https://timero.ru/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://timero.ru/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Главная",
          "item": "https://timero.ru/"
        },
        ...(canonicalUrl !== "/" ? [{
          "@type": "ListItem",
          "position": 2,
          "name": title.split(" - ")[0] || title,
          "item": url
        }] : [])
      ]
    },
    ...structuredData
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      <link rel="canonical" href={url} />
      
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {baseStructuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}