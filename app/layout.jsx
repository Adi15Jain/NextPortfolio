import "./globals.css";
import { Montserrat } from "next/font/google";
import ClientCursor from "../src/components/ClientCursor";
import ScrollProgressBar from "../src/components/ScrollProgressBar";
import SmoothScroll from "../src/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-montserrat",
});

export const metadata = {
    metadataBase: new URL("https://adijain.click"),
    alternates: {
        canonical: "https://adijain.click",
    },
    title: {
        default: "Adi Jain — AI & ML Developer",
        template: "%s | Adi Jain",
    },
    description:
        "Adi Jain is an AI & ML Developer specializing in deep learning pipelines, computer vision systems, and modern interactive web architectures.",
    keywords: [
        "Adi Jain",
        "Adi Jain Portfolio",
        "Adi Jain AI & ML Developer",
        "Adi Jain Developer",
        "Adi Jain AI ML",
        "Adi Jain Machine Learning",
        "Adi Jain Deep Learning",
        "adijain.click",
        "AI Developer",
        "ML Engineer",
        "Next.js Portfolio",
        "Teerthanker Mahaveer University",
    ],
    authors: [{ name: "Adi Jain" }],
    creator: "Adi Jain",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://adijain.click",
        siteName: "Adi Jain Portfolio",
        title: "Adi Jain — AI & ML Developer",
        description:
            "Adi Jain is an AI & ML Developer specializing in deep learning pipelines, computer vision systems, and modern interactive web architectures.",
        images: [
            {
                url: "/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "Adi Jain — AI & ML Developer Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Adi Jain — AI & ML Developer",
        description:
            "Adi Jain is an AI & ML Developer specializing in deep learning pipelines, computer vision systems, and modern interactive web architectures.",
        images: ["/images/og-image.png"],
        creator: "@adi_jain_aj_",
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
    icons: {
        icon: "/images/fav.png",
        shortcut: "/images/fav.png",
        apple: "/images/fav.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={montserrat.variable}>
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Mona+Sans:ital,wght@0,200..900;1,200..900&display=swap"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([
                            {
                                "@context": "https://schema.org",
                                "@type": "Person",
                                "@id": "https://adijain.click/#person",
                                name: "Adi Jain",
                                jobTitle: "AI & Machine Learning Developer",
                                url: "https://adijain.click",
                                image: "https://adijain.click/images/fav.png",
                                sameAs: [
                                    "https://www.github.com/Adi15Jain/",
                                    "https://www.linkedin.com/in/adi-jain-73334724b/",
                                    "https://www.instagram.com/adi_jain_aj_/",
                                ],
                                alumniOf: {
                                    "@type": "EducationalOrganization",
                                    name: "Teerthanker Mahaveer University",
                                    alternateName: "TMU",
                                },
                                knowsAbout: [
                                    "Artificial Intelligence",
                                    "Machine Learning",
                                    "Deep Learning",
                                    "Full-Stack Web Development",
                                    "Next.js",
                                    "React.js",
                                    "Python",
                                    "Three.js",
                                ],
                            },
                            {
                                "@context": "https://schema.org",
                                "@type": "WebSite",
                                "@id": "https://adijain.click/#website",
                                url: "https://adijain.click",
                                name: "Adi Jain Portfolio",
                                publisher: {
                                    "@id": "https://adijain.click/#person",
                                },
                            },
                        ]),
                    }}
                />
            </head>
            <body className="antialiased">
                <SmoothScroll />
                <ScrollProgressBar />
                <ClientCursor />
                {children}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
