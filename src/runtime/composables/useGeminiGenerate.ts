import { useRuntimeConfig, useFetch, ref } from '#imports'
export function useGeminiGenerate () {
  const config = useRuntimeConfig()
  const pending = ref(false)
  const error = ref<any>(null)
  const text = ref('')
  async function generate (body: { prompt: string; config?: any; files?: string[] }) {
    pending.value = true
    error.value = null
    text.value = ''
    try {
      const { data, error: err } = await useFetch(`${config.public.gemini.routes?.prefix || '/api/gemini'}/generate`, {
        method: 'POST',
        body
      })
      if (err.value) throw err.value
      // @ts-ignore
      text.value = data.value?.text || ''
      return data.value
    } catch (e:any) {
      error.value = e
      throw e
    } finally {
      pending.value = false
    }
  }
  function json <T=any> (): T {
    try { return JSON.parse(text.value) as T } catch { throw new Error('Response is not valid JSON') }
  }
  return { generate, pending, error, text, json }
}
