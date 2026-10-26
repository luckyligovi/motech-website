import { useLocation } from 'react-router'
import Seo from '../components/shared/Seo'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import Section from '../components/ui/Section'

export default function NotFound() {
  const { pathname } = useLocation()
  return (
    <>
      <Seo path={pathname} />
      <PageHeader title="Page not found">
        That address does not match a page on this website.
      </PageHeader>
      <Section>
        <div className="flex flex-wrap gap-3">
          <Button to="/">Go to the home page</Button>
          <Button to="/courses" variant="outline">
            Browse courses
          </Button>
        </div>
      </Section>
    </>
  )
}
