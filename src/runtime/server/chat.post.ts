import { defineEventHandler, setHeader, eventHandler } from 'h3'

async function stream (event:any) {
  setHeader(event, 'Content-Type', 'text/event-stream')
  setHeader(event, 'Cache-Control', 'no-cache')
  setHeader(event, 'Connection', 'keep-alive')
  // Simple demo stream
  const chunks = ['[stub] Streaming ', 'from ', 'nuxt-gemini ', 'module...']
  for (const c of chunks) {
    await new Promise(r => setTimeout(r, 200))
    event.node.res.write(`data: ${c}\n\n`)
  }
  event.node.res.write(`event: done\n`)
  event.node.res.write(`data: \n\n`)
  event.node.res.end()
}

export default eventHandler(async (event) => { await stream(event) })
