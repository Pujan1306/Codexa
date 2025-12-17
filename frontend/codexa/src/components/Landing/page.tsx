// src/components/Landing/page.tsx
import { useState } from 'react';
import {Navbar} from './navbar';
import HeroSection from './hero-section';
import FeatureSection from './feature';

export function LandingPage() {
    const [_, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <Navbar onOpenModal={handleOpenModal} />
            <HeroSection onOpenModal={handleOpenModal} />
            <FeatureSection />
        </>
    );
}