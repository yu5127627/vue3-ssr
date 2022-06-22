const express = require('express');
const { readFileSync } = require('fs');
const path = require('path');
const resolve = uri =>  path.resolve(process.cwd(), uri);
const app = express();
const PORT = 8010;

// 引入 vue 的 render 函数
const {render} = require('./ssr/server/entry-server.js');
const manifest = require('./ssr/client/ssr-manifest.json');

// 开放静态资源
app.use('/assets/',express.static('ssr/client/assets/'));


app.all('/ssr/*', async (req, res) => {
  try {
    const url = req.url.replace('/ssr/', '/');
    const [appHtml, preloadLinks,store] = await render(url, manifest)
    const template = readFileSync(resolve('ssr/client/index.html'), 'utf-8');
    let html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    // 数据传输
    html += `<script>window.cache = ${JSON.stringify(store.state.value.cache)}</script>`
    res.end(html)
  } catch (error) {
    console.log(error);
    res.end(error)
  }
})

app.listen(PORT, () => {
  console.log(`Prod server runing http://localhost:${PORT}/ssr/home`);
})