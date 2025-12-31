import { lazy, Suspense } from 'react';
import Navbar from '@/components/cricket/Navbar';
import HeroSection from '@/components/cricket/HeroSection';
import SEO from '@/components/SEO';

// Lazy load components below the fold to improve initial bundle size and performance
const MissionSection = lazy(() => import('@/components/cricket/MissionSection'));
const NumbersSpeak = lazy(() => import('@/components/cricket/NumbersSpeak'));
const JourneySection = lazy(() => import('@/components/cricket/JourneySection'));
const FutureSection = lazy(() => import('@/components/cricket/FutureSection'));
const StatsSection = lazy(() => import('@/components/cricket/StatsSection'));
const FeaturesSection = lazy(() => import('@/components/cricket/FeaturesSection'));
const TestimonialsSection = lazy(() => import('@/components/cricket/TestimonialsSection'));
const UrgencySection = lazy(() => import('@/components/cricket/UrgencySection'));
// const RegistrationForm = lazy(() => import('@/components/cricket/RegistrationForm'));
// const CoachRegistrationForm = lazy(() => import('@/components/cricket/CoachRegistrationForm'));
const FAQSection = lazy(() => import('@/components/cricket/FAQSection'));
const FloatingRegisterButton = lazy(() => import('@/components/cricket/FloatingRegisterButton'));
const Footer = lazy(() => import('@/components/cricket/Footer'));

// Loading fallback component
const SectionLoader = () => <div className="w-full h-20 bg-transparent animate-pulse" />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="BRPL - Join the Ultimate Cricket League"
        description="Register now for the Beyond Reach Premier League. Showcase your cricket talent, get coached by experts, and compete in the biggest tournament."
      />
      <Navbar />
      <main>
        <HeroSection />

        <Suspense fallback={<SectionLoader />}>
          <MissionSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <NumbersSpeak />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <JourneySection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <FutureSection />
        </Suspense>

        {/* <div id="stats">
          <Suspense fallback={<SectionLoader />}>
            <StatsSection />
          </Suspense>
        </div> */}

        <div id="testimonials">
          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>
        </div>

        <Suspense fallback={<SectionLoader />}>
          <UrgencySection />
        </Suspense>

        {/* <div id="why-choose-us">
          <Suspense fallback={<SectionLoader />}>
            <FeaturesSection />
          </Suspense>
        </div> */}

        {/* <RegistrationForm /> */}
        {/* <CoachRegistrationForm /> */}

        <div id="faqs">
          <Suspense fallback={<SectionLoader />}>
            <FAQSection />
          </Suspense>
        </div>
      </main>

      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        <FloatingRegisterButton />
      </Suspense>
    </div>
  );
};

export default Index;
