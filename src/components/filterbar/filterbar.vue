<template>
  <div class="filterbar">
    <div class="tabs border-1px">
      <div class="tab" :class="getTabClass(index)" v-for="(tab, index) in tabs" :key="index" @click="filterContent(false, index)">
        {{tab.text}}<span class="num">{{tab.num}}</span>
      </div>
    </div>
    <div class="has-content" @click="filterContent(true)">
      <i class="icon-check_circle" :class="{'active': contentCheck}"></i>
      <span class="txt">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const TABCLASS = ['all', 'up', 'down'];
  export default {
    props: {
      tabs: {
        type: Array
      }
    },
    data() {
      return {
        contentCheck: true,
        selectedIndex: 0
      }
    },
    methods: {
      getTabClass(index) {
        let activeStr = this.selectedIndex === index ? ' active' : '';
        return TABCLASS[index] + activeStr;
      },   
      selectType(index) {      
        this.selectedIndex = index;
        this.$emit('filterContent', this.tabs[this.selectedIndex].type, this.contentCheck);
      },
      toggleCheck() {
        this.contentCheck = !this.contentCheck;
        this.$emit('filterContent', this.tabs[this.selectedIndex].type, this.contentCheck);
      },
      filterContent(toggle, index) {
        if (toggle) this.contentCheck = !this.contentCheck;
        if (typeof index !== 'undefined') this.selectedIndex = index;
        
        this.$emit('filterContent', this.tabs[this.selectedIndex].type, this.contentCheck);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@/common/scss/mixin.scss';
  .filterbar{
    .tabs{
      padding: 0 0 18px;
      font-size: 0;
      &.border-1px{
        @include border-1px(rgba(7, 17, 27, 0.1));
      }
      .tab{
        display: inline-block;
        margin-left: 8px;
        padding: 8px 12px;
        border-radius: 2px;
        background: rgba(0, 160, 220, 0.2);
        color: rgb(77, 85, 93);
        font-size: 12px;
        line-height: 16px;
        &:first-child{
          margin-left: 0;
        }
        &.down{
          background: rgba(77, 85, 93, 0.2);
        }
        &.active{
          background: rgb(0, 160, 220);
          color: #fff;
        }
        &.down.active{
          background: #4d555d;
        }
        .num{
          padding-left: 4px;
          font-size: 8px;
        }
      }
    }
    .has-content{
      padding: 12px 0;
      font-size: 0; 
      .icon-check_circle{
        display: inline-block;
        vertical-align: top;
        font-size: 24px;
        color: rgb(147, 153, 159);
        &.active{
          color: #00c850;
        }        
      }
      .txt{
        display: inline-block;
        margin-left: 4px;
        font-size: 12px;
        color: rgb(147, 153, 159);
        line-height: 24px;
      }
    }
  }

</style>