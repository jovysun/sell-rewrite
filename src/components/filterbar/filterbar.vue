<template>
  <div class="filter-wrapper">
    <div class="tabs border-1px">
      <div class="tab" :class="[{'down': tab.type === 1}, {'active': tab.type === selectedType}]" v-for="(tab, index) in tabs" :key="index" @click="selectType(tab.type)">
        {{tab.name}}<span class="num">{{tab.num}}</span>
      </div>
    </div>
    <div class="has-content" @click="toggleCheck">
      <i class="icon-check_circle" :class="{'active': contentCheck}"></i>
      <span class="txt">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      },
      tabs: {
        type: Array
      }
    },
    data() {
      return {
        selectedType: -1,
        contentCheck: true
      }
    },
    methods: {
      selectType(type) {      
        this.selectedType = type;
        this.$emit('filterContent', this.selectedType, this.contentCheck);
      },
      toggleCheck() {
        this.contentCheck = !this.contentCheck;
        this.$emit('filterContent', this.selectedType, this.contentCheck);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@/common/scss/mixin.scss';
  .filter-wrapper{
    .tabs{
      padding: 12px 0 18px;
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