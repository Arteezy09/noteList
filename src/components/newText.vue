<template>
  <form @submit.prevent="create()">
    <input
      v-model="text"
      type="text"
      placeholder="Write something ..."
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    }
  },
  methods: {
    /*Передача текста в родительский компонент*/
    create() {
      if (this.text.length > 0) {
        this.$emit("new-text", this.text);
      }
      this.text = "";
    }
  }
}
</script>

