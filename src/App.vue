<template>
  <div id="app">
    <div id="nav">
      <h1>{{ header }}</h1>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    header() {
      if (this.$route.params.id === undefined) {
        return 'All Notes'
      }
      else {
        const idx = this.$store.state.noteList.findIndex(note => note.id === Number(this.$route.params.id))
        return this.$store.state.noteList[idx].header
      }
    }   
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 40px;
  background-color: #f8f9fa !important;
  color: #2c3e50;
}
</style>
