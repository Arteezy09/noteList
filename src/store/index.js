import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const STORAGE_KEY = 'noteList'

export default new Vuex.Store({
  state: {
    /*Список всех заметок*/
    noteList: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),

    /*Копия Todos, созданная для ее изменения и последующего сохранения (или отмены)*/
    todos: [],

    /*down - Отмена внесенного изменения, up - Повтор отмененного изменения*/
    move: {down: false, up: false}
  },
  mutations: {

    /*Создание новой заметки Note*/
    CREATE_NOTE(state, note) {
      Object.assign(note, { todoList: [] })
      state.noteList.push(note)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.noteList))
    },

    /*Удаление заметки Note*/
    DELETE_NOTE(state, id) {
      const idx = state.noteList.findIndex(note => note.id === id)
      state.noteList.splice(idx, 1)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.noteList))  
    },

    /*Сохранение заметки Note*/
    SAVE_NOTE(state, id) {
      const idx = state.noteList.findIndex(note => note.id === id)
      state.noteList[idx].todoList = state.todos.slice()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.noteList))
    },

    /*Сохранение копии Todos*/
    SAVE_TODOS(state, id) {
      const idx = state.noteList.findIndex(note => note.id === id)  
      state.todos = state.noteList[idx].todoList.slice()
    
    },

    /*Создание Todo*/
    CREATE_TODO(state, text) {
      const todo = {
        text,
        id: Date.now(),
        completed: false
      }
      state.todos.push(todo)
      state.move = {down: true, up: false, type: 'create', text: todo.text}
    },

    /*Удаление Todo*/
    DELETE_TODO(state, id) {
      const idx = state.todos.findIndex(todo => todo.id === id)
      state.move = {down: true, up: false, type: 'delete', id: idx, todo: state.todos[idx]}
      state.todos.splice(idx, 1)
    },

    /*Выполнение Todo*/
    TOGGLE_TODO(state, id) {
      const idx = state.todos.findIndex(todo => todo.id === id)
      state.todos[idx].completed = !state.todos[idx].completed  
      state.move = {down: true, up: false, type: 'toggle', id}
    },

    /*Редактирование Todo*/
    EDIT_TODO(state, todo) {
      const idx = state.todos.findIndex(Todo => Todo.id === todo.id)
      state.move = {down: true, up: false, type: 'edit', id: todo.id, text: state.todos[idx].text}
      state.todos[idx].text = todo.text
    }
  },
  actions: { 

    /*Отменить внесенное изменение*/
    moveDown({state, commit}) {
      if (state.move.down) {
        if (state.move.type == 'create') {
          state.todos.pop()
        }
        else if(state.move.type == 'delete') {
          state.todos.splice(state.move.id, 0, state.move.todo) 
        }
        else if(state.move.type == 'edit') {
          commit('EDIT_TODO', state.move)
        }
        else if(state.move.type == 'toggle') {
          commit('TOGGLE_TODO', state.move.id)
        }
        state.move.down = false
        state.move.up = true
      }
    },

    /*Повторить отмененное изменение*/
    moveUp({state, commit}) {
      if (state.move.up) {
        if (state.move.type == 'create') {
          commit('CREATE_TODO', state.move.text)
        }
        else if(state.move.type == 'delete') {
          commit('DELETE_TODO', state.move.todo.id)
        }
        else if(state.move.type == 'edit') {
          commit('EDIT_TODO', state.move)
        }
        else if(state.move.type == 'toggle') {
          commit('TOGGLE_TODO', state.move.id)
        }
      }
    }
  }
})

 