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

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: title, template: `%s — ${site.shortName}` },
  description: site.description,
  applicationName: site.shortName,
  authors: [{ name: site.name, url: site.socials.linkedin }],
  creator: site.name,
  keywords: [
    "Mushfiqur Rashid",
    "Mushfiqur Rashid Marmo",
    "Product Manager",
    "Full-Stack Developer",
    "AI Engineer",
    "Machine Learning",
    "Next.js",
    "Dhaka",
    "Bangladesh",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
    firstName: site.firstName,
    lastName: site.lastName,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.shortName,
  jobTitle: site.role,
  worksFor: { "@type": "Organization", name: site.company, url: experience[0].url },
  alumniOf: { "@type": "CollegeOrUniversity", name: "North South University" },
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  email: `mailto:${site.email}`,
  url: siteUrl(),
  sameAs: [site.socials.github, site.socials.linkedin],
  knowsAbout: ["Product Management", "Full-Stack Development", "Machine Learning", "Retrieval-Augmented Generation", "Next.js"],
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
