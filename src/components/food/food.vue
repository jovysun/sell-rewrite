<template>
  <div class="food" ref="foodWrapper" :class="{'show': showFlag}">
    <div class="food-content">
      <div class="img-header">
        <img :src="selectedFood.image" alt="" class="pic">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>      
      </div>
      <div class="intro">
        <h3 class="name">{{selectedFood.name}}</h3>
        <div class="sell-rating">
          <span class="count">月售{{selectedFood.sellCount}}份</span>
          <span class="rating">好评率{{selectedFood.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{selectedFood.price}}</span>
          <span class="old" v-show="selectedFood.oldPrice">￥{{selectedFood.oldPrice}}</span>
        </div>
        <!-- <div class="carcontrol-wrapper">
          <cartcontrol :food="food" @add="addFood"></cartcontrol>
        </div>       -->
        <div class="buy">加入购物车</div>
      </div>
      <div class="info">
        <strong class="title">商品介绍</strong>
        <p class="txt">{{selectedFood.info}}</p>
      </div>
      <div class="rating">
        <strong class="title">商品评价</strong>
      </div>      
    </div>

  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    props: {
      selectedFood: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    created() {
      this.$nextTick(() => {
        this._initScroll();
      })

    },
    methods: {
      _initScroll() {
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          click: true
        });
      },
      hide() {
        this.showFlag = false;
      },
      show() {
        this.showFlag = true;
      }      
    }
  }
</script>

<style scoped lang="scss">
  .food{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 48px;
    z-index: 2;
    overflow: hidden;
    background: #fff;
    transition: all 0.2s linear;
    transform: translate3d(100%, 0, 0);
    &.show{
      transform: translate3d(0, 0, 0);
    }
    .img-header{
      position: relative;
      width: 100%;
      .pic{
        width: 100%;
      }
      .back{
        position: absolute;
        left: 0;
        top: 10px;
      }
      .icon-arrow_lift{
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;

      }
    }
  }

</style>