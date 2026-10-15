import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Cursor } from "@/components/cursor";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { ScrollProgress } from "@/components/scroll-progress";
import { experience, site } from "@/lib/data";
import { siteUrl } from "@/lib/utils";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const url = siteUrl();
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: site.title, template: `%s | ${site.shortName}` },
  description: site.description,
  applicationName: site.shortName,
  authors: [{ name: site.name, url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  keywords: [
    "Mushfiqur Rashid",
    "Mushfiqur Rashid Marmo",
    "Md. Mushfiqur Rashid Marmo",
    "Product Manager in Bangladesh",
    "Product Manager Dhaka",
    "Tech Product Manager",
    "Product Management",
    "Data Analyst in Bangladesh",
    "Data Analyst Dhaka",
    "Software Engineer in Bangladesh",
    "Software Engineer Dhaka",
    "Full Stack Developer Bangladesh",
    "Machine Learning Engineer Bangladesh",
    "AI Engineer",
    "Next.js Developer",
    "Python",
    "SQL",
    "North South University",
    "Dhaka",
    "Bangladesh",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.shortName,
    title: site.title,
    description: site.description,
    locale: "en_US",
    firstName: site.firstName,
    lastName: site.lastName,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Set GOOGLE_SITE_VERIFICATION to the token from Google Search Console to verify ownership.
  verification: googleVerification ? { google: googleVerification } : undefined,
  appleWebApp: { capable: true, title: site.shortName, statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  // Lets the page paint under the notch and home indicator; safe-area insets keep content clear of them.
  viewportFit: "cover",
};

const personId = `${url}/#person`;
const websiteId = `${url}/#website`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url,
      name: site.shortName,
      alternateName: [site.name, "Mushfiqur Rashid Marmo"],
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${url}/#profile`,
      url,
      name: site.title,
      description: site.description,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      alternateName: [site.shortName, "Mushfiqur Rashid Marmo", "Marmo"],
      givenName: site.firstName,
      familyName: site.lastName,
      jobTitle: [...site.roles],
      hasOccupation: site.roles.map((name) => ({
        "@type": "Occupation",
        name,
        occupationLocation: { "@type": "Country", name: "Bangladesh" },
      })),
      description: site.description,
      image: `${url}/images/portrait.png`,
      url,
      email: `mailto:${site.email}`,
      telephone: site.phone,
      worksFor: { "@type": "Organization", name: site.company, url: experience[0].url },
      alumniOf: { "@type": "CollegeOrUniversity", name: "North South University", address: "Dhaka, Bangladesh" },
      address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
      homeLocation: { "@type": "Place", name: site.location },
      nationality: { "@type": "Country", name: "Bangladesh" },
      sameAs: [site.socials.github, site.socials.linkedin],
      knowsAbout: [
        "Product Management",
        "Data Analysis",
        "Software Engineering",
        "Full Stack Development",
        "Machine Learning",
        "Retrieval Augmented Generation",
        "Natural Language Processing",
        "Python",
        "SQL",
        "Next.js",
        "React",
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <body>
        {/* Runs before the intro is painted: visitors who already saw it this session skip it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("intro-seen"))document.documentElement.setAttribute("data-skip-intro","")}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`.preloader{display:none!important}:is(header,main,footer):is([style*="opacity:0"],[style*="transform:translate"],[style*="transform:scale(0"],[style*="clip-path:inset(100%"]),:is(header,main,footer) :is([style*="opacity:0"],[style*="transform:translate"],[style*="transform:scale(0"],[style*="clip-path:inset(100%"]){opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <Providers>
          <ScrollProgress />
          <Cursor />
          <Navbar />
          {children}
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
