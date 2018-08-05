<template>
  <div class="link-bar">
    <div class="link-bar-item" v-for="option in options" :key="option.label" @click="goto(option.link)" :class="{ active: select[option] }">
        <img class="link-bar-item-img" :src="getImg(option.img)">
        <div class="link-bar-item-txt">{{option.label}}</div>
    </div>>
  </div>
</template>

<script>
export default {
  name: 'link-bar',
  // props: ['filter'],
  components: {
  },
  data () {
    return {
      category: undefined,
      select: {},
      options: [
        {
          label: '精品赏析',
          img: 'HARMER',
          link: '/type?category=AUCTION'
        },
        {
          label: '快捷寄售',
          img: 'JEWELRY',
          link: '/sell'
        }
      ]
    }
  },
  computed: {
  },
  created () {
    // console.log(this.card)
  },
  methods: {
    getImg (category) {
      let imgUrl = `static/img/${category}.png`
      return imgUrl
    },
    goto (link) {
      this.$router.push(link)
    }
  }
}
</script>
<style scoped>
.link-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 10px;
}
.link-bar-item {
  width: 50%;
  box-sizing: border-box;
}

.link-bar-item-img {
}
.link-bar-item-txt {
  color: #b26400;
}
</style>
