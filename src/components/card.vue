<template>
  <div class="header">
    <div class="show-box">
      <div class="show-box-item">
        <div>种类 {{card.category}}</div>
        <img src="static/amulet-1.gif">
      </div>
      <div class="show-box-prop">
        <div v-for="goodsProp in goodsProps" :key="goodsProp.name">{{PROP[goodsProp.name+'_TXT']}} {{goodsProp.value}}</div>
      </div>
    </div>
    <div>{{card.text}}</div>
    <div>{{card.owner}}</div>
    <div>价格 {{card.price}}</div>
  </div>
</template>

<script>
import {PROP} from '@/utils/enum'
export default {
  name: 'card',
  props: ['card'],
  components: {
  },
  data () {
    return {
      PROP: PROP,
      expandflag: this.expand
    }
  },
  computed: {
    goodsProps () {
      const propArray = []
      const noneProp = ['text', '_id', 'owner', 'category', 'comment', 'price']
      for (let prop in this.card) {
        const name = prop
        const value = this.card[prop]
        if (!noneProp.includes(prop)) {
          propArray.push({name, value})
        }
      }
      return propArray
    }
  },
  created () {
    console.log(this.card)
  },
  methods: {
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
.show-box {
  display: inline-flex;
  width: 100vw;
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
