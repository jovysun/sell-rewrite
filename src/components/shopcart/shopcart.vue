<template>
  <div>
    <div class="shopcart">
      <div class="bar">
        <div class="bar-left">
          <div class="circle">
            <div class="circle-inner" :class="{'not-empty': num != 0}">
              <i class="icon-shopping_cart"></i>
              <span class="num" v-show="num">{{num}}</span>
            </div>
          </div>
          <div class="total-price">￥0</div>
          <div class="delivery-price">另需配送费￥4元</div>
        </div>
        <div class="bar-right">￥20元起送</div>
      </div>
      <div class="list">
        <div class="header border-1px">
          购物车<span class="btn">清空</span>
        </div>
        <div class="content" ref="listContent">
          <ul>
            <li class="item border-1px">
              <span class="name">黑米粥</span>
              <div class="price">￥8</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol></cartcontrol>
              </div>             
            </li>
            <li class="item">
              <span class="name">好吃的黑米粥</span>
              <div class="price">￥18</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol></cartcontrol>
              </div>           
            </li>
            <li class="item border-1px">
              <span class="name">黑米粥</span>
              <div class="price">￥8</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol></cartcontrol>
              </div>             
            </li>
            <li class="item">
              <span class="name">好吃的黑米粥</span>
              <div class="price">￥18</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol></cartcontrol>
              </div>           
            </li>
            <li class="item border-1px">
              <span class="name">黑米粥</span>
              <div class="price">￥8</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol></cartcontrol>
              </div>             
            </li>
            <li class="item">
              <span class="name">好吃的黑米粥</span>
              <div class="price">￥18</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol></cartcontrol>
              </div>           
            </li>
            <li class="item border-1px">
              <span class="name">黑米粥</span>
              <div class="price">￥8</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol></cartcontrol>
              </div>             
            </li>
            <li class="item">
              <span class="name">好吃的黑米粥</span>
              <div class="price">￥18</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol></cartcontrol>
              </div>           
            </li>
            <li class="item border-1px">
              <span class="name">黑米粥</span>
              <div class="price">￥8</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol></cartcontrol>
              </div>             
            </li>
            <li class="item">
              <span class="name">好吃的黑米粥</span>
              <div class="price">￥18</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol></cartcontrol>
              </div>           
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="shopcart-mask"></div>
  </div>
</template>

<script>
  import cartcontrol from '@/components/cartcontrol/cartcontrol.vue';
  import BScroll from 'better-scroll';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        num: 99
      }
    },
    created() {
      this.$nextTick(() => {
        this._initScroll();
      })
      
    },
    methods: {
      _initScroll() {
        this.contentScroll = new BScroll(this.$refs.listContent, {
          click: true
        })
      }
    },
    components: {
      cartcontrol
    }

  }
</script>

<style scoped lang="scss">
  @import '@/common/scss/mixin.scss';
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    z-index: 201;
    .bar{
      position: relative;
      z-index: 2;
      display: flex;
      height: 48px;
      .bar-right{
        flex: 0 0 105px;
        padding: 0 8px;
        width: 89px;
        line-height: 48px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.4);
        background: #2b333b;
        font-weight: 700;
        text-align: center;
      }
      .bar-left{
        position: relative;
        flex: 1;
        padding: 0 12px;
        background: #141d27;
        font-size: 0;
        .circle{
          position: absolute;
          left: 12px;
          bottom: 2px;
          width: 44px;
          height: 44px;
          padding: 6px;
          border-radius: 50%;
          background: #141d27;
          .circle-inner{
            position: relative;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            text-align: center;
            line-height: 44px;
            .icon-shopping_cart{
              vertical-align: middle;
              font-size: 24px;
              color: rgba(255, 255, 255, 0.4);
            }
            .num{
              display: inline-block;
              position: absolute;
              left: 26px;
              top: -6px;
              padding: 0 6px;
              border-radius: 12px;
              background: rgb(240, 20, 20);
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
              color: rgb(255, 255, 255);
              font-size: 9px;
              line-height: 16px;
            }


            &.not-empty{
              background: rgb(0, 160, 220);
              .icon-shopping_cart{
                color: #fff;
              }
            }
          }

        }
        .total-price{
          display: inline-block;
          margin-left: 68px;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.4);
          line-height: 48px;
          font-weight: 700;
        }
        .delivery-price{
          display: inline-block;
          margin-left: 12px;
          margin-top: 12px;
          padding-left: 12px;
          height: 24px;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 700;
          line-height: 24px;
        }
      }
    }
    .list{
      position: absolute;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      background: #fff;
      transform: translate3d(0, -100%, 0);
      .header{
        padding: 0 18px;
        line-height: 40px;
        background: #f3f5f7;
        font-size: 14px;
        color: rgb(7, 17, 27);
        &.border-1px{
          @include border-1px(rgba(7,17,27,0.1));
        }
        .btn{
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .content{
        max-height: 217px;
        overflow: hidden;
        .item{
          position: relative;
          padding: 12px 18px;
          &.border-1px{
            @include border-1px(rgba(7,17,27,0.1));
          }
          .name{
            display: inline-block;
            font-size: 14px;
            color: rgb(7, 17, 27);
            line-height: 24px;
          }
          .price{
            position: absolute;
            right: 90px;
            top: 12px;
            padding: 0 12px 0 18px;
            font-size: 14px;
            line-height: 24px;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper{
            position: absolute;
            right: 18px;
            top: 12px;
            height: 24px;
          }
        }
      }
    }
  }
  .shopcart-mask{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    background: rgba(7, 17, 27, 0.6);
  }
</style>