<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" ref="menuItem" :class="{'active': activeIndex === index}" v-for="(item,index) in goods" :key="index" @click="selectMenu(index)">
            <span class="txt border-1px">
              <i class="icon" :class="classMap[item.type]" v-if="item.type >= 0"></i>{{item.name}}
            </span>     
          </li>
        </ul>
      </div>

      <div class="content-wrapper" ref="contentWrapper">
        <ul>
          <li class="content-item" v-for="(cate,index) in goods" :key="index" ref="contentItem">
            <h3 class="name">{{cate.name}}</h3>
            <dl class="food-list">
              <dd class="food-item border-1px" v-for="(food,index) in cate.foods" :key="index" @click="selectFood(food)">
                <div class="food-pic"><img :src="food.icon" alt="" width="57" height="57"></div>
                <div class="food-content">
                  <h3 class="food-name">{{food.name}}</h3>
                  <div class="desc" v-if="food.description">{{food.description}}</div>
                  <div class="sell-rating">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="carcontrol-wrapper">
                    <cartcontrol :food="food" @add="addFood"></cartcontrol>
                  </div>
                </div>

              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <shopcart :seller="seller" :selectFoods="selectFoods"></shopcart>
    </div>
    <food :selectedFood="selectedFood" ref="food"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartcontrol from '@/components/cartcontrol/cartcontrol.vue';
  import shopcart from '@/components/shopcart/shopcart.vue';
  import food from '@/components/food/food.vue';
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        goods: [],
        heightList: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      activeIndex() {
        for (let i = 0; i < this.heightList.length; i++) {
          let height1 = this.heightList[i];
          let height2 = this.heightList[i + 1];
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            this._followScroll(i);
            return i;
          }          
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((element) => {
          element.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          })
        })

        return foods;
      }
    },
    created() {
      this.$axios.get('/api/goods')
      .then((response) => {
        if(response.data.errno === 0){
          this.goods = response.data.goods;

          this.$nextTick(() => {
            this._initScroll();
            this._getHeightList();
          })
          
        }
      })
      .catch((error) => {
        console.log(error);
      })
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.contentScroll = new BScroll(this.$refs.contentWrapper, {
          click: true,
          probeType: 3
        });
        this.contentScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(pos.y);
        })
      },
      _getHeightList() {
        this.$refs.contentItem.forEach(element => {
          this.heightList.push(element.offsetTop);
        });
      },
      _followScroll(index) {
        this.menuScroll.scrollToElement(this.$refs.menuItem[index], 300);
      },
      selectMenu(index) {
        this.contentScroll.scrollToElement(this.$refs.contentItem[index], 300);
      },
      addFood() {
        console.log('add food');
      },
      selectFood(food) {
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    components: {
      cartcontrol,
      shopcart,
      food
    }   
  }
</script>

<style scoped lang="scss">
  @import '@/common/scss/mixin.scss';
  .goods{
    display: flex;
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 48px;
    overflow: hidden;
    .menu-wrapper{
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item{
        padding: 0 12px;
        width: 56px;       
        // color: rgb(240, 20, 20);
        &.active{
          background: #fff;
          .txt.border-1px{
            @include border-none;
          }
        }
        .txt{
          display: block;
          width: 100%;
          padding: 20px 0;
          font-size: 12px;
          line-height: 14px;
          &.border-1px{
            @include border-1px(rgba(7, 17, 27, 0.1));
          }     
          
          .icon{
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;     
            margin-right: 2px;     
            background-size: 100% 100%;
            &.decrease{
              @include bg-image('decrease_3');
            }
            &.discount{
              @include bg-image('discount_3');
            }
            &.special{
              @include bg-image('special_3');
            }
            &.invoice{
              @include bg-image('invoice_3');
            }
            &.guarantee{
              @include bg-image('guarantee_3');
            }              
          }
        }

      }
    }
    .content-wrapper{
      flex: 1;
      .content-item{

        .name{
          border-left: 2px solid #d9dde1;
          background: #f3f5f7;
          font-size: 12px;
          line-height: 26px;
          color: rgb(147, 153, 159);
          padding-left: 14px;
        }
        .food-list{
          padding: 0 18px;

          .food-item{
            display: flex;
            padding: 18px 0;
            &.border-1px{
              @include border-1px(rgba(7,17,27,0.1));
            }
            &:last-child{
              @include border-none;
            }
            .food-pic{
              flex: 0 0 57px;
              width: 57px;
              margin-right: 10px;
            }
            .food-content{
              position: relative;
              flex: 1;
              .food-name{
                margin-top: 2px;
                font-size: 14px;
                color: rgb(7, 17, 27);
              }
              .desc{
                margin-top: 8px;
                font-size: 10px;
                line-height: 14px;
                color: rgb(147, 153, 159);
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
                line-height: 24px;
                font-weight: 700;
                .now{
                  font-size: 14px;
                  color: rgb(240, 20, 20);
                }
                .old{
                  padding-left: 8px;
                  font-size: 14px;
                  color: rgb(147, 153, 159);
                }
              }
              .carcontrol-wrapper{
                position: absolute;
                right: 0;
                bottom: 0;
              }
            }

          }

        }        

      }
    }
  }
</style>