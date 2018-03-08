// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入vue框架
import Vue from 'vue';
// 引入根组件
import App from './App';
import VueRouter from 'vue-router';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

import 'common/stylus/index.styl';

/* 关闭生产模式下给出的提示 */
Vue.config.productionTip = false;

// 给当前应用下所有的组件都注入$Router 和 $route 对象
Vue.use(VueRouter);

// 定义各个路由下使用的组件，简称路由组件
const routes = [
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller},
  {path: '*', redirect: '/goods'}
];

// 创建实例
const router = new VueRouter({
  routes, // （缩写）相当于 routes: routes
  linkActiveClass: 'active'
});

// 定义实例,跳过规则
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App},
  router
});
