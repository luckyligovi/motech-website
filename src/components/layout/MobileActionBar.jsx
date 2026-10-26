import { Phone } from 'lucide-react'
import { mainPhone } from '../../config/site'
import { telHref } from '../../lib/contactLinks'
import Button from '../ui/Button'

/** Always-visible Call and Enquire actions on phones, where most visitors will arrive. */
export default function MobileActionBar() {
  return (
    // Solid rather than glass: page text scrolling underneath a translucent bar is hard to read.
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-white/10 bg-navy-950 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <Button href={telHref(mainPhone)} variant="glass" icon={Phone} className="flex-1">
        Call
      </Button>
      <Button to="/contact" className="flex-[2]">
        Enquire about a course
      </Button>
    </div>
  )
}
