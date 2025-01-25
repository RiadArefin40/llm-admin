import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  //...
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    plugins: [
      tailwindcss(),
    ],
    
  },
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3000",
    },
  },
  compatibilityDate: '2025-01-24',
})