import HeroCarousel from '@/components/sections/HeroCarousel'
import StatsSection from '@/components/sections/StatsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import { WhyUsSection, CTASection, BlogPreview, PartnersSection } from '@/components/sections/WhyUsSection'

export const metadata = {
  title: 'Jaman Engineering Works Limited | Premier Construction Kenya',
  description: 'Kenya\'s leading construction and engineering company. NCA Registered, EBK Accredited. Building excellence since 2009.',
}

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <StatsSection />
      <ServicesSection />
      <WhyUsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <PartnersSection />
      <BlogPreview />
      <CTASection />
    </>
  )
}
