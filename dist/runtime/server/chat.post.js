import { setHeader, eventHandler } from "h3";
async function stream(event) {
  setHeader(event, "Content-Type", "text/event-stream");
  setHeader(event, "Cache-Control", "no-cache");
  setHeader(event, "Connection", "keep-alive");
  const chunks = ["[stub] Streaming ", "from ", "nuxt-gemini ", "module..."];
  for (const c of chunks) {
    await new Promise((r) => setTimeout(r, 200));
    event.node.res.write(`data: ${c}

`);
  }
  event.node.res.write(`event: done
`);
  event.node.res.write(`data: 

`);
  event.node.res.end();
}
export default eventHandler(async (event) => {
  await stream(event);
});
