const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clearCompleted');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Initial render
renderTodos();

// Events
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text !== '') {
        addTodo(text);
        todoInput.value = '';
    }
});

// Event Delegation for List Items
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    
    const id = Number(li.dataset.id);

    if (e.target.closest('.checkbox')) {
        toggleTodo(id);
    } else if (e.target.closest('.delete-btn')) {
        deleteTodo(id);
    }
});

todoList.addEventListener('dblclick', (e) => {
    const textSpan = e.target.closest('.text');
    if (textSpan) {
        const li = textSpan.closest('.todo-item');
        const id = Number(li.dataset.id);
        enterEditMode(li, id);
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveAndRender();
});

// Logic
function addTodo(text) {
    const newTodo = {
        id: Date.now(),
        text,
        completed: false
    };
    todos.unshift(newTodo);
    saveAndRender();
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveAndRender();
}

function toggleTodo(id) {
    todos = todos.map(t => {
        if (t.id === id) {
            return { ...t, completed: !t.completed };
        }
        return t;
    });
    saveAndRender();
}

function updateTodoText(id, newText) {
    if (newText.trim() === '') {
        deleteTodo(id);
        return;
    }
    todos = todos.map(t => {
        if (t.id === id) {
            return { ...t, text: newText.trim() };
        }
        return t;
    });
    saveAndRender();
}

function enterEditMode(li, id) {
    li.classList.add('editing');
    const todo = todos.find(t => t.id === id);
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'edit-input';
    input.value = todo.text;
    
    li.insertBefore(input, li.querySelector('.text'));
    input.focus();

    const saveEdit = () => {
        updateTodoText(id, input.value);
        li.classList.remove('editing');
        input.remove();
    };

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            li.classList.remove('editing');
            input.remove();
            renderTodos();
        }
    });
}

function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = '';
    
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        // Using DOM methods to avoid innerHTML for user content (prevent XSS)
        const checkbox = document.createElement('div');
        checkbox.className = 'checkbox';
        
        const textSpan = document.createElement('span');
        textSpan.className = 'text';
        textSpan.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>';

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });

    updateCount();
}

function updateCount() {
    const activeCount = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}
