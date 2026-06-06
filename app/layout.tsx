import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const SITE_URL = "https://disfrazarte-delta.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Disfrazarte — Alquiler de Trajes y Disfraces",
    template: "%s | Disfrazarte",
  },
  description:
    "Alquiler de trajes de desfile, disfraces y vestuario para eventos en Ambato y Riobamba, Ecuador. Más de 500 modelos. Carnaval, teatro, Halloween y más. Envíos a todo Ecuador.",
  keywords: [
    "alquiler disfraces",
    "alquiler trajes",
    "disfraces Ambato",
    "disfraces Riobamba",
    "trajes desfile Ecuador",
    "carnaval Ecuador",
    "vestuario teatro Ecuador",
    "disfrazarte",
    "disfraces Ecuador",
    "alquiler vestuario",
  ],
  authors: [{ name: "Disfrazarte" }],
  creator: "Disfrazarte",
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: SITE_URL,
    siteName: "Disfrazarte",
    title: "Disfrazarte — Alquiler de Trajes y Disfraces",
    description:
      "Más de 500 modelos de trajes y disfraces. Ambato & Riobamba. Envíos a todo Ecuador.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Disfrazarte — Alquiler de Trajes y Disfraces en Ecuador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disfrazarte — Alquiler de Trajes y Disfraces",
    description:
      "Más de 500 modelos de trajes y disfraces. Ambato & Riobamba. Envíos a todo Ecuador.",
    images: ["/opengraph-image"],
    creator: "@disfrazarte_ec",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": SITE_URL,
  name: "Disfrazarte",
  description:
    "Alquiler de trajes de desfile, disfraces y vestuario para eventos. Más de 500 modelos disponibles.",
  url: SITE_URL,
  telephone: "+593969016264",
  image: `${SITE_URL}/logo_full.png`,
  logo: `${SITE_URL}/logo_full.png`,
  priceRange: "$$",
  sameAs: ["https://www.instagram.com/disfrazarte_ec/"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  location: [
    {
      "@type": "Place",
      name: "Casa Matriz — Ambato",
      address: {
        "@type": "PostalAddress",
        streetAddress: "13 de Abril y Mera, Centro Comercial Ambato",
        addressLocality: "Ambato",
        addressCountry: "EC",
      },
    },
    {
      "@type": "Place",
      name: "Sucursal — Riobamba",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Riobamba",
        addressCountry: "EC",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
