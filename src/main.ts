/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn'
import {isPermission} from '@/directive/permission'
import { key, store } from './store/index';
import router from './router/index';
import App from './App.vue';
import '@/styles/index.scss'; // global css
import '@/permission'; // permission control 全局路由守卫
import 'dayjs/locale/zh-cn'

// 1、挂载vuex
// 2、挂载路由
// 3、挂载 elementPlus UI;

// ElementPlus 样式通过CDN的方式引入来加样式文件，提高应用加载速度；
import 'element-plus/theme-chalk/index.css';
import '@/mock'

// const roles =  localStorage.getItem('role');

// if(roles){
// // 在挂载路由之前，先进行异步路由处理
// store.dispatch('permissionModule/getPermissonRoutes',{roleName:roles});
// }

store.dispatch('permissionModule/getRoutes');

// 链式注册插件
const app = createApp(App).use(store, key).use(router).use(ElementPlus,{locale});
// 挂载全局方法 isPermission
app.config.globalProperties.$isPermission=isPermission
// 现在所有的导航都是异步的，等路由ready以后再进行挂载组件；
router.isReady().then(() => app.mount('#app'));

// 在导航期间每次发生未捕获的错误时都会调用该处理程序
// eslint-disable-next-line no-console
router.onError((err) => { console.error(err); });
