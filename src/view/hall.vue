<template>
  <div class="hello">
    <div v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="30" v-if="cardList.length>0">
      <card v-for="card in cardList" :card="card" :key="card._id"></card>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import api from '@/utils/api'
export default {
  name: 'hall',
  components: {
    card
  },
  data () {
    return {
      loading: false,
      cardList: []
    }
  },
  created () {
    this.getGoods()
  },
  methods: {
    getGoods () {
      api.get(`/getGoods`).then(res => {
        // this.$store.dispatch('setLoadingState', false)
        if (res.status === 200 && res.data) {
          console.log('suggestion', res.data.data)
          this.cardList = res.data.data
        }
      }).catch(err => {
        console.log(err)
        // this.$store.dispatch('setLoadingState', false)
      })
    },
    loadMore () {
      this.loading = true
      setTimeout(() => {
        // this.cardList = this.storyData.slice(0, this.cardList.length + 5)
        this.loading = false
      }, 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
