<!--根组件，由三部分组成：模板、js、样式
  * template：其中模板只能包含一个父节点，也就是顶层的div只能有一个
  * script：用export default导出，其下面可以包含数据data，生命周期(mounted等)，方法(methods)等，具体语法请看vue.js文档
  * style：默认是影响全局的，如需定义作用域只在该组件下起作用，需在标签上加scoped
  -->
<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link tag="div" class="tab-item" to="/goods">
        <span class="tab-link">商品</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/ratings">
        <span class="tab-link">评论</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/seller">
        <span class="tab-link">商家</span>
      </router-link>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from 'common/js/util';
  import header from 'components/header/header';
  import goods from 'components/goods/goods';
  import data1 from 'common/js/data.js';

  const ERR_OK = 0;

  export default {
    name: 'App',
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          // this.seller = response.data;
          this.seller = Object.assign({}, this.seller, response.data);
        }
      }, (response) => {
        console.warn('seller数据没有获取到，启用本地默认数据！');
        this.seller = Object.assign({}, this.seller, data1.seller);
      });
      /** 加载本地json格式数据 */
    },
    components: {
      'v-header': header,
      'v-goods': goods
    }
  };
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      // border-bottom 1px solid rgba(7, 17, 27, 0.1)
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        .tab-link
          display block
          font-size 14px
          color rgb(77, 85, 93)
        &.active
          .tab-link
            color rgb(240, 20, 20)
</style>
