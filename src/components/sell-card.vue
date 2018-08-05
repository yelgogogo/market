<template>
  <div class="header">
    <div class="show-box">
      <div class="show-box-item">
        <div class="show-box-category">{{CATEGORY[card.category + '_TXT']}}</div>
        <img :src="getImg(card.category)">
        <div>
          <a class="text-box-url" :href="card.url" target="_blank">{{card.owner}}</a>
        </div>
      </div>
      <div class="show-box-prop">
        <div v-for="(goodsProp, index) in goodsProps" :key="index">{{PROP[goodsProp.name+'_TXT']?PROP[goodsProp.name+'_TXT']:goodsProp.name}} {{goodsProp.value}}</div>
      </div>
      <div class="price-box">
        <div class="text-box-price">
          <img v-if="card.priceUnit==='IST'" src="static/img/IST.gif">
          <img v-if="card.priceUnit==='PG'" src="static/img/PG.gif">
          {{card.price}}
        </div>
      </div>
      <div class="buy-btn">
        <mt-button class="buy-txt" size="small" type="default" plain @click="buy">购买</mt-button>
      </div>
    </div>
    <div class="text-box">
      <!-- <div class="text-box-owner">{{card.owner}}</div> -->
      <span>{{card.text}}</span>
    </div>
  </div>
</template>

<script>
import {PROP, CATEGORY} from '@/utils/enum'
import { MessageBox } from 'mint-ui'
export default {
  name: 'sell-card',
  props: ['card'],
  components: {
  },
  data () {
    return {
      PROP: PROP,
      CATEGORY: CATEGORY,
      expandflag: this.expand
    }
  },
  computed: {
    goodsProps () {
      let propArray = []
      const noneProp = ['text', '_id', 'owner', 'category', 'comment', 'price', 'priceUnit']
      propArray = this.card.propArray.filter(c => {
        return !noneProp.includes(c.name)
      })
      // for (let prop in this.card) {
      //   const name = prop
      //   const value = this.card[prop]
      //   if (!noneProp.includes(prop)) {
      //     propArray.push({name, value})
      //   }
      // }
      return propArray
    }
  },
  created () {
    // console.log(this.card)
  },
  methods: {
    buy() {
      MessageBox.confirm('', {
        message: '确认购买？',
        title: '提示',
        confirmButtonText: '购买',
        cancelButtonText: '取消'
      })
      .then(action => {
        if (action == 'confirm') {     //确认的回调
        console.log(1);
        }
      })
      .catch(err => {
        if (err == 'cancel') {     //取消的回调
        console.log(2);
        }
      });
    },
    random (max) {
      return Math.ceil(Math.random() * max)
    },
    getImg (category) {
      let imgUrl = `static/img/${category}-1.gif`
      return imgUrl
    },
    expandCard () {
      this.expandflag = true
    },
    collapseCard () {
      this.expandflag = false
    },
    commentButtonClick () {
      this.$emit('comment-button', this.card)
    }
  }
}
</script>
<style scoped>
.price-box {
  display: flex;
  align-items: center;
}
.buy-txt {
  color: #b89d70;
  border: 1px solid #b89d70;
}
.buy-btn {
  display: flex;
  align-items: center;
  width: 100px;
  margin-left: 10px;
  margin-right: 10px;
}
.show-box-category {
  color: #b89d70;
}
.show-box {
  background-color: black;
  color: #4850b8;
  display: inline-flex;
  width: 100%;
}

.text-box {
  background-color: black;
  display: inline-flex;
  color: #b26400;
  text-align: center;
  font-size: 14px;
}

.text-box-url {
  text-align: center;
  color: #b26400;
}

.text-box-owner {
  text-align: center;
  width: 30%;
}

.text-box-price {
  background-color: black;
  color: #f5d58f;
  font-size: x-large;
  font-weight: 700;
  text-align: center;
  height: fit-content;
}

.show-box-item {
  width: 30%;
}

.show-box-prop {
  width: 70%;
}

.expandCard {
  margin: 15px 0;
}

.collapseCard {
  margin: 15px 15px;
}
</style>
