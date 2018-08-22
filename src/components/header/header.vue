<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar"><img :src="seller.avatar" alt="" width="64" height="64"></div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <span class="type" :class="classMap[seller.supports[0].type]"></span>
          <span class="txt">{{seller.supports[0].description}}</span>
        </div>     
      </div>
      <div class="supports" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-icon"></span>
      <span class="bulletin-txt">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="detail" v-show="detailShow">
      <h1 class="name">{{seller.name}}</h1>
      <div class="star-wrapper">
        <star :size="48" :score="seller.score"></star>
      </div>
      <div class="title">
        <span class="line"></span>  
        <span class="txt">优惠信息</span>
        <span class="line"></span>
      </div>  
      <ul class="supports" v-if="seller.supports">
        <li class="support" v-for="(item,index) in seller.supports" :key="index">
          <span class="type" :class="classMap[seller.supports[index].type]"></span>
          <span class="txt">{{item.description}}</span>
        </li>
      </ul>
      <div class="title">
        <span class="line"></span>  
        <span class="txt">商家公告</span>
        <span class="line"></span>
      </div>  
      <p class="bulletin">{{seller.bulletin}}</p>
      <div class="close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>    
  </div>
</template>

<script>
  import star from '@/components/star/star.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    components: {
      star
    }
    
  }
</script>

<style scoped lang="scss">
@import '@/common/scss/mixin.scss';
.header{
  position: relative;
  width: 100%;
  color: #fff;
  background-color: rgba(7, 17, 27, 0.5);
  overflow: hidden;
  .content-wrapper{
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    .avatar{
      display: inline-block;
      vertical-align: top;
      width: 64px;
      height: 64px;
      border-radius: 2px;
      overflow: hidden;
    }
    .content{
      display: inline-block;
      margin-left: 16px;
      .title{
        margin-top: 2px;
        .brand{
          display: inline-block;
          width: 30px;
          height: 18px;
          vertical-align: top;
          @include bg-image('brand');
          background-size: 100% 100%;
        }
        .name{
          display: inline-block;
          margin-left: 6px;
          font-size: 16px;
          font-weight: bold;
          color: rgb(255, 255, 255);
          line-height: 18px;
        }
      }
      .desc{
        margin-top: 8px;
        font-size: 12px;
        line-height: 12px;
      }
      .support{
        margin-top: 10px;       
        .type{
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;          
          background-size: 100% 100%;
          &.decrease{
            @include bg-image('decrease_1');
          }
          &.discount{
            @include bg-image('discount_1');
          }
          &.special{
            @include bg-image('special_1');
          }
          &.invoice{
            @include bg-image('invoice_1');
          }
          &.guarantee{
            @include bg-image('guarantee_1');
          }
        }
        .txt{
          margin-left: 4px;
          display: inline-block;
          font-size: 10px;
          line-height: 12px;
        }
      }
    }
    .supports{
      position: absolute;
      right: 12px;
      bottom: 14px;;
      padding: 7px 8px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      .count{
        font-size: 10px;
        line-height: 12px;
      }
      .icon-keyboard_arrow_right{
        margin-left: 2px;
        font-size: 10px;
      }
    }
  }
  .background{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    filter: blur(10px);
  }
  .bulletin-wrapper{
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 22px 0 12px;
    line-height: 28px;
    background: rgba(7, 17, 27, 0.2);
    .bulletin-icon{
      display: inline-block;
      margin-top: 8px;
      width: 22px;
      height: 12px;
      vertical-align: top;
      @include bg-image('bulletin');
      background-size: 100% 100%;
    }
    .bulletin-txt{
      vertical-align: top;
      margin-left: 4px;
      font-size: 10px;
    }
    .icon-keyboard_arrow_right{
      position: absolute;
      right: 12px;
      top: 9px;
      font-size: 10px;
    }
  }
  .detail{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    z-index: 200;
    padding: 64px 36px 32px 36px;
    background: rgba(7, 17, 27, 0.8);
    .name{
      font-size: 16px;
      font-weight: 700;
      text-align: center;
    }
    .star-wrapper{
      margin-top: 16px;
      text-align: center;
    }
    .title{
      display: flex;
      margin: 28px auto 24px auto;
      .line{
        flex: 1;
        position: relative;
        top: -6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }
      .txt{
        font-size: 14px;
        font-weight: 700;
        padding: 0 12px;
      }
    }
    .supports{
      padding: 0 12px;
      .support{
        margin-bottom: 12px;
        &:last-child{
          margin: 0;
        }
      }
        .type{
          display: inline-block;
          vertical-align: top;
          width: 16px;
          height: 16px;          
          background-size: 100% 100%;
          &.decrease{
            @include bg-image('decrease_1');
          }
          &.discount{
            @include bg-image('discount_1');
          }
          &.special{
            @include bg-image('special_1');
          }
          &.invoice{
            @include bg-image('invoice_1');
          }
          &.guarantee{
            @include bg-image('guarantee_1');
          }
        }
        .txt{
          margin-left: 6px;
          display: inline-block;
          font-size: 12px;
        }      
    }
    .bulletin{
      font-size: 12px;
      line-height: 24px;
      padding: 0 12px;
    }
    .close{
      position: absolute;
      width: 32px;
      height: 32px;
      bottom: 32px;
      left: 50%;
      margin-left: -16px;
      .icon-close{
        font-size: 32px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>