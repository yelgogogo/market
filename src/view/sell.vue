<template>
  <div class="main-box">
    <mt-header fixed title="混沌交易所">
      <mt-button icon="search" slot="left" @click="openSearch"></mt-button>
      <mt-button slot="right" @click="changeSorter">
        <span v-if="sorter.asc">价格升序</span>
        <span v-else>价格降序</span>
      </mt-button>
    </mt-header>
    <mt-popup
      v-model="popupSearch"
      class="popup-search"
      position="right">
      <goods-filter @onClick="onClick"></goods-filter>
    </mt-popup>
    <div v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="30" v-if="cardList.length>0"
      class="card-list-box">
      <sell-card class="card-box" v-for="card in cardList" :card="card" :key="card._id"></sell-card>
    </div>
  </div>
</template>

<script>
import sellCard from '@/components/sell-card'
import goodsFilter from '@/components/goodsFilter'
import api from '@/utils/api'
import { Indicator } from 'mint-ui'
export default {
  name: 'hall',
  components: {
    goodsFilter, sellCard
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 20,
      total: 0,
      filter: {},
      sorter: {
        name: 'priceValue',
        asc: false
      },
      popupSearch: false,
      loading: false,
      cardList: []
    }
  },
  created () {
    console.log(this.$route.query)
    this.getGoods()
  },
  methods: {
    changeSorter () {
      this.sorter.asc = !this.sorter.asc
      this.getGoods()
    },
    openSearch () {
      this.popupSearch = true
    },
    onClick (e) {
      this.filter = e
      this.pageSize = 20
      this.getGoods()
      this.popupSearch = false
      console.log('onClick', e)
    },
    getGoods () {
      if (this.$route.query.owner) {
        this.filter.owner = this.$route.query.owner
      }
      const params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        filter: this.filter,
        sorter: this.sorter
      }
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      })

      api.get(`/getGoods`, {params}).then(res => {
        // this.$store.dispatch('setLoadingState', false)
        Indicator.close()
        if (res.status === 200 && res.data) {
          console.log('suggestion', res.data.data)
          this.total = res.data.total
          this.cardList = res.data.data
          if (this.cardList.length === this.total) {
            this.loading = true
          } else {
            this.loading = false
          }
        }
      }).catch(err => {
        console.log(err)
        // this.$store.dispatch('setLoadingState', false)
      })
    },
    loadMore () {
      if (this.loading) {
        return
      }
      console.log('loadMore')
      setTimeout(() => {
        this.pageSize = this.pageSize + 20
        console.log('this.pageSize', this.pageSize)
        this.getGoods()
        // this.cardList = this.storyData.slice(0, this.cardList.length + 5)
      }, 500)
      this.loading = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link-bar-border {
  border-top: #5a5a5a 1px solid;
  border-bottom: #5a5a5a 1px solid;
}
.card-list-box {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
}
.card-list-title {
  width: 100%;
  padding: 10px;
  color: #b26400;
}
.card-box {
  width: 100%;
  box-sizing: border-box;
  border-bottom: #5a5a5a 1px solid;
}
.main-box {
  width: 100%;
  background-color: black;
}
.popup-search {
  height: 100%;
  width: 70%;
  background-color: black;
  overflow-y: scroll;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
