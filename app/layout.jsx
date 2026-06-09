import "./globals.css";
import { Montserrat, Mona_Sans } from "next/font/google";
// import ClientCursor from "../src/components/ClientCursor";
import ScrollProgressBar from "../src/components/ScrollProgressBar";
import SmoothScroll from "../src/components/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-montserrat",
});

const monaSans = Mona_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-mona-sans",
});

export const viewport = {
    themeColor: "#030303",
    width: "device-width",
    initialScale: 1,
};

export const metadata = {
    metadataBase: new URL("https://adijain.click"),
    alternates: {
        canonical: "https://adijain.click",
    },
    title: {
        default: "Adi Jain — AI & ML Developer & Software Engineer Portfolio",
        template: "%s | Adi Jain Portfolio",
    },
    description:
        "Adi Jain is an AI & ML Developer and Software Engineer specializing in deep learning pipelines, computer vision systems (CNN), Three.js 3D web interfaces, and high-performance backend platforms.",
    authors: [{ name: "Adi Jain" }],
    creator: "Adi Jain",
    publisher: "Adi Jain",
    applicationName: "Adi Jain Portfolio",
    referrer: "origin-when-cross-origin",
    category: "technology",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://adijain.click",
        siteName: "Adi Jain Portfolio",
        title: "Adi Jain — AI & ML Developer & Software Engineer Portfolio",
        description:
            "Discover computer vision triage classifiers, real-time WebSocket screening terminals, and interactive Three.js 3D structures engineered by Adi Jain.",
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
        title: "Adi Jain — AI & ML Developer & Software Engineer Portfolio",
        description:
            "Discover computer vision triage classifiers, real-time WebSocket screening terminals, and interactive Three.js 3D structures engineered by Adi Jain.",
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
        icon: "/images/avatar_noBg.png",
        shortcut: "/images/avatar_noBg.png",
        apple: "/images/avatar_noBg.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${montserrat.variable} ${monaSans.variable}`}
        >
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify([
                            {
                                "@context": "https://schema.org",
                                "@type": "Person",
                                "@id": "https://adijain.click/#person",
                                name: "Adi Jain",
                                gender: "http://schema.org/Male",
                                description:
                                    "Adi Jain is an AI & Machine Learning Developer and Software Engineer specializing in deep learning, computer vision, and modern web architectures.",
                                jobTitle: "AI & Machine Learning Developer",
                                url: "https://adijain.click",
                                image: "https://adijain.click/images/avatar_noBg.png",
                                sameAs: [
                                    "https://www.github.com/Adi15Jain/",
                                    "https://www.linkedin.com/in/adi-jain-73334724b/",
                                ],
                                alumniOf: {
                                    "@type": "EducationalOrganization",
                                    name: "Teerthanker Mahaveer University",
                                    alternateName: "TMU",
                                },
                                knowsLanguage: ["English", "Hindi"],
                                knowsAbout: [
                                    "Artificial Intelligence",
                                    "Machine Learning",
                                    "Deep Learning",
                                    "Full-Stack Web Development",
                                    "Next.js",
                                    "React.js",
                                    "Python",
                                    "Three.js",
                                    "FastAPI",
                                    "SQL",
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
                {/* <ClientCursor /> */}
                {children}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
