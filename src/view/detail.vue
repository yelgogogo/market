<template>
  <div class="header" v-if="card.category">
    <mt-header fixed >
      <div slot="left" class="left-btn" @click="goBack">
        <i class="iconfont icon-left"></i>
      </div>
    </mt-header>
    <div class="show-box">
      <div class="show-box-item">
        <!-- <div class="show-box-category">{{CATEGORY[card.category + '_TXT']}}</div> -->
        <img :src="getImg(card.category)">
      </div>
      <div class="show-box-prop">
        <div v-for="(goodsProp, index) in goodsProps" :key="index">{{PROP[goodsProp.name+'_TXT']?PROP[goodsProp.name+'_TXT']:goodsProp.name}} {{goodsProp.value}}</div>
      </div>
    </div>
    <div class="text-box-price">
      <div class="text-box-owner">
        <img v-if="card.priceUnit==='IST'" src="static/img/IST.gif">
        <img v-if="card.priceUnit==='PG'" src="static/img/PG.gif">
        {{card.price}}
      </div>
    </div>
    <div class="text-box">
        <a class="text-box-url" :href="card.url" target="_blank">{{card.owner}}</a>
      <div>{{card.text}}</div>
    </div>

  </div>
</template>

<script>
import {PROP, CATEGORY} from '@/utils/enum'
import api from '@/utils/api'
import { Indicator } from 'mint-ui'
export default {
  name: 'detail',
  components: {
  },
  data () {
    return {
      card: {
        propArray: []
      },
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
      return propArray
    }
  },
  created () {
    // console.log(this.card)
    this.getItem()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getItem () {
      const params = {
        _id: this.$route.query._id,
        dbName: this.$route.query.dbName
      }
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      })
      api.get(`/getItem`, {params}).then(res => {
        // this.$store.dispatch('setLoadingState', false)
        Indicator.close()
        if (res.status === 200 && res.data) {
          this.card = res.data
        }
      }).catch(err => {
        console.log(err)
        // this.$store.dispatch('setLoadingState', false)
      })
    },
    random (max) {
      return Math.ceil(Math.random() * max)
    },
    getImg (category) {
      let imgUrl = `static/img/${category}-${this.random(6)}.gif`
      return imgUrl
    },
    commentButtonClick () {
      this.$emit('comment-button', this.card)
    }
  }
}
</script>
<style scoped>

.show-box-category {
  color: #b89d70;
}
.show-box {
  background-color: black;
  color: #4850b8;
  width: 100%;
}

.text-box {
  background-color: black;
  /* display: inline-flex; */
  text-align: left;
  padding-left: 10px;
  color: #b26400;
  width: 100%;
}

.text-box-url {
  text-align: center;
  color: #b26400;
  width: 100%;
}

.text-box-owner {
  padding-left: 10px;
  text-align: left;
  width: 100%;
}

.text-box-price {
  background-color: black;
  width: 100%;
  color: #f5d58f;
  font-size: x-large;
  font-weight: 700;
  text-align: left;

}

.show-box-item {
  width: 100%;
}

.show-box-prop {
  width: 100%;
}

.expandCard {
  margin: 15px 0;
}

.collapseCard {
  margin: 15px 15px;
}
</style>
