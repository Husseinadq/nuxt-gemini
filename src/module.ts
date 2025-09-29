import { addServerHandler, addTemplate, createResolver, defineNuxtModule, addImportsDir } from '@nuxt/kit'

export interface GeminiModuleOptions {
  provider: 'developer' | 'vertex'
  model: string
  apiVersion?: 'v1' | 'v1alpha'
  safetyPreset?: 'strict' | 'balanced' | 'relaxed'
  grounding?: { enabled: boolean, provider?: 'google-search' }
  files?: { enabled: boolean }
  live?: { enabled: boolean, defaultModel?: string }
  routes?: { prefix: string }
  vertex?: { project?: string, location?: string }
}

export default defineNuxtModule<GeminiModuleOptions>({
  meta: {
    name: 'nuxt-gemini',
    configKey: 'gemini',
    compatibility: { nuxt: '^4.0.0' }
  },
  defaults: {
    provider: 'developer',
    model: 'gemini-2.0-flash-001',
    apiVersion: 'v1',
    safetyPreset: 'balanced',
    grounding: { enabled: false },
    files: { enabled: true },
    live: { enabled: false, defaultModel: 'gemini-2.0-flash-live-001' },
    routes: { prefix: '/api/gemini' },
    vertex: { location: 'us-central1' }
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Runtime config (server-only; users set env vars)
    nuxt.options.runtimeConfig.gemini = nuxt.options.runtimeConfig.gemini || {}
    // Expose minimal public config (no secrets)
    nuxt.options.runtimeConfig.public.gemini = { routes: options.routes, model: options.model }

    // Auto-import composables
    addImportsDir(resolve('./runtime/composables'))

    // Server handlers (SSE chat, generate, files, token)
    const prefix = options.routes?.prefix || '/api/gemini'
    addServerHandler({ route: `${prefix}/generate`, handler: resolve('./runtime/server/generate.post') })
    addServerHandler({ route: `${prefix}/chat`, handler: resolve('./runtime/server/chat.post') })
    addServerHandler({ route: `${prefix}/files`, handler: resolve('./runtime/server/files.post') })
    addServerHandler({ route: `${prefix}/token`, handler: resolve('./runtime/server/token.post') })

    // Runtime plugin (client helper)
    addTemplate({
      filename: 'gemini/runtime/plugin.mjs',
      getContents: () => `export default defineNuxtPlugin(()=>({}));`
    })
  }
})
