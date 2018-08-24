<template>
  <div>
    <shop-header :seller="seller"></shop-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/shop/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"/>
    </keep-alive> 
  </div>
</template>

<script>
// @ is an alias to /src
import shopHeader from '@/components/header/header.vue'

export default {
  name: 'shop',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$axios.get('/api/seller')
    .then((response) => {
      if(response.data.errno === 0){
        this.seller = response.data.seller;
      }
    })
    .catch((error) => {
      console.log(error);
    })
  },
  components: {
    shopHeader
  }
}
</script>

<style scoped lang="scss">
@import '@/common/scss/mixin.scss';
.tab{
  display: flex;
  text-align: center;
  &.border-1px{
    @include border-1px(rgba(7, 17, 27, 0.1));
  }
  .tab-item{
    flex: 1;
    line-height: 40px;
    a{
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.router-link-active{
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>