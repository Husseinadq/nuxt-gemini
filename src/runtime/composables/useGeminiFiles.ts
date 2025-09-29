export function useGeminiFiles () {
  const config = useRuntimeConfig()
  async function upload (file: File) {
    const fd = new FormData()
    fd.append('file', file)
    const res = await $fetch(`${config.public.gemini.routes?.prefix || '/api/gemini'}/files`, { method: 'POST', body: fd })
    return res as { name: string, uri: string, displayName?: string }
  }
  async function list () { return [] as any[] } // TODO: implement list when needed
  return { upload, list }
}
