import { defineEventHandler, readMultipartFormData, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event)
  if (!form?.length) throw createError({ statusCode: 400, statusMessage: 'No file' })
  // Stub - in real impl, upload to Gemini Files API using server-side SDK
  const file = form[0]
  return { name: `stub://${file.filename}`, uri: `stub://${file.filename}`, displayName: file.filename }
})
