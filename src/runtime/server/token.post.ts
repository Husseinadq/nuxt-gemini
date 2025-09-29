import { defineEventHandler } from 'h3'

export default defineEventHandler(async (_event) => {
  // Stub - in real impl, request ephemeral token from Gemini Live API
  return { token: 'stub-ephemeral-token' }
})
