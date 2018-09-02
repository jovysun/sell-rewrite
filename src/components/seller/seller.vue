<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="intro">
        <div class="intro-top">
          <div class="name">{{seller.name}}</div>
          <div class="info">
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="rating-count">({{seller.ratingCount}})</span>
            <span class="seller-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="like">
            <i class="icon-favorite"></i><br>
            <span class="txt">已收藏</span>
          </div>
        </div>
        <div class="intro-bottom">
          <div class="item">
            <div class="txt">起送价</div>
            <div class="num-wrapper"><span class="num">{{seller.minPrice}}</span>元</div>
          </div>  
          <div class="item">
            <div class="txt">商家配送</div>
            <div class="num-wrapper"><span class="num">{{seller.deliveryPrice}}</span>元</div>
          </div> 
          <div class="item">
            <div class="txt">平均配送时间</div>
            <div class="num-wrapper"><span class="num">{{seller.deliveryTime}}</span>分钟</div>
          </div>                 
        </div>
      </div>

      <split></split>
      <div class="bulletin-wrapper">
        <div class="title">公告与活动</div> 
        <div class="bulletin">{{seller.bulletin}}</div>
        <ul class="supports" v-if="seller.supports">
          <li class="support" v-for="(item,index) in seller.supports" :key="index">
            <span class="type" :class="classMap[seller.supports[index].type]"></span>
            <span class="txt">{{item.description}}</span>
          </li>
        </ul>
      </div>   
      <split></split>
      <div class="pic-wrapper">
        <div class="title">商家实景</div> 
        <div class="pics" ref="pics">
          <ul class="pics-content" ref="picsContent">
            <li class="pic" v-for="(pic, index) in seller.pics" :key="index"><img :src="pic" alt=""></li>
          </ul>
        </div>

      </div>  

      <split></split>
      <div class="infos-wrapper">
        <div class="title">商家信息</div> 
        <div class="info" v-for="(info, index) in seller.infos" :key="index">{{info}}</div> 
      </div>        

    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import split from '@/components/split/split.vue';
  import star from '@/components/star/star.vue';  
  import moment from 'moment';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']     
      }
    },

    computed: {

    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },    
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      })    
    }, 
    methods: { 
      _initScroll() {
        this.sellerScroll = new BScroll(this.$refs.seller, {
          click: true
        });   
        this.picsScroll = new BScroll(this.$refs.pics, {
          click: true
        });      
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picsContent.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.pics, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }        
      }         
    },
    components: {
      split,
      star
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
  .seller{
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 0;
    overflow: hidden;

    .intro{
      
      padding: 18px;
      .intro-top{
        position: relative;
        width: 100%;
        padding-bottom: 18px;
        @include border-1px(rgba(7,17,27,.1));
        .name{
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .info{
          margin-top: 8px;
          font-size: 0;
          
          .star{
            vertical-align: top;
            display: inline-block;
          }
          .rating-count{
            display: inline-block;
            margin-left: 8px;
            font-size: 10px;
            color: rgb(77, 85, 93);
            line-height: 18px;
          }
          .seller-count{
            display: inline-block;
            margin-left: 12px;
            font-size: 10px;
            color: rgb(77, 85, 93);
            line-height: 18px;
          }
        }
        .like{
          position: absolute;
          right: 0;
          bottom: 18px;
          text-align: center;
          .icon-favorite{
            font-size: 24px;
            color: rgb(240, 20, 20);
          }
          .txt{
            margin-top: 4px;
            font-size: 10;
            color: rgb(77, 85, 93);
          }
        }
      } 
      .intro-bottom{
        padding-top: 18px;
        display: flex;
        .item{
          flex: 1;
          border-left: 1px solid rgba(7, 17, 27, 0.1);
          text-align: center;
          &:first-child{
            border-left: 0;
          }

          .txt{
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .num-wrapper{
            margin-top: 4px;
            font-size: 10px;
            line-height: 24px;
            color: rgb(7, 17, 27);
            .num{
              font-size: 24px;
            }
          }
        }
      }    
    }

    .bulletin-wrapper{
      padding: 18px 18px 0 18px;
      .title{
        font-size: 14px;
        color: rgb(7, 17, 27);
      }    
      .bulletin{
        margin-top: 8px;
        padding: 0 12px 16px 12px;
        @include border-1px(rgba(7,17,27,.1));
        font-size: 12px;
        color: rgb(240, 20, 20);
        line-height: 24px;
      } 
      .supports{
        
        .support{
          padding: 16px 12px;
          @include border-1px(rgba(7,17,27,.1));
          &:last-child{
            @include border-none;
          }
        }
          .type{
            display: inline-block;
            vertical-align: top;
            width: 16px;
            height: 16px;          
            background-size: 100% 100%;
            &.decrease{
              @include bg-image('decrease_4');
            }
            &.discount{
              @include bg-image('discount_4');
            }
            &.special{
              @include bg-image('special_4');
            }
            &.invoice{
              @include bg-image('invoice_4');
            }
            &.guarantee{
              @include bg-image('guarantee_4');
            }
          }
          .txt{
            margin-left: 6px;
            display: inline-block;
            font-size: 12px;
            line-height: 16px;
          }      
      }      
      
    }
    .pic-wrapper{
      padding: 18px;
      .title{
        font-size: 14px;
        color: rgb(7, 17, 27);
      }  
      .pics{
        margin-top: 12px;
        font-size: 0;
        .pic{
          display: inline-block;
          margin-left: 6px;
          &:first-child{
            margin-left: 0;
          }
          width: 120px;
          height: 90px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .infos-wrapper{
      padding: 18px 18px 0 18px;
      .title{
        font-size: 14px;
        color: rgb(7, 17, 27);
        padding-bottom: 12px;
        @include border-1px(rgba(7,17,27,.1));
      }  
      .info{
        padding: 16px 12px;
        @include border-1px(rgba(7,17,27,.1));
        &:last-child{
          @include border-none;
        }
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 16px;
      }      
    }
  }

</style>