import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  immediate: true,
  onRegistered(registration) {
    if (registration) {
      setInterval(() => {
        registration.update()
      }, 60 * 60 * 1000)
    }
  },
  onNeedRefresh() {
    updateSW(true)
  },
})

