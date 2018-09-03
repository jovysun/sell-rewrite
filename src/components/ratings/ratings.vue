<template>
  <div class="ratings" ref="ratings">
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
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="item">
            <span class="title">商品评价</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="item">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>                    
        </div>
      </div>

      <split v-if="ratings"></split>
      <div class="rating" v-if="ratings">
        <filterbar :tabs="tabs" @filterContent="filterContent"></filterbar>
        <ul class="rating-list">
          <li class="rating-item border-1px" v-for="(rating, index) in ratings" :key="index" v-show="needShow(rating.rateType, rating.text)">
            <div class="rating-header">
              <div class="avatar-holder">
                <img :src="rating.avatar" alt="" class="avatar">
              </div>       
              <div class="desc">
                <div class="name">{{rating.username}}</div>            
                <div class="star-time">
                  <star :size="24" :score="rating.score"></star>
                  <span class="time" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
              </div>
              <div class="rate-time">{{rating.rateTime | formatTime}}</div>
            </div>
            <div class="rating-text" v-if="rating.text">
              {{rating.text}}
            </div>
            <div class="recommend">
              <i :class="[rating.rateType === 1 ? 'icon-thumb_down' : 'icon-thumb_up']"></i>
              <div class="tags">
                <span class="tag" v-if="rating.recommend" v-for="(recomment,index) in rating.recommend" :key="index">{{recomment}}</span>
              </div>           
            </div>
          </li>
        </ul>
      </div>      
    </div>

  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import filterbar from '@/components/filterbar/filterbar.vue';
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

        return [{'text': '全部', 'num': totalNum, 'type': -1}, {'text': '满意', 'num': upNum, 'type': 0}, {'text': '不满意', 'num': downNum, 'type': 1}];    
      }
    },
    created() {
      this.$axios.get('/api/ratings')
      .then((response) => {
        if(response.data.errno === 0){
          this.ratings = response.data.ratings;

          this.$nextTick(() => {
            this._initScroll();
          })
          
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
        
      },
      _initScroll() {
        this.ratingsScroll = new BScroll(this.$refs.ratings, {
          click: true
        });        
      }         
    },
    components: {
      filterbar,
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
  .ratings{
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 0;
    overflow: hidden;

    .intro{
      position: relative;
      display: flex;
      padding: 18px 0;
      .intro-left{
        flex: 0 0 137px;
        width: 137px;
        text-align: center;
        .score{
          font-size: 24px;
          line-height: 28px;
          color: rgb(255, 153, 0);
        }
        .title{
          margin-top: 6px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .rankrate{
          margin-top: 8px;
          padding-bottom: 6px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      } 
      .intro-right{
        flex: 1;
        padding: 6px 6px 6px 24px;
        border-left: 1px solid rgba(7,17,27,.1);
        .item{
          font-size: 0;
          margin-top: 8px;
          &:first-child{
            margin-top: 0;
          }
          .title{
            display: inline-block;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
          }
          .star{
            display: inline-block;
            margin-left: 12px;
            vertical-align: top;
          }
          .score{
            display: inline-block;
            margin-left: 12px;
            font-size: 12px;
            line-height: 18px;
            color: rgb(255, 153, 0);
          }
          .time{
            display: inline-block;
            margin-left: 12px;
            font-size: 12px;
            line-height: 18px;
            color: rgb(147, 153, 159);            
          }
        }
      }    
    }

    .rating{
      padding: 18px 18px 0;    
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
            font-size: 0;
            .avatar-holder{
              display: inline-block;
              vertical-align: top;
              .avatar{
                width: 28px;
                height: 28px;
                border-radius: 50%;
              }
            }
            .desc{
              display: inline-block;
              margin-left: 12px;
              .name{
                font-size: 10px;
                line-height: 12px;
                color: rgb(7, 17, 27);
              }
              .star-time{
                margin-top: 4px;
                font-size: 0;
                .star{
                  display: inline-block;
                  vertical-align: top;
                }
                .time{
                  display: inline-block;
                  margin-left: 6px;
                  font-size: 10px;
                  line-height: 12px; 
                  color: rgb(147, 153, 159);                 
                }
              }
            }
            .rate-time{
              position: absolute;
              right: 0;
              top: 0;
              font-size: 10px;
              line-height: 12px; 
              color: rgb(147, 153, 159);                
            }

          }
          .rating-text{
            margin-top: 6px;
            padding-left: 40px;
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .recommend{
            display: flex;
            padding-left: 40px;
            .icon-thumb_down,.icon-thumb_up{
              margin-top: 8px;
              width: 12px;
              flex: 0 0 12px;
              font-size: 12px;
              line-height: 16px;
              vertical-align: top;
            }
            .icon-thumb_down{
              color: rgb(147, 153, 159);             
            }
            .icon-thumb_up{
              color: rgb(0, 160, 220);
            }
            .tags{
              flex: 1;
              font-size: 0;
            }
            .tag{
              display: inline-block;
              margin-left: 8px;
              margin-top: 8px;
              padding: 0 6px;
              font-size: 9px;
              line-height: 16px;
              color: rgb(147, 153, 159);
              border: 1px solid rgba(7, 17, 27, 0.1);
              background: #fff;
            }
          }


        }
      }
    }
  }

</style>