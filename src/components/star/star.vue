<template>
  <div class="star">
    <span class="star-icon" :class="[sizeClass, itemClass]" v-for="(itemClass,index) in stars" :key="index"></span>
  </div>
</template>

<script>
  export default {
    props: {
      score: {
        type: Number
      },
      size: {
        type: Number
      },
      fullScore: {
        type: Number,
        default: 5
      },
      fullStar: {
        type: Number,
        default: 5
      }
    },
    computed: {
      sizeClass() {
        return 'star-' + this.size;
      },
      stars() {
        let stars = [];
        let step = this.fullScore / this.fullStar;
        let onStarNum = this.score / step;
        let halfStarNum = this.score % step === 0 ? 0 : 1;
        for (let i = 1; i < onStarNum; i++) {
          stars.push('on')         
        }
        if (halfStarNum) {
          stars.push('half')
        }
        for (let i = 1; i < this.fullStar - onStarNum - halfStarNum; i++) {
          stars.push('off')         
        }
        return stars;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@/common/scss/mixin.scss';

  .star{
    font-size: 0;
    .star-icon{
      display: inline-block;
      background-repeat: no-repeat;
      &.star-24{
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;        
        @include star-bg-image('24');  
        &:last-child{
          margin-right: 0;
        }  
      }
      &.star-36{
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        @include star-bg-image('36');  
        &:last-child{
          margin-right: 0;
        }           
      }
      &.star-48{
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;        
        @include star-bg-image('48'); 
        &:last-child{
          margin-right: 0;
        }            
      }
      
    }
  }
</style>