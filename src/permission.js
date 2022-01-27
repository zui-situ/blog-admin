import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { ElMessage } from 'element-plus'
import { store } from './store'
import router from './router'
import { getToken } from './utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/resetPwd', '/404', '/index'] // 白名单
// const whiteList = ['/login']; // 不重定向白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (hasToken) {
    // 判断是否有token
    if (to.path.indexOf('/login') === 0) {
      next({ path: '/' })
      NProgress.done()
    } else {
      const userId = store.getters['userModule/getUserId']
      if (userId) {
        const tabsOption = store.getters['tabModule/getTabsOption']
        // 判断当前路由中是否已经入栈
        const flag = tabsOption.findIndex((tab) => tab.route === to.path) > -1
        if (!flag && !to.meta.hiddenTab) {
          store.commit('tabModule/ADD_TAB', { route: to.path, title: to.meta.title, name: to.name })
        }
        store.commit('tabModule/SET_TAB', to.path)
        next()
      } else {
        try {
          // const notFoundPageRoute = {
          //   path: '*',
          //   meta: {
          //     title: '这个页面好像不存在'
          //   },
          //   hidden: true,
          //   redirect: '/404'
          // }
          // 获取权限
          // const accessRoutes = await store.dispatch('permission/getRouters');
          // console.log("accessRoutes:",JSON.parse(JSON.stringify(accessRoutes)));
          // router.addRoutes(accessRoutes);
          // router.addRoute(notFoundPageRoute);  // 添加404页
          await store.dispatch('userModule/getInfo') // 拉取info
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          await store.dispatch('userModule/resetToken')
          ElMessage({
            type: 'error',
            message: error || 'Has Error'
          })
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else if (whiteList.indexOf(to.path) >= 0 || to.path.indexOf('/login') >= 0) {
    // 在免登录白名单，直接进入
    next()
  } else {
    next(`/login`) // 否则全部重定向到登录页
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
