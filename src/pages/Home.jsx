import AboutSnapshot from '../components/home/AboutSnapshot'
import AdmissionsSteps from '../components/home/AdmissionsSteps'
import ClosingCta from '../components/home/ClosingCta'
import CoursePreview from '../components/home/CoursePreview'
import Faqs from '../components/home/Faqs'
import Hero from '../components/home/Hero'
import Seo from '../components/shared/Seo'

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Hero />
      <CoursePreview />
      <AboutSnapshot />
      <AdmissionsSteps />
      <Faqs />
      <ClosingCta />
    </>
  )
}
