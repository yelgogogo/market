<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.mint-cell {
  background-color: transparent!important;
}

.mint-checklist-label {
  text-align: left!important;
}

.mint-radiolist-label {
  text-align: left!important;
}

</style>
