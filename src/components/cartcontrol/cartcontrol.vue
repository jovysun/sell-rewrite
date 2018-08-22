<template>
  <div class="cartcontrol">
    <i class="icon-remove_circle_outline" v-show="food.count > 0" @click="decreaseCart"></i>
    <span class="num" v-show="food.count > 0">{{food.count}}</span>
    <i class="icon-add_circle" @click="addCart"></i>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart() {
        if(!this.food.count) {
          Vue.set(this.food, 'count', 1);
        }else {
          this.food.count++;
        }
        this.$emit('add', event.target);
      },
      decreaseCart() {
        this.num > 0 ? this.num-- : '';
        if(this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .cartcontrol{
    font-size: 0;
    .icon-add_circle,.icon-remove_circle_outline{
      display: inline-block;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
    .num{
      display: inline-block;
      vertical-align: top;
      width: 24px;
      text-align: center;
      font-size: 10px;
      line-height: 24px;
      color: rgb(147, 153, 159);
    }
  }
</style>