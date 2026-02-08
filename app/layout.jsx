import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-montserrat",
});

export const metadata = {
    title: "Adi Jain —— Portfolio",
    description: "Adi Jain's Personal Portfolio",
    icons: {
        icon: "/images/fav.png",
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
            <body className="antialiased">{children}</body>
        </html>
    );
}
