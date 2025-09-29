import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ prompt: string; config?: any; files?: string[] }>(event)
  // TODO: integrate @google/genai client on server
  // For now, echo prompt for local dev sanity
  return { text: `[stub] You said: ${body?.prompt ?? ''}`, candidates: [] }
})
