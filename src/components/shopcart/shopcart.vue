<template>
  <div>
    <div class="shopcart">
      <div class="bar" @click="toggleList">
        <div class="bar-left">
          <div class="circle">
            <div class="circle-inner" :class="{'not-empty': totalCount != 0}">
              <i class="icon-shopping_cart"></i>
              <span class="num" v-show="totalCount">{{totalCount}}</span>
            </div>
          </div>
          <div class="total-price">￥{{totalPrice}}</div>
          <div class="delivery-price">另需配送费￥{{seller.deliveryPrice}}元</div>
        </div>
        <div class="bar-right" :class="{'enough': this.totalPrice >= this.seller.minPrice}" @click.stop="pay">{{payTxt}}</div>
      </div>
      <div class="list" v-show="listShow">
        <div class="header border-1px">
          购物车<span class="btn" @click="clearShopcart">清空</span>
        </div>
        <div class="content" ref="listContent">
          <ul>
            <li class="item border-1px" v-for="(food, index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">￥{{food.price}}</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>             
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="shopcart-mask" v-show="listShow" @click="hideList"></div>
  </div>
</template>

<script>
  import cartcontrol from '@/components/cartcontrol/cartcontrol.vue';
  import BScroll from 'better-scroll';
  export default {
    props: {
      seller: {
        type: Object
      },
      selectedFood: {
        type: Array
      },
      selectFoods: {
        type: Array
      }
    },
    data() {
      return {
        num: 99,
        fold: true
      }
    },
    computed: {
      listShow() {
        if (!this.totalCount) {
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.contentScroll) {
              this._initScroll();
            } else {
              this.contentScroll.refresh();
            }
            
          })          
        }

        return show;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach(element => {
          count += element.count;
        });
        return count;
      },
      totalPrice() {
        let totalPrice = 0;
        this.selectFoods.forEach(element => {
          totalPrice += element.price * element.count;
        });
        return totalPrice;
      },
      payTxt() {
        let txt = '';
        if (this.totalPrice > 0 && this.totalPrice < this.seller.minPrice) {
          txt = `还差￥${this.seller.minPrice - this.totalPrice}元起送`;
        } else if (this.totalPrice >= this.seller.minPrice) {
          txt = '去结算';
        } else {
          txt = `￥${this.seller.minPrice}元起送`;
        }
        return txt;
      }
    },
    methods: {
      _initScroll() {
        this.contentScroll = new BScroll(this.$refs.listContent, {
          click: true
        })
      },
      toggleList() {
        if(!this.totalCount) return;
        this.fold = !this.fold;
      },
      hideList() {
        this.fold = true;
      },
      clearShopcart() {
        this.selectFoods.forEach(element => {
          element.count = 0;
        })
      },
      pay() {
        if (this.totalPrice >= this.seller.minPrice) {
          alert(`支付${this.totalPrice}`);
        }      
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
    z-index: 101;
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
        &.enough{
          background: #00b43c;
          color: #fff;
        }
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
    z-index: 100;
    background: rgba(7, 17, 27, 0.6);
  }
</style>