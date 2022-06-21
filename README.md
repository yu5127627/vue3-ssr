# vue3-ssr
vue3-ssr Getting started example.

#### 基于 vue3 的服务端渲染，目前只有开发模式可用，随后补上线上环境的运行模式。


#### 文件结构

- dev.server.js 开发模式服务

- prod.server.js 正式环境服务


#### 路由

  只有两个页面 
  - /ssr/home  基础的ssr，html节点会在服务端创建，但是接口数据还是由客户端渲染
  
  - /ssr/api   完全体的ssr，html节点同样在服务端渲染，不同的是接口数据可以有选择性的在服务端渲染
