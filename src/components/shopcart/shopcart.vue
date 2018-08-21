<template>
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
    <div class="list"></div>
  </div>
</template>

<script>
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
    }

  }
</script>

<style scoped lang="scss">
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    .bar{
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
  }

</style>