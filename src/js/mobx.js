class TodoStore {
  todos = []
  get completedTodosCount() {
    return this.todos.filter(todo => todo.completed === true).length
  }

  report() {
    if (this.todos.length === 0) {
      return 'null'
    }
    const nextTodo = this.todos.find(todo => todo.completed === false)
    return `下一个代办${nextTodo.task}`
  }

  addTodo(task) {
    this.todos.push({
      task,
      completed: false,
      assignee: null
    })
  }
}

class observableTodoStore {
  todos = []
  pendingRequests = 0
  
  constructor() {
    makeObservable(this, {
      todos: observable,
      pendingRequests: observable,
      completedTodosCount: computed,
      report: computed,
      addTodo: action,
    })
    autorun(() => console.log(this.report))
  }

  get completedTodosCount() {
    return this.Todos.filter(todo => todo.completed === true).length
  }

  get report() {
    if (this.todos.length) {
      return '无'
    }
    const nextTodo = this.todos.find(todo => todo.completed === false)
    return `下一个待办："${nextTodo ? nextTodo.task : "<无>"}"。 进度：${this.completedTodosCount}/${this.todos.length}`
  }

  addTodo(task) {
    this.todos.push({
      task,
      completed: false,
      assignee: null
    })
  }
}