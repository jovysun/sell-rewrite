<template>
  <div class="food" ref="foodWrapper" :class="{'show': showFlag}" v-show="showFlag">
    <div class="food-content">
      <div class="img-header">
        <div class="pic-wrapper">
          <img :src="food.image" alt="" class="pic">
        </div>
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>      
      </div>
      <div class="intro">
        <h3 class="name">{{food.name}}</h3>
        <div class="sell-rating">
          <span class="count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="carcontrol-wrapper" v-show="!empty">
          <cartcontrol :food="food" @add="addFood"></cartcontrol>
        </div>      
        <div class="buy" @click.stop="addCart" v-show="empty">加入购物车</div>
      </div>
      <split v-if="food.info"></split>
      <div class="info" v-if="food.info">
        <div class="title">商品介绍</div>
        <p class="txt">{{food.info}}</p>
      </div>
      <split v-if="food.ratings"></split>
      <div class="rating" v-if="food.ratings">
        <div class="title">商品评价</div>
        <div class="filterbar-wrapper">
          <filterbar :tabs="tabs" @filterContent="filterContent"></filterbar>
        </div>
        <ul class="rating-list">
          <li class="rating-item border-1px" v-for="(rating, index) in food.ratings" :key="index" v-show="needShow(rating.rateType, rating.text)">
            <div class="rating-header">
              {{rating.rateTime | formatTime}}
              <div class="rating-user">
                {{rating.username}}<img :src="rating.avatar" alt="" class="avatar">
              </div>
            </div>
            <div class="rating-content">
              <i :class="[rating.rateType === 1 ? 'icon-thumb_down' : 'icon-thumb_up']"></i>
              <span class="txt" v-if="rating.text">{{rating.text}}</span>
            </div>
          </li>
        </ul>
      </div>      
    </div>

  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import filterbar from '@/components/filterbar/filterbar.vue';
  import cartcontrol from '@/components/cartcontrol/cartcontrol.vue';
  import split from '@/components/split/split.vue';
  import Vue from 'vue';
  import moment from 'moment';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectedRateType: -1,
        hasContentCheck: true
      }
    },
    computed: {
      empty() {
        if (this.food.count) {
          return false;
        }
        return true;
      },
      tabs() {
        let totalNum = 0,
            upNum = 0, 
            downNum = 0;
        let ratings = this.food.ratings;
        if (ratings.length < 0) return [];

        totalNum = ratings.length;

        ratings.forEach(element => {
          if (element.rateType === 0) {
            upNum++;
          } else if (element.rateType === 1) {
            downNum++
          }
        });

        return [{'text': '全部', 'num': totalNum, 'type': -1}, {'text': '推荐', 'num': upNum, 'type': 0}, {'text': '吐槽', 'num': downNum, 'type': 1}];    
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
      },
      addCart() {
        if(!this.food.count) {
          Vue.set(this.food, 'count', 1);
        }else {
          this.food.count++;
        }
        this.$emit('add', event.target);
      },
      addFood() {
        console.log('add food');
      },   
      filterContent(type, check) {
        this.selectedRateType = type;
        this.hasContentCheck = check;      
      },
      needShow(type, text) {
        if (this.hasContentCheck && !text) {
          return false;
        }
        if (this.selectedRateType === -1) {
          return true;
        } else {
          return this.selectedRateType === type;
        }
        
      }         
    },
    components: {
      filterbar,
      cartcontrol,
      split
    },
    filters: {
      formatTime(time) {
        return moment(time).format('YYYY-MM-DD HH:mm');
      }
    }

  }
</script>

<style scoped lang="scss">
  @import '@/common/scss/mixin.scss';
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
      .pic-wrapper{
        width: 100%;
        height: 375px;
        display: flex;
        align-items:center;
        background: rgba(7, 17, 27, 0.5);
      }
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
    .intro{
      position: relative;
      padding: 18px;
      .food-name{
        font-size: 14px;
        color: rgb(7, 17, 27);
        font-weight: 700;
      }
      .sell-rating{
        margin-top: 8px;
        font-size: 10px;
        color: rgb(147, 153, 159);
        .rating{
          margin-left: 12px;
        }
      }
      .price{
        margin-top: 18px;
        line-height: 24px;
        font-weight: 700;
        .now{
          font-size: 14px;
          color: rgb(240, 20, 20);
        }
        .old{
          padding-left: 8px;
          font-size: 10px;
          color: rgb(147, 153, 159);
          text-decoration: line-through;
        }
      }
      .buy{
        position: absolute;
        right: 18px;
        bottom: 18px;        
        width: 74px;
        height: 24px;
        border-radius: 12px;
        line-height: 24px;
        background: rgb(0, 160, 220);
        text-align: center;
        font-size: 10px;
        color: #fff;
      }
      .carcontrol-wrapper{
        position: absolute;
        right: 18px;
        bottom: 18px;   
      }      
    }
    .info{
      padding: 18px;
      .title{
        font-size: 14px;
        color: rgb(7, 17, 27);      
      }
      .txt{
        padding: 6px 8px 0;
        font-size: 12px;
        line-height: 24px;
        color: rgb(77, 85, 93);
      }
    }
    .rating{
      padding: 18px 18px 0;
      .title{
        font-size: 14px;
        color: rgb(7, 17, 27);      
      }      
      .filterbar-wrapper{
        margin-top: 18px;
      }
      .rating-list{
        margin: 0 -18px 0;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        .rating-item{
          padding: 16px 18px;
          &.border-1px{
            @include border-1px(rgba(7, 17, 27, 0.1));
          }
          .rating-header{
            position: relative;
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 12px;            
            .rating-user{
              position: absolute;
              right: 0;
              top: 0;
              .avatar{
                margin-left: 6px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
              }
            }
          }
          .rating-content{
            margin-top: 6px;
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            .icon-thumb_down{
              color: rgb(147, 153, 159);             
            }
            .icon-thumb_up{
              color: rgb(0, 160, 220);
            }
            .txt{
              display: inline-block;
              margin-left: 4px;
              color: rgb(7, 17, 27);
            }
          }
        }
      }
    }
  }

</style>