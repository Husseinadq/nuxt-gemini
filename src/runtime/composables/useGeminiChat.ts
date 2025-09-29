import { useRuntimeConfig } from '#imports'
import { ofetch as $fetch } from 'ofetch'
export function useGeminiChat() {
  const config = useRuntimeConfig()
  const delta = ref('')
  const done = ref(false)
  let es: EventSource | null = null

  async function send(promptOrMessages: any) {
    delta.value = ''
    done.value = false
    if (es) { es.close(); es = null }
    const url = `${config.public.gemini.routes?.prefix || '/api/gemini'}/chat`
    es = new EventSource(url, { withCredentials: false })
    // Kick off by POSTing the payload; the server will stream back
    await $fetch(url, { method: 'POST', body: { messages: Array.isArray(promptOrMessages) ? promptOrMessages : [{ role: 'user', content: promptOrMessages }] } })
    es.onmessage = (e) => { delta.value += e.data }
    es.addEventListener('done', () => { done.value = true; es?.close() })
  }

  function cancel() { if (es) { es.close(); es = null } }
  return { send, delta, done, cancel }
}
