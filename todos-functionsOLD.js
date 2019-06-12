/******************************* functions ***********************/

/* Get todos from local storage */
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos');
  if (todosJSON) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

/* Save todos to local storage */
const saveTodos = todos => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

/* add a new todo function */
const addNewTodo = function(e) {
  e.preventDefault();
  // Create new todo, add to todos array
  todos.push({
    id: uuidv4(),
    todo: e.target.elements.newTodo.value,
    completed: false
  });

  // save in local storage of browser
  saveTodos(todos);

  // render again the todos on the page including the new todo
  renderTodos(todos, filters);
  e.target.elements.newTodo.value = '';
};

/* Removes a todo from the DOM and local storage */
const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  } else {
    console.log('Error on removal');
  }
};

const toggleCompletionStatus = id => {
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex > -1) {
    todos[todoIndex].completed = !todos[todoIndex].completed;
  } else {
    console.log('Error on toggle');
  }
};

/* rendering the todos */
const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter(todo => {
    return todo.todo.toLowerCase().includes(filters.filterText.toLowerCase());
  });

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);
  h2.textContent = `You have ${incompleteTodos.length} todos unfinished`;

  todosEle.innerHTML = '';

  filteredTodos.forEach(generateTodosDOM);
};

/* Creates a DOM element for each todo and adds it to the DOM */
const generateTodosDOM = todo => {
  const todoDiv = document.createElement('div');
  const removeButton = document.createElement('button');
  const todoLabel = document.createElement('label');
  const todoCheckbox = document.createElement('input');
  const todoCheckMark = document.createElement('i');
  const todoText = document.createElement('span');

  // set up todo text(span)
  todoText.innerText = todo.todo;

  // set up 'i'/checkMark element
  todoCheckMark.setAttribute('class', 'fas fa-check');

  // set up checkbox
  todoCheckbox.setAttribute('type', 'checkbox');
  todoCheckbox.checked = todo.completed;
  todoCheckbox.addEventListener('change', e => {
    toggleCompletionStatus(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // set up the button
  removeButton.setAttribute('class', 'fas fa-minus-square');
  removeButton.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // add elements to label
  todoLabel.appendChild(todoCheckbox);
  todoLabel.appendChild(todoCheckMark);
  todoLabel.appendChild(todoText);

  // add elements to div
  todoDiv.appendChild(todoLabel);
  todoDiv.appendChild(removeButton);
  todoDiv.setAttribute('class', 'todo');
  todosEle.appendChild(todoDiv);
};
