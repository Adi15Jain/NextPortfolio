export const metadata = {
    title: "Projects Showcase",
    description:
        "Discover computer vision triage models, real-time speech training tools, and cryptocurrency tracking systems engineered by Adi Jain.",
    alternates: {
        canonical: "https://adijain.click/projects",
    },
    openGraph: {
        title: "Projects Showcase | Adi Jain Portfolio",
        description:
            "Discover computer vision triage models, real-time speech training tools, and cryptocurrency tracking systems engineered by Adi Jain.",
        url: "https://adijain.click/projects",
        type: "website",
        images: [
            {
                url: "/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "Projects Showcase | Adi Jain Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Projects Showcase | Adi Jain Portfolio",
        description:
            "Discover computer vision triage models, real-time speech training tools, and cryptocurrency tracking systems engineered by Adi Jain.",
        images: ["/images/og-image.png"],
    },
};

export default function ProjectsLayout({ children }) {
    return <>{children}</>;
}
