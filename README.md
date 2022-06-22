# vue3-ssr
## 基于 vue3 的服务端渲染。
vue3-ssr Getting started example.

#### 前置技能

- vue3
- axios
- pinia
- vue-router
- express

#### 入口文件

- dev.server.mjs 开发模式服务(esm模式)

- prod.server.js 正式环境服务


#### 路由

  只有两个页面 
  - /ssr/home  基础的ssr，html节点会在服务端创建，但是接口数据还是由客户端渲染
  
  - /ssr/api   完全体的ssr，html节点同样在服务端渲染，不同的是接口数据可以有选择性的在服务端渲染


#### onServerPrefetch

onServerPrefetch(): vue3在服务端运行的钩子函数。

> 注意：index.html 文件遵循严格的代码格式，任意改变可能导致水合异常，**务必任意格式化**。