import { createApp } from './main'

const { app, router,store } = createApp()

if (window && window.cache) {
  store.state.value.cache = window.cache;
}

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app')
})