<template>
  <div class="type-bar">
    <div class="type-bar-item" v-for="option in options" :key="option" @click="selected(option)" :class="{ active: select[option] }">
        <img class="type-bar-item-img" :src="getImg(option)">
    </div>>

  </div>
</template>

<script>
export default {
  name: 'type-bar',
  // props: ['filter'],
  components: {
  },
  data () {
    return {
      category: undefined,
      select: {},
      options: ['AMULET', 'RING', 'BOOTS', 'SHIELD', 'BELT', 'ARMOR', 'HELMET']
    }
  },
  computed: {
  },
  created () {
    // console.log(this.card)
  },
  methods: {
    getImg (category) {
      let imgUrl = `static/img/${category}-1.gif`
      return imgUrl
    },
    selected (option) {
      this.select = {}
      this.select[option] = true
      this.$emit('onClick', option)
    }
  }
}
</script>
<style scoped>
.type-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.type-bar-item {
  width: 25%;
  box-sizing: border-box;
}

.type-bar-item-img {
}
.active {
}
</style>
