import { useRuntimeConfig } from "#imports";
export function useGeminiFiles() {
  const config = useRuntimeConfig();
  async function upload(file) {
    const fd = new FormData();
    fd.append("file", file);
    const res = await $fetch(`${config.public.gemini.routes?.prefix || "/api/gemini"}/files`, { method: "POST", body: fd });
    return res;
  }
  async function list() {
    return [];
  }
  return { upload, list };
}
