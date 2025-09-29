export function useGeminiGenerate() {
  const config = useRuntimeConfig();
  const pending = ref(false);
  const error = ref(null);
  const text = ref("");
  async function generate(body) {
    pending.value = true;
    error.value = null;
    text.value = "";
    try {
      const { data, error: err } = await useFetch(`${config.public.gemini.routes?.prefix || "/api/gemini"}/generate`, {
        method: "POST",
        body
      });
      if (err.value) throw err.value;
      text.value = data.value?.text || "";
      return data.value;
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      pending.value = false;
    }
  }
  function json() {
    try {
      return JSON.parse(text.value);
    } catch {
      throw new Error("Response is not valid JSON");
    }
  }
  return { generate, pending, error, text, json };
}
