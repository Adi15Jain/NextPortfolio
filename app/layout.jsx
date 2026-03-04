import "./globals.css";
import { Montserrat } from "next/font/google";
import ClientCursor from "../src/components/ClientCursor";

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-montserrat",
});

export const metadata = {
    metadataBase: new URL("https://adijain.dev"),
    title: {
        default: "Adi Jain — AI & ML Developer",
        template: "%s | Adi Jain",
    },
    description:
        "Computer Science student specializing in AI, ML & DL. Building impactful products with React, Python, Node.js, and Three.js.",
    keywords: [
        "Adi Jain",
        "portfolio",
        "AI developer",
        "ML engineer",
        "React",
        "Python",
        "Three.js",
        "Next.js",
        "computer science",
    ],
    authors: [{ name: "Adi Jain" }],
    creator: "Adi Jain",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://adijain.dev",
        siteName: "Adi Jain Portfolio",
        title: "Adi Jain — AI & ML Developer",
        description:
            "Computer Science student specializing in AI, ML & DL. Building impactful products with React, Python, Node.js, and Three.js.",
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
            "Computer Science student specializing in AI, ML & DL. Building impactful products with React, Python, Node.js, and Three.js.",
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
            </head>
            <body className="antialiased">
                <ClientCursor />
                {children}
            </body>
        </html>
    );
}
