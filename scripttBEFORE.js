/************************************Data**********************************/
let todos = [];

const filters = {
  filterText: '',
  hideCompleted: false
};

/***************************** DOM connections ***********************/
const todosEle = document.querySelector('#todos');
const filterInput = document.querySelector('#filter-text');
const hideCompletedCheckbox = document.querySelector('#hide-completed');
const newTodoForm = document.querySelector('#new-todo');

/******************************* functions ***********************/

/* add a new todo function */
const addNewTodo = function(e) {
  e.preventDefault();
  // Create new todo, add to todos array
  todos.push({
    todo: e.target.elements.newTodo.value,
    completed: false
  });

  // save in local storage of browser
  localStorage.setItem('todos', JSON.stringify(todos));

  // render again the todos on the page including the new todo
  renderTodos(todos, filters);
  e.target.elements.newTodo.value = '';
};

/* rendering the todos */
const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter(todo => {
    return todo.todo.toLowerCase().includes(filters.filterText.toLowerCase());
  });

  todosEle.innerHTML = '';

  filteredTodos.forEach(todo => {
    const todoEle = document.createElement('label');
    todoEle.innerHTML = `<input type="checkbox" /><i class="fas fa-check"></i><span class="text">${
      todo.todo
    }</span>`;
    todoEle.setAttribute('class', 'todo');
    todosEle.appendChild(todoEle);
  });
};

/**************************************Main Code****************************/

let todosJSON = localStorage.getItem('todos');
if (todosJSON) {
  todos = JSON.parse(todosJSON);
}

renderTodos(todos, filters);

/***********************************Add Event Listeners*****************************/

newTodoForm.addEventListener('submit', addNewTodo);
filterInput.addEventListener('input', e => {
  filters.filterText = e.target.value;
  renderTodos(todos, filters);
});
