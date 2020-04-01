<template>
  <div class="container">
    <!--Компонент для создания Todo-->
    <new-text @new-text="newTodo($event)"></new-text>

    <!--Список Todo-->
    <ul class="list">
      <todo
        v-for="todo in todos"
        :key="todo.id"
        :header="todo.text"
        :completed="todo.completed"
        @delete-todo="deleteTodo(todo.id)"
        @edit-todo="editTodo(todo.id, $event)"    
        @on-toggle="toggleTodo(todo.id)"   
      />
    </ul> 

    <!--Группа кнопок-->
    <div class="btn-group">
      <p @click="undo()"><i class="material-icons" :class="{ showUndo }">undo</i></p>
      <button class="btn" @click="saveNote()">save</button>
      <button class="btn" @click="confirm('Do you really want to leave?', cancelEdit, toStay)">cancel</button>
      <button class="btn" @click="confirm('Do you really want to delete the note?', deleteNote, toStay)">delete</button>
      <p @click="redo()"><i class="material-icons" :class="{ showRedo }">redo</i></p>
    </div>

    <!--Модальное окно confirm-->
    <div id="wrapper" :style="{display:show}"></div>
    <div id="confirmBox" :style="{display:show}">
        <div class="message">{{ message }}</div>
        <button ref="btnYes">Yes</button>
        <button ref="btnNo">No</button>
    </div>

  </div>
</template>

<script>
import Todo from "./Todo.vue";
import newText from "./newText.vue";

export default {
  components: { Todo, newText },
  data() {
    return {
      message: '', // сообщение в confirm
      show: 'none' // стиль display для confirm
    }
  },
  methods: {
    /*Создание Todo*/
    newTodo(text) {
      this.$store.commit('CREATE_TODO', text)  
    },
    /*Удаление Todo*/
    deleteTodo(id) {
      this.$store.commit('DELETE_TODO', id)
    },
    /*Выполнение Todo (да / нет)*/
    toggleTodo(id) {
      this.$store.commit('TOGGLE_TODO', id)
    },
    /*Изменение текста Todo*/
    editTodo(id, text) {
      this.$store.commit('EDIT_TODO', {id, text})
    },
    /*Подтверждение confirm*/
    confirm(message, yesFn, noFn) {
      this.$refs.btnYes.onclick = yesFn;
      this.$refs.btnNo.onclick = noFn;
      this.message = message
      this.show = 'block'
    },
    /*Удалить заметку*/
    deleteNote() {
      this.$store.commit('DELETE_NOTE', Number(this.$route.params.id))
      this.show = 'none'
      this.$router.push('/')
    },
    /*Отменить изменение заметки и вернуться к списку всех заметок*/
    cancelEdit() {
      this.show = 'none'
      this.$router.push('/')
    },
    /*Остаться на странице*/
    toStay() {
      this.show = 'none'  
    },
    /*Сохранение всей заметки*/
    saveNote() {
      this.$store.commit('SAVE_NOTE', Number(this.$route.params.id))
      this.$router.push('/')
    },
    /*Действие "назад"*/
    undo() {
      this.$store.dispatch('moveDown')
    },
    /*Действие "вперед"*/
    redo() {
      this.$store.dispatch('moveUp')    
    }
  },
  computed: {
    /*Получение копии Todos*/
    todos() {
      return this.$store.state.todos
    },
    /*Выделение кнопки "назад", если она активная*/
    showUndo() {
      return this.$store.state.move.down
    },
    /*Выделение кнопки "вперед", если она активная*/
    showRedo() {
      return this.$store.state.move.up
    }
  },
  // /*Сохранение копии Todos при инициализации*/
  created() {   
    this.$store.commit('SAVE_TODOS', Number(this.$route.params.id))
  }
}
</script>

<style scoped>
.btn-group {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 40px;
}
.btn-group .btn {
  background-color: #f1f1f1;
  color: black;
  font-size: 16px;
  padding: 4px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
}
.btn-group .btn:hover {
  background-color: #009BFF;
  color: white;
}
.showUndo, .showRedo {
  opacity: 1;
}
</style>