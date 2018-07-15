<template>
  <div class="header">
    <div class="show-box">
      <div class="show-box-item">
        <div class="show-box-category">{{CATEGORY[card.category + '_TXT']}}</div>
        <img :src="getImg(card.category)">
      </div>
      <div class="show-box-prop">
        <div v-for="goodsProp in goodsProps" :key="goodsProp.name">{{PROP[goodsProp.name+'_TXT']}} {{goodsProp.value}}</div>
      </div>
    </div>
    <div class="text-box">
      <div class="text-box-owner">{{card.owner}}</div>
      <div>{{card.text}}</div>
    </div>
    <div class="text-box-price">
      <img v-if="card.priceUnit==='IST'" src="static/img/IST.gif">
      <img v-if="card.priceUnit==='PG'" src="static/img/PG.gif">
      {{card.price}}
    </div>
  </div>
</template>

<script>
import {PROP, CATEGORY} from '@/utils/enum'
export default {
  name: 'card',
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
    random (max) {
      return Math.ceil(Math.random() * max)
    },
    getImg (category) {
      let imgUrl = ''
      switch (category) {
        case 'AMULET':
          imgUrl = `static/img/amulet-${this.random(3)}.gif`
          break
      }
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

.show-box-category {
  color: #b89d70;
}
.show-box {
  background-color: black;
  color: #4850b8;
  display: inline-flex;
  width: 100vw;
}

.text-box {
  background-color: black;
  display: inline-flex;
  color: #b26400;
  width: 100vw;
}

.text-box-owner {
  width: 30vw;
}

.text-box-price {
  background-color: black;
  width: 100vw;
  color: #f5d58f;
  font-size: x-large;
  font-weight: 700;
  text-align: left;
  border-bottom: #786f6f 6px solid;
}

.show-box-item {
  width: 30vw;
}

.show-box-prop {
  width: 70vw;
}

.expandCard {
  margin: 15px 0;
}

.collapseCard {
  margin: 15px 15px;
}
</style>
