# blog-admin

## 使用到的插件/库 | Plugin or lib

- **eslint-plugin-vue** [eslint-plugin-vue](https://eslint.vuejs.org/user-guide/#faq)
- **axios** 强大的前端请求库
- **fues.js** [fues.js Fuzzy Search 前端模糊搜索](https://github.com/krisk/Fuse)
- **echart** [echart 数据可视化](http://echarts.apache.org/zh/index.html)
- **antv** [antv 蚂蚁数据可视化](https://antv.vision/zh)
- **xlsx** [xlsx SheetJS ](https://www.npmjs.com/package/xlsx)
- **jszip** [jszip 优秀的前端压缩库 ](https://github.com/Stuk/jszip)
- **mockjs** [mockjs 模拟和交互数据](http://mockjs.com/)
- **wangeditor** [wangeditor 富文本编辑器](https://www.wangeditor.com/doc/)
- **fullcalendar** [fullcalendar 丰富的日历插件](https://github.com/fullcalendar/fullcalendar-example-projects/tree/master/vue3-typescript)

## 工程化 | Project Tool

- Git Hook 工具：[husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged)
- 代码规范：[EditorConfig](http://editorconfig.org) + [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) + [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript#translation)
- 提交规范：[Commitizen](http://commitizen.github.io/cz-cli/) + [Commitlint](https://commitlint.js.org/#/)

## 浏览器支持

推荐使用`webkit`内核浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                             not support                                                                                              |                                                                                            last 2 versions                                                                                             |                                                                                                  last 2 versions                                                                                                  |                                                                                                last 2 versions                                                                                                |                                                                                                last 2 versions                                                                                                |

## 快速启动 | Quick Start

```

# 进入项目目录
cd blog-admin

# 安装依赖
npm install

# 启动服务
npm run dev

# 打包
npm run build



```

## 同步代码 | synchronizing code

```
# add upstream
git remote add upstream https://github.com/zui-situ/blog-admin.git

# 抓取源仓库修改 master分支
git fetch upstream main

# 切换分支
git checkout main

# 合并远程分支
git merge upstream/main
```

## git 提交 | git commit

     git add *  // add everything

     git status  // check status

     git cz  // commit change

     git push // push stage commit

    // 如果cz 命令无法找到，全局安全commitize
     npm install -g commitizen
