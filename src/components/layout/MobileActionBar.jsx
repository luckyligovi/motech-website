import { Phone } from 'lucide-react'
import { mainPhone } from '../../config/site'
import { actionNav } from '../../data/navigation'
import { telHref } from '../../lib/contactLinks'
import Button from '../ui/Button'

/** Always-visible Call and Apply actions on phones, where most visitors will arrive. */
export default function MobileActionBar() {
  return (
    // Glass, but the darkest weight: page text scrolls under this, and it has to stay legible.
    <div className="glass fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-white/10 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <Button href={telHref(mainPhone)} variant="glass" icon={Phone} className="flex-1">
        Call
      </Button>
      <Button
        to={actionNav.primary.to}
        variant="whatsapp"
        icon={actionNav.primary.icon}
        className="flex-[2]"
      >
        {actionNav.primary.label}
      </Button>
    </div>
  )
}
