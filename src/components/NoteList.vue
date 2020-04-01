<template>
  <div class="container">
    <!--Компонент для создания Note-->
    <new-text @new-text="newNote($event)"></new-text>

    <!--Список Note-->
    <ul class="list">
      <li v-for="note in noteList" :key="note.id" class="li-note">
        <div class="text-block">
          <h2>{{ note.header }}</h2>

          <!--Список задач Todo заметки Note (до 2 Todo)-->
          <ul class="list">
            <li 
              v-for="(todo, index) in note.todoList.slice(0, 2)" 
              :key="todo.id" 
              :class="{ completed: todo.completed }"
              class="text-block">
              <h4>Todo - {{ ++index }}: {{ todo.text }}</h4>
            </li>
          </ul>

        </div>

        <p @click="editNote(note.id)" class="margin-left">
          <i class="material-icons">edit</i>
        </p>
        <p @click="confirm('Do you really want to delete the note?', deleteNote, toStay, note.id)">
          <i class="material-icons">delete</i>
        </p> 

      </li>
    </ul>

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
import newText from "./newText.vue";

export default {
  components: {newText},
  data() {
    return {
      show: 'none',
      message: '',
      id: 0
    }
  },
  methods: {
    /*Создать новую заметку Note*/
    newNote(text) {
      this.$store.commit('CREATE_NOTE', {header: text, id: Date.now()})
    },
    /*Перейти к изменению заметки*/
    editNote(id) {
      this.$router.push('/' + id)  
    },
    /*Подтерждение confirm*/
    confirm(message, yesFn, noFn, id) {
      this.$refs.btnYes.onclick = yesFn;
      this.$refs.btnNo.onclick = noFn;
      this.message = message
      this.id = id
      this.show = 'block'
    },
    /*Удалить заметку*/
    deleteNote(id) {
      this.$store.commit('DELETE_NOTE', id)
      this.show = 'none'
    },
    /*Отмена подтверждения confirm*/
    toStay() {
      this.show = 'none'    
    }
  },
  computed: {
    /*Получить список заметок*/
    noteList() {
      return this.$store.state.noteList;
    }
  }
}
</script>

