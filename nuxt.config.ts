// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss', 
    'dayjs-nuxt',
    '@pinia/nuxt'
  ],
  app: {
    head: {
        link: [{ rel: 'icon', type: 'image/svg', href: '/logo_flight-app.svg' }]
    }
  }
})
