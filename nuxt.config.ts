import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 css: ['~/assets/css/main.css'],
                    vite: {
                      plugins: [
                        tailwindcss(),
                        ],
                    },
  compatibilityDate: "2026-07-08",
  devtools: { enabled: true },
  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/image']
})