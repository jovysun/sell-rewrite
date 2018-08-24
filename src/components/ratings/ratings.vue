<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="intro">
        <div class="intro-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rankrate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="intro-right">
          <div class="item">
            <span class="title">服务态度</span>
            <span class="star-wrapper">3颗星</span>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
        </div>
      </div>

      <split v-if="ratings"></split>
      <div class="rating" v-if="ratings">
        <div class="filterbar-wrapper">
          <filterbar :food="food" :tabs="tabs" @filterContent="filterContent"></filterbar>
        </div>
        <ul class="rating-list">
          <li class="rating-item border-1px" v-for="(rating, index) in ratings" :key="index" v-show="needShow(rating.rateType, rating.text)">
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
  // import BScroll from 'better-scroll';
  import filterbar from '@/components/filterbar/filterbar.vue';
  import split from '@/components/split/split.vue';
  import moment from 'moment';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectedRateType: -1,
        hasContentCheck: true        
      }
    },

    computed: {
      tabs() {
        let totalNum = 0,
            upNum = 0, 
            downNum = 0;
        let ratings = this.ratings;
        if (ratings.length < 0) return [];

        totalNum = ratings.length;

        ratings.forEach(element => {
          if (element.rateType === 0) {
            upNum++;
          } else if (element.rateType === 1) {
            downNum++
          }
        });

        return [{'name': '全部', 'num': totalNum, 'type': -1}, {'name': '满意', 'num': upNum, 'type': 0}, {'name': '不满意', 'num': downNum, 'type': 1}];    
      }
    },
    created() {
      this.$axios.get('/api/ratings')
      .then((response) => {
        if(response.data.errno === 0){
          this.ratings = response.data.ratings;

          // this.$nextTick(() => {
          //   this._initScroll();
          //   this._getHeightList();
          // })
          
        }
      })
      .catch((error) => {
        console.log(error);
      })      
    }, 
    methods: { 
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
  .ratings{
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 48px;
    overflow: hidden;

    .intro{
      position: relative;
      padding: 18px;
           
    }

    .rating{
      padding: 18px 18px 0;
      .title{
        font-size: 14px;
        color: rgb(7, 17, 27);      
      }      
      .filterbar-wrapper{
        margin-top: 6px;
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