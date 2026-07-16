import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://corewellmusculoskeletaluganda.com"),
  title: { default: "CoreWell Uganda | Physiotherapy & Musculoskeletal Health", template: "%s | CoreWell Uganda" },
  description: "Evidence-based physiotherapy, spine care, injury rehabilitation and workplace wellness from CoreWell Uganda.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "CoreWell Uganda | Expert Physiotherapy. Stronger You.",
    description: "Evidence-based physiotherapy and musculoskeletal health from CoreWell Uganda.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "CoreWell Uganda physiotherapy" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
