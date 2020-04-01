<template>
  <li class="li-todo">
    <!--Текст Todo-->
    <h2 v-if="!isEdit" :class="{ completed }">{{ header }}</h2>

    <!--Модальное окно confirm-->
    <form v-else @submit.prevent="endEdit()">
      <input
        type="text"
        v-model="newTodoText"
        ref="newText"
      >
    </form>

    <!--Пользовательский checkbox-->
    <label class="checkbox-label margin-left">
      <input type="checkbox" v-model="completed" @click="$emit('on-toggle')">
      <span class="checkbox-custom"></span>
    </label>

    <p @click="startEdit()"><i class="material-icons">edit</i></p>
    <p @click="$emit('delete-todo')"><i class="material-icons">delete</i></p>
  </li>
</template>

<script>
export default {
  props: {
    header: String, // текст Todo
    completed: Boolean // Todo выполнен или нет?
  },
  data() {
    return {
      isEdit: false, // редактируется ли текст Todo?
      newTodoText: "" // новый текст для Todo
    }
  },
  methods: {

    /*Начало редактировния текста Todo*/
    startEdit() {
      if (this.isEdit) {
        this.endEdit();
      } else {
        this.newTodoText = this.header;
        this.isEdit = true;
        this.$nextTick(() => this.$refs.newText.focus());
      }
    },
    /*Конец редактировния текста Todo*/
    endEdit() {
      this.isEdit = false;
      this.$emit("edit-todo", this.newTodoText);
    }
  }
}
</script>

<style>
.completed {
  opacity: 0.2;
  text-decoration: line-through;
}
</style>