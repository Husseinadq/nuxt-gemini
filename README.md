# nuxt-gemini

A Nuxt 4 module that makes the **Gemini API** stupid-simple, with **secure server routes**, **SSE streaming**, **Files API**, **Function Calling**, **Structured Output**, **Grounding**, and **Live API** (via ephemeral tokens). Works with both **Gemini Developer API** and **Vertex AI** via a single config switch.

> Status: Starter skeleton. See `src/` for module code & runtime, and `docs/` for additional guidance.

## Quick start

```bash
# with pnpm
pnpm i
pnpm run build
# publish locally to test (optional)
# pnpm pack
```

Then install in a Nuxt 4 app:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-gemini'],
  gemini: {
    provider: 'developer',
    model: 'gemini-2.0-flash-001',
    routes: { prefix: '/api/gemini' }
  }
})
```

Set env:

```bash
# Developer API
export GEMINI_API_KEY=YOUR_KEY

# Vertex (optional, server side)
export GOOGLE_GENAI_USE_VERTEXAI=true
export GOOGLE_CLOUD_PROJECT=your-project
export GOOGLE_CLOUD_LOCATION=us-central1
```

## Development

- Build: `pnpm build` (uses `@nuxt/module-builder`)
- Typecheck: `pnpm typecheck`
- Test: `pnpm test`

## License

MIT


### Using npm instead of pnpm

If you prefer npm:

```bash
npm install        # generates package-lock.json
npm run build
npm test
```

> Note: `npm ci` requires a committed `package-lock.json`. This library template does **not** commit a lockfile by default. Use `npm install` locally and the CI uses `npm i`.
