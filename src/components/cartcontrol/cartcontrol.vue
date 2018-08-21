<template>
  <div class="cartcontrol">
    <i class="icon-remove_circle_outline" v-show="num" @click="remove"></i>
    <span class="num" v-show="num">{{num}}</span>
    <i class="icon-add_circle" @click="add"></i>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 0
      }
    },
    methods: {
      add() {
        this.num++;
      },
      remove() {
        this.num > 0 ? this.num-- : '';
      }
    }
  }
</script>

<style scoped lang="scss">
  .cartcontrol{
    font-size: 0;
    .icon-add_circle,.icon-remove_circle_outline{
      display: inline-block;
      vertical-align: text-top;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
    .num{
      display: inline-block;
      vertical-align: text-top;
      width: 24px;
      text-align: center;
      font-size: 10px;
      line-height: 24px;
      color: rgb(147, 153, 159);
    }
  }
</style>