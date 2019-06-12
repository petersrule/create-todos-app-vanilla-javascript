'use strict'

/************************************Data**********************************/
let todos = getSavedTodos();

const filters = {
  filterText: '',
  hideCompleted: false
};

/**************************************Main Code****************************/

renderTodos(todos, filters);

/***********************************Add Event Listeners*****************************/

newTodoForm.addEventListener('submit', addNewTodo);
filterInput.addEventListener('input', e => {
  filters.filterText = e.target.value;
  renderTodos(todos, filters);
});
