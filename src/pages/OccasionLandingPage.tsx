import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { HeaderExperiment } from "@/components/sections/header-experiment";
import { FooterExperiment } from "@/components/sections/footer-experiment";
import { FaqSectionMain } from "@/components/sections/faq-section-main";
import { OccasionHero } from "@/components/occasion/OccasionHero";
import { OccasionProductFormats } from "@/components/occasion/OccasionProductFormats";
import {
    OccasionFinalCta,
    OccasionHowItWorksSection,
    OccasionSituationSection,
    OccasionSongIdeasSection,
} from "@/components/occasion/OccasionLandingSections";
import { getOccasionBySlug } from "@/data/occasionData";
import { posthog } from "@/providers/PostHogProvider";
import NotFound from "./NotFound";

const OccasionLandingPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const occasion = getOccasionBySlug(slug);

    // Перехід із каталогу на головній має починатись з початку сторінки.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // SEO: title і description беруться з конфігурації приводу.
    useEffect(() => {
        if (!occasion) return;

        const previousTitle = document.title;
        document.title = occasion.seoTitle;

        const descriptionTag = document.querySelector('meta[name="description"]');
        const previousDescription = descriptionTag?.getAttribute("content") ?? null;
        descriptionTag?.setAttribute("content", occasion.seoDescription);

        return () => {
            document.title = previousTitle;
            if (previousDescription !== null) {
                descriptionTag?.setAttribute("content", previousDescription);
            }
        };
    }, [occasion]);

    useEffect(() => {
        if (!occasion) return;
        posthog.capture('occasion_view', { slug: occasion.slug });
    }, [occasion]);

    if (!occasion) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen bg-white">
            <HeaderExperiment ctaLabel="Створити листівку" />

            <OccasionHero occasion={occasion} />
            <OccasionSituationSection occasion={occasion} />
            <OccasionSongIdeasSection occasion={occasion} />
            <OccasionProductFormats occasion={occasion} />
            <OccasionHowItWorksSection />
            <OccasionFinalCta occasion={occasion} />
            <FaqSectionMain />

            <FooterExperiment />
        </div>
    );
};

export default OccasionLandingPage;
