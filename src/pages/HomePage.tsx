import HeroSection from '../components/sections/HeroSection'
import WhyUsSection from '../components/sections/WhyUsSection'
import GalleryPreview from '../components/sections/GalleryPreview'
import StatsSection from '../components/sections/StatsSection'
import FeaturedProducts from '../components/sections/FeaturedProducts'
import CTABanner from '../components/sections/CTABanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <WhyUsSection />
      <StatsSection />
      <GalleryPreview />
      <CTABanner />
    </>
  )
}
