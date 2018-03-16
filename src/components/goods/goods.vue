<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li v-for="(item, index) in goods" class="menu-item" :key="index">
            <span class="text border-1px"><icon :type="item.type" :size="3"></icon>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">right</div>
    </div>
  </div>
</template>

<script>
  import data1 from 'common/js/data.js';
  import icon from 'components/icon/icon';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
        }
      }, (response) => {
        console.warn('goods数据没有获取到，启用本地默认数据！');
        this.goods = data1.goods;
      });
    },
    components: {
      icon
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        text-align: center;
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size 12px
</style>
