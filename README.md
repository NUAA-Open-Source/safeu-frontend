# safeu-frontend
> SafeU 前端仓库

## Framework
本项目使用 `Vue` 前端框架，使用 `yarn` 作为依赖管理工具。

### Dependencies we used
> 详细的依赖版本号可见 `package.json` 文件

- plupload 文件上传组件
- ant-design-vue 大部分组件使用该组件库
- vue-router 路由管理
- VueQriously 二维码生成
- FontAwesome 图标库
- vue-clipboard2 自动复制

## Install & Run
### For development
```
yarn install
yarn run serve
```
### For production
使用 `webpack` 进行打包。

建议切换分支到 `deploy-test`，在 `deploy-test` 分支上，编写了 `webpack.config.js` 文件并对项目中部分文件进行了修改，如直接通过外部链接引入一些库来减小打包体积，以增加网页的浏览速度。

```
yarn run serve
yarn run build
serve -s dist
```

这里我使用了 `Vue CLI` 官方文档中提到的部署方式: [serve](https://cli.vuejs.org/zh/guide/deployment.html#%E9%80%9A%E7%94%A8%E6%8C%87%E5%8D%97)

```
npm install -g serve
# -s 参数的意思是将其架设在 Single-Page Application 模式下
# 这个模式会处理即将提到的路由问题
serve -s dist
```

## Deployment

### Docker

该项目提供了 `docker.sh` 脚本来进行容器部署的全生命周期管理，包装了如 `build`, `run`, `stop` `rm`, `logs` 命令。

```bash
$ ./docker.sh help

 Build, up, down, check logs for SafeU front-end development docker container.

 Usage:
  ./docker.sh [COMMAND]
  ./docker.sh -h|--help

 Commands:
   build      Build SafeU front-end container image.
   help       Show this help message.
   logs       View output from front-end container.
   rm         Remove SafeU front-end container.
   run        Run SafeU front-end container.
   stop       Stop SafeU front-end container.
```

> 使用时请进入 `scripts/` 目录！
