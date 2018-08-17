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
          <span class="type"></span>
          <span class="txt">{{seller.supports[0].description}}</span>
        </div>     
      </div>
      <div class="supports" v-if="seller.supports">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-icon"></span>
      <span class="bulletin-txt">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>    
  </div>
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object
      }
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
          @include bg-image('decrease_1');
          background-size: 100% 100%;
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
}
</style>