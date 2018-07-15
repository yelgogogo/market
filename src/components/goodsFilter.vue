<template>
  <div class="goods-filter">
    <div v-for="option in options" :key="option.name">
      <div @click="selectCell(option)" class="goods-filter-option">
        {{option.name}}
          <!-- <div v-if="!option.show" class="expand-option"></div> -->
          <i v-if="option.show" class="iconfont icon-down"></i>
          <i v-if="!option.show" class="iconfont icon-left"></i>
      </div>
      <mt-checklist v-if="option.show"
        align="left"
        class="goods-filter-check"
        v-model="option.checked"
        :options="option.group">
      </mt-checklist>
    </div>
    <div class="search-btn-box">
      <mt-button class="search-btn" type="primary" @click="searchGoods">搜寻</mt-button>
    </div>

  </div>
</template>

<script>
import {PROP, CATEGORY} from '@/utils/enum'
import {OPTIONS} from '@/utils/config'
export default {
  name: 'card',
  // props: ['filter'],
  components: {
  },
  data () {
    return {
      filter: {},
      options: OPTIONS,
      PROP: PROP,
      CATEGORY: CATEGORY,
      expandflag: this.expand
    }
  },
  computed: {
  },
  created () {
    // console.log(this.card)
  },
  methods: {
    searchGoods () {
      let selected = {}
      this.options.forEach(element => {
        if (element.checked.length > 0) {
          element.checked.forEach(el => {
            selected[el] = true
          })
        }
      })
      this.$emit('onClick', selected)
    },
    selectCell (option) {
      option.show = !option.show
    },
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
.search-btn-box {
  width: 100vw;
  box-sizing: border-box;
  padding: 20px;
  padding: 20px;
}
.search-btn {
  width: 100%;
}
.expand-option {
  position: absolute;
  right: 20px;
}

.goods-filter-option {
  padding-left: 20px;
  text-align: left;
  font-size: large;
  color: #b26400;
  height: 40px;
  line-height: 40px;
}

.goods-filter-check {
  color: #b89d70;
}

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
