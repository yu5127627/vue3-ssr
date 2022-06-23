import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'
import express from 'express'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = p => path.resolve(__dirname, p);
const head = JSON.parse(fs.readFileSync(resolve('head.json'),'utf8'));
const PORT = 8010;

function renderHead(url, head) {
  const page = url.replace('/', '');
  const { title,keywords,description } = head[page];
  return `
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
  `
}

export async function createServer(hmrPort) {
  const app = express()
  let vite = await (
      await import('vite')
    ).createServer({
    base: '/ssr/',
    root:process.cwd(),
    server: {
      middlewareMode: true,
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100
      },
      hmr: {
        port: hmrPort
      }
    },
    appType: 'custom'
  })
  // use vite's connect instance as middleware
  app.use(vite.middlewares)
  let render = (await vite.ssrLoadModule('/src/entry-server.js')).render

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace('/ssr/', '/')
      let template = fs.readFileSync(resolve('index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      const [appHtml, preloadLinks,store] = await render(url, {})
      const headStr = renderHead(url, head);
      let html = template
        .replace(`<!--preload-head-->`, headStr)
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)

      // 数据传输
      html += `<script>window.cache = ${JSON.stringify(store.state.value.cache)}</script>`
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e)
      res.status(500).end(e.stack)
    }
  })

  return { app, vite }
}

createServer().then(({ app }) =>
  app.listen(PORT, () => {
    console.log('http://localhost:'+PORT)
  })
)