<template>
  <div class="main-box">
    <mt-header fixed title="寄售大厅">
      <div slot="left" class="left-btn" @click="goto('/')">
        <i class="iconfont icon-left"></i>
      </div>
      <!-- <mt-button slot="right" @click="changeSorter">
        <span v-if="sorter.asc">价格升序</span>
        <span v-else>价格降序</span>
      </mt-button> -->
      <div slot="right" class="right-btn">
        <i class="iconfont icon-search" @click="openSearch"></i>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <i class="iconfont icon-mail" @click="goto('/mail')"></i> <div class="badge">{{mailCount}}</div>
      </div>

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
      <sell-card class="card-box" v-for="card in cardList" :card="card" :key="card._id" @buy="buy"></sell-card>
    </div>
  </div>
</template>

<script>
import sellCard from '@/components/sell-card'
import goodsFilter from '@/components/goodsFilter'
import api from '@/utils/api'
import {Indicator, Toast} from 'mint-ui'
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
      mailCount: 0,
      popupSearch: false,
      loading: false,
      cardList: []
    }
  },
  created () {
    this.getGoods()
    this.getMailCount()
  },
  methods: {
    goto (url) {
      this.$router.push(url)
    },
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
    getMailCount () {
      api.get(`/mailCount`, {}).then(res => {
        if (res.status === 200 && res.data) {
          this.mailCount = res.data
          console.log('mailCount', res.data)
        }
      }).catch(err => {
        console.log(err)
        // this.$store.dispatch('setLoadingState', false)
      })
    },
    buy (goods) {
      const params = {
        _id: goods._id
      }
      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      })
      api.get(`/buy`, {params}).then(res => {
        // this.$store.dispatch('setLoadingState', false)
        Indicator.close()
        if (res.status === 200 && res.data) {
          this.getMailCount()
          Toast({
            message: '购买成功',
            position: 'bottom',
            duration: 2000
          })
        } else {
          Toast({
            message: '购买失败',
            position: 'bottom',
            duration: 2000
          })
        }
        this.getGoods()
      }).catch(err => {
        console.log(err)
        // this.$store.dispatch('setLoadingState', false)
      })
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

      api.get(`/getSales`, {params}).then(res => {
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
.right-btn {
  display: flex;
  justify-content: flex-end;
}
.badge {
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius : 20px;
  text-align: center;
  line-height: 20px;
  transform: translateX(-10px);
}
.icon-search {
  font-size: 32px;
}
.icon-mail {
  font-size: 32px;
}
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
